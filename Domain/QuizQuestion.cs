namespace AdaptiveQuiz.Api.Domain;

public class QuizQuestion
{
    public int Id { get; set; }

    public int QuizAttemptId { get; set; }
    public QuizAttempt? QuizAttempt { get; set; }

    public int QuestionId { get; set; }
    public Question? Question { get; set; }

    public bool? Correct { get; set; }
    public string? AnswerGiven { get; set; }

    public int? TimeTakenMs { get; set; }
    public int? PointsAwarded { get; set; }
    public int DifficultyAtTime { get; set; }
}