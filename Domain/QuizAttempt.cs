namespace AdaptiveQuiz.Api.Domain;

public class QuizAttempt
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }
    public List<QuizQuestion> Questions { get; set; } = [];

    public DateTime StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }

    public int StartingLevel { get; set; }
    public int CurrentLevel { get; set; }

    public int Score { get; set; }
}