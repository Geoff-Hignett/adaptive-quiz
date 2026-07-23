namespace AdaptiveQuiz.Api.DTOs.Responses;

public class SubmitAnswerResponse
{
    public bool Correct { get; set; }

    public int TotalPoints { get; set; }

    public int NewLevel { get; set; }

    public bool IsComplete { get; set; }
}