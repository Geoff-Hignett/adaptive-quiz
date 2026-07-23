using AdaptiveQuiz.Api.Data;
using AdaptiveQuiz.Api.Domain;
using AdaptiveQuiz.Api.DTOs.Requests;
using AdaptiveQuiz.Api.DTOs.Responses;
using AdaptiveQuiz.Api.Exceptions;
using AdaptiveQuiz.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace AdaptiveQuiz.Api.Services;

public class QuizService
{
    private readonly AppDbContext _context;
    private readonly UserService _userService;
    const int MaxQuestions = 3;

    public QuizService(AppDbContext context, UserService userService)
    {
        _context = context;
        _userService = userService;
    }

    public async Task<QuizAttempt> StartQuizForUser(string email)
    {
        var user = await _userService.GetOrCreateUserAsync(email);
        return await StartQuiz(user);
    }

    private async Task<QuizAttempt> StartQuiz(User user)
    {
        var now = DateTime.UtcNow;

        if (_userService.HasMonthlyRestriction(user) && user.LastQuizAt.HasValue)
        {
            var last = user.LastQuizAt.Value;

            if (last.Month == now.Month && last.Year == now.Year)
                throw new QuizAlreadyTakenException();
        }

        var attempt = new QuizAttempt
        {
            UserId = user.Id,
            StartedAt = now,
            StartingLevel = user.CurrentLevel,
            CurrentLevel = user.CurrentLevel,
            Score = 0
        };

        _context.QuizAttempts.Add(attempt);

        user.LastQuizAt = now;

        await _context.SaveChangesAsync();

        return attempt;
    }

    public async Task<Question> GetNextQuestion(int attemptId, int currentUserId)
    {
        var attempt = await _context.QuizAttempts
            .Include(a => a.Questions)
            .FirstOrDefaultAsync(a => a.Id == attemptId);

        if (attempt == null)
            throw new QuizNotFoundException();

        if (attempt.UserId != currentUserId)
            throw new UnauthorizedQuizAccessException();

        // Current quiz is finished
        if (attempt.CompletedAt != null || attempt.Questions.Count >= MaxQuestions)
            throw new QuizFinishedException();

        // If a question is already active, return it
        if (attempt.CurrentQuestionId != null)
        {
            var existingQuestion = await _context.Questions
                .FirstOrDefaultAsync(q => q.Id == attempt.CurrentQuestionId);

            if (existingQuestion == null)
                throw new QuestionNotFoundException();

            return existingQuestion;
        }

        var userId = attempt.UserId;
        var level = attempt.CurrentLevel;
        var user = await _context.Users.FindAsync(userId);

        if (user == null)
            throw new UserNotFoundException();

        // Questions seen across all quizzes
        var seenQuestionIds = await _context.UserQuestionHistories
            .Where(h => h.UserId == userId)
            .Select(h => h.QuestionId)
            .ToListAsync();

        if (_userService.CanRepeatQuestions(user))
        {
            seenQuestionIds.Clear();
        }

        // Questions already used in this attempt
        var usedInAttempt = attempt.Questions
            .Select(q => q.QuestionId)
            .ToList();

        // prefer target level but allow fallback to +/- 1 level if exhausted
        var questions = await _context.Questions
            .Where(q =>
                Math.Abs(q.Difficulty - level) <= 1 &&
                !seenQuestionIds.Contains(q.Id) &&
                !usedInAttempt.Contains(q.Id))
            .OrderBy(q => Math.Abs(q.Difficulty - level))
            .ToListAsync();

        if (!questions.Any())
            throw new Exception("No questions available");

        var index = Random.Shared.Next(questions.Count);
        var question = questions[index];

        Console.WriteLine($"Level: {level}");
        Console.WriteLine($"Seen count: {seenQuestionIds.Count}");
        Console.WriteLine($"Used in attempt: {usedInAttempt.Count}");

        if (question == null)
            throw new Exception("No questions available");

        // Set current active question
        attempt.CurrentQuestionId = question.Id;

        await _context.SaveChangesAsync();

        return question;
    }

    public async Task<SubmitAnswerResponse> SubmitAnswer(SubmitAnswerRequest request, int currentUserId)
    {
        var attempt = await _context.QuizAttempts
            .FirstOrDefaultAsync(a => a.Id == request.AttemptId);

        if (attempt == null)
            throw new QuizNotFoundException();

        if (attempt.UserId != currentUserId)
            throw new UnauthorizedQuizAccessException();

        if (attempt.CurrentQuestionId != request.QuestionId)
            throw new InvalidQuestionFlowException();

        attempt.CurrentQuestionId = null;

        var question = await _context.Questions
            .FirstOrDefaultAsync(q => q.Id == request.QuestionId);

        if (question == null)
            throw new QuestionNotFoundException();

        // Determine correctness using question data (MCQ-based)
        var data = JsonSerializer.Deserialize<QuestionData>(question.Data);

        if (data == null)
            throw new InvalidOperationException("Question data is invalid.");

        // validate answer exists in options (allow blanks for timer rundown)
        if (!string.IsNullOrWhiteSpace(request.Answer) &&
            !data.Options.Contains(request.Answer))
        {
            throw new InvalidAnswerException();
        }

        bool correct = data.CorrectAnswer
            .Equals(request.Answer?.Trim(), StringComparison.OrdinalIgnoreCase);

        // Scoring
        int totalPoints = 0;
        var difficultyAtTime = attempt.CurrentLevel;

        if (correct)
        {
            int maxTime = 10000; // 10 seconds

            if (request.TimeTakenMs < maxTime)
            {
                double timeRatio = 1 - ((double)request.TimeTakenMs / maxTime);

                double timeScore = 1000 * timeRatio;

                double difficultyMultiplier = 1 + ((difficultyAtTime - 1) * 0.2);

                totalPoints = (int)(timeScore * difficultyMultiplier);
            }
        }

        // Update difficulty
        if (correct)
            attempt.CurrentLevel++;
        else
            attempt.CurrentLevel--;

        attempt.CurrentLevel = Math.Max(1, Math.Min(10, attempt.CurrentLevel));

        // Update user level
        var user = await _context.Users.FindAsync(attempt.UserId);

        if (user != null)
        {
            user.CurrentLevel = attempt.CurrentLevel;
        }

        // Save answered question
        var quizQuestion = new QuizAttemptQuestion
        {
            QuizAttemptId = attempt.Id,
            QuestionId = question.Id,
            Correct = correct,
            AnswerGiven = request.Answer,
            TimeTakenMs = request.TimeTakenMs,
            PointsAwarded = totalPoints,
            DifficultyAtTime = difficultyAtTime
        };

        _context.QuizAttemptQuestions.Add(quizQuestion);

        // Track history
        _context.UserQuestionHistories.Add(new UserQuestionHistory
        {
            UserId = attempt.UserId,
            QuestionId = question.Id
        });

        // Update score
        attempt.Score += totalPoints;

        // SAVE EVERYTHING FIRST
        await _context.SaveChangesAsync();

        // NOW count (includes this question)
        var questionCount = await _context.QuizAttemptQuestions
            .CountAsync(q => q.QuizAttemptId == attempt.Id);

        //Console.WriteLine($"[DEBUG] QuestionCount AFTER SAVE: {questionCount}");

        // Completion check
        if (questionCount >= MaxQuestions)
        {
            //Console.WriteLine("[DEBUG] Setting CompletedAt NOW");

            attempt.CompletedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync(); // persist completion
        }

        return new SubmitAnswerResponse
        {
            Correct = correct,
            TotalPoints = totalPoints,
            NewLevel = attempt.CurrentLevel,
            IsComplete = attempt.CompletedAt != null
        };
    }

    public async Task<QuizResultsResponse> GetResults(int attemptId, int currentUserId)
    {
        var attempt = await _context.QuizAttempts
            .Include(a => a.Questions)
            .ThenInclude(q => q.Question)
            .FirstOrDefaultAsync(a => a.Id == attemptId);

        if (attempt == null)
            throw new QuizNotFoundException();

        if (attempt.UserId != currentUserId)
            throw new UnauthorizedQuizAccessException();

        if (attempt.CompletedAt == null)
            throw new QuizNotCompletedException();

        var totalQuestions = attempt.Questions.Count;
        var correctAnswers = attempt.Questions.Count(q => q.Correct == true);

        var accuracy = totalQuestions == 0
            ? 0
            : Math.Round((double)correctAnswers / totalQuestions * 100, 2);

        var breakdown = attempt.Questions.Select(q =>
        {
            var data = JsonSerializer.Deserialize<QuestionData>(q.Question!.Data);

            return new QuizBreakdownItemResponse
            {
                QuestionId = q.QuestionId,
                Text = q.Question.Text,
                Correct = q.Correct,
                AnswerGiven = q.AnswerGiven,
                CorrectAnswer = data?.CorrectAnswer,
                PointsAwarded = q.PointsAwarded,
                DifficultyAtTime = q.DifficultyAtTime
            };
        }).ToList();

        return new QuizResultsResponse
        {
            Id = attempt.Id,
            Score = attempt.Score,
            TotalQuestions = totalQuestions,
            CorrectAnswers = correctAnswers,
            Accuracy = accuracy,
            Breakdown = breakdown
        };
    }

    public async Task<List<LeaderboardEntryResponse>> GetLeaderboard()
    {
        // users allowed on leaderboard
        var allowedUserIds = await _context.Users
            .Where(u => u.Role != Roles.Admin)
            .Select(u => u.Id)
            .ToListAsync();

        // aggregate scores per user
        var data = await _context.QuizAttempts
            .Where(a =>
                a.CompletedAt != null &&
                allowedUserIds.Contains(a.UserId))
            .GroupBy(a => a.UserId)
            .Select(g => new
            {
                UserId = g.Key,
                TotalScore = g.Sum(a => a.Score),
                Attempts = g.Count()
            })
            .OrderByDescending(x => x.TotalScore)
            .Take(10)
            .ToListAsync();

        var userIds = data.Select(x => x.UserId).ToList();

        var users = await _context.Users
            .Where(u => userIds.Contains(u.Id))
            .ToDictionaryAsync(u => u.Id);

        return data
            .Select((x, index) => new LeaderboardEntryResponse
            {
                UserId = x.UserId,
                Rank = index + 1,
                DisplayName = users[x.UserId].DisplayName,
                TotalScore = x.TotalScore,
                Attempts = x.Attempts
            })
            .ToList();
    } 

    public async Task<UserStatsResponse> GetUserStats(int userId)
    {
        var attempts = await _context.QuizAttempts
            .Include(a => a.Questions)
            .Where(a => a.UserId == userId && a.CompletedAt != null)
            .ToListAsync();

        if (!attempts.Any())
        {
            return new UserStatsResponse
            {
                TotalAttempts = 0,
                TotalScore = 0,
                AverageScore = 0,
                BestScore = 0,
                AverageAccuracy = 0
            };
        }

        var totalAttempts = attempts.Count;
        var totalScore = attempts.Sum(a => a.Score);
        var averageScore = Math.Round(attempts.Average(a => a.Score), 2);
        var bestScore = attempts.Max(a => a.Score);

        var allQuestions = attempts.SelectMany(a => a.Questions);

        var totalQuestions = allQuestions.Count();
        var correctAnswers = allQuestions.Count(q => q.Correct == true);

        var averageAccuracy = totalQuestions == 0
            ? 0
            : Math.Round((double)correctAnswers / totalQuestions * 100, 2);

        return new UserStatsResponse
        {
            TotalAttempts = totalAttempts,
            TotalScore = totalScore,
            AverageScore = averageScore,
            BestScore = bestScore,
            AverageAccuracy = averageAccuracy
        };
    }

}