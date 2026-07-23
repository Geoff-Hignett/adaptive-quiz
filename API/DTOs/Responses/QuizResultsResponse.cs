namespace AdaptiveQuiz.Api.DTOs.Responses;

public class QuizResultsResponse
{
    public int Id { get; set; }

    public int Score { get; set; }

    public int TotalQuestions { get; set; }

    public int CorrectAnswers { get; set; }

    public double Accuracy { get; set; }

    public List<QuizBreakdownItemResponse> Breakdown { get; set; } = new();
}