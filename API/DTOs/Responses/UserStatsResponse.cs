namespace AdaptiveQuiz.Api.DTOs.Responses;

public class UserStatsResponse
{
    public int TotalAttempts { get; set; }

    public int TotalScore { get; set; }

    public double AverageScore { get; set; }

    public int BestScore { get; set; }

    public double AverageAccuracy { get; set; }
}