using AdaptiveQuiz.Api.Data;
using AdaptiveQuiz.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace AdaptiveQuiz.Api.Services;

public class QuizService
{
    private readonly AppDbContext _context;
    const int MaxQuestions = 10;

    public QuizService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<QuizAttempt> StartQuiz(int userId)
    {
        var user = await _context.Users.FindAsync(userId);

        if (user == null)
            throw new Exception("User not found");

        // Monthly restriction
        if (user.Role == "User" && user.LastQuizAt.HasValue)
        {
            var now = DateTime.UtcNow;
            var last = user.LastQuizAt.Value;

            if (last.Month == now.Month && last.Year == now.Year)
                throw new Exception("User has already taken quiz this month");
        }

        var attempt = new QuizAttempt
        {
            UserId = user.Id,
            StartedAt = DateTime.UtcNow,
            StartingLevel = user.CurrentLevel,
            CurrentLevel = user.CurrentLevel,
            Score = 0
        };

        _context.QuizAttempts.Add(attempt);

        user.LastQuizAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return attempt;
    }

    public async Task<Question> GetNextQuestion(int attemptId)
    {
        var attempt = await _context.QuizAttempts
            .Include(a => a.Questions)
            .FirstOrDefaultAsync(a => a.Id == attemptId);

        if (attempt == null)
            throw new Exception("Quiz not found");

        // Already completed
        if (attempt.CompletedAt != null)
            throw new Exception("Quiz already completed");

        // Reached max questions
        if (attempt.Questions.Count >= 10)
            throw new Exception("Quiz is finished");

        // If a question is already active, return it
        if (attempt.CurrentQuestionId != null)
        {
            var existingQuestion = await _context.Questions
                .FirstOrDefaultAsync(q => q.Id == attempt.CurrentQuestionId);

            if (existingQuestion == null)
                throw new Exception("Active question not found");

            return existingQuestion;
        }

        var userId = attempt.UserId;
        var level = attempt.CurrentLevel;

        // Questions seen across all quizzes
        var seenQuestionIds = await _context.UserQuestionHistories
            .Where(h => h.UserId == userId)
            .Select(h => h.QuestionId)
            .ToListAsync();

        // Questions already used in this attempt
        var usedInAttempt = attempt.Questions
            .Select(q => q.QuestionId)
            .ToList();

        var questions = await _context.Questions
            .Where(q => q.Difficulty == level &&
                        !seenQuestionIds.Contains(q.Id) &&
                        !usedInAttempt.Contains(q.Id))
            .ToListAsync();

        var question = questions
            .OrderBy(q => Guid.NewGuid())
            .FirstOrDefault();

        if (question == null)
            throw new Exception("No questions available");

        // Set current active question
        attempt.CurrentQuestionId = question.Id;

        await _context.SaveChangesAsync();

        return question;
    }

    public async Task<object> SubmitAnswer(SubmitAnswerRequest request)
    {
        var attempt = await _context.QuizAttempts
            .FirstOrDefaultAsync(a => a.Id == request.AttemptId);

        if (attempt == null)
            throw new Exception("Quiz not found");

        if (attempt.CurrentQuestionId != request.QuestionId)
            throw new Exception("Invalid question flow");

        attempt.CurrentQuestionId = null;

        var question = await _context.Questions
            .FirstOrDefaultAsync(q => q.Id == request.QuestionId);

        if (question == null)
            throw new Exception("Question not found");

        // Check correctness (simple for now)
        bool correct = question.Data.Contains(request.Answer); // placeholder logic

        // Basic scoring
        int basePoints = correct ? 100 : 0;
        int timeBonus = Math.Max(0, 1000 - request.TimeTakenMs);
        int totalPoints = basePoints + timeBonus;

        var difficultyAtTime = attempt.CurrentLevel;

        // Update difficulty
        if (correct)
            attempt.CurrentLevel++;
        else
            attempt.CurrentLevel--;

        attempt.CurrentLevel = Math.Max(1, Math.Min(10, attempt.CurrentLevel));

        // Save QuizQuestion
        var quizQuestion = new QuizQuestion
        {
            QuizAttemptId = attempt.Id,
            QuestionId = question.Id,
            Correct = correct,
            AnswerGiven = request.Answer,
            TimeTakenMs = request.TimeTakenMs,
            PointsAwarded = totalPoints,
            DifficultyAtTime = difficultyAtTime
        };

        _context.QuizQuestions.Add(quizQuestion);

        var questionCount = await _context.QuizQuestions
            .CountAsync(q => q.QuizAttemptId == attempt.Id);

        if (questionCount >= 10)
        {
            attempt.CompletedAt = DateTime.UtcNow;
        }

        // Track history (prevents repeats later)
        _context.UserQuestionHistories.Add(new UserQuestionHistory
        {
            UserId = attempt.UserId,
            QuestionId = question.Id
        });

        // Update score
        attempt.Score += totalPoints;

        await _context.SaveChangesAsync();

        return new
        {
            correct,
            totalPoints,
            newLevel = attempt.CurrentLevel,
            isComplete = attempt.CompletedAt != null
        };
    }
}