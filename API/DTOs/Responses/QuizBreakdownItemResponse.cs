namespace AdaptiveQuiz.Api.DTOs.Responses;

public class QuizBreakdownItemResponse
{
    public int QuestionId { get; set; }

    public string Text { get; set; } = "";

    public bool? Correct { get; set; }

    public string? AnswerGiven { get; set; }

    public string? CorrectAnswer { get; set; }

    public int PointsAwarded { get; set; }

    public int DifficultyAtTime { get; set; }
}