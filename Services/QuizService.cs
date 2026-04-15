using AdaptiveQuiz.Api.Data;
using AdaptiveQuiz.Api.Domain;

namespace AdaptiveQuiz.Api.Services;

public class QuizService
{
    private readonly AppDbContext _context;

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
}