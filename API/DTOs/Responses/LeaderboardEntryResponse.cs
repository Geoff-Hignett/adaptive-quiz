namespace AdaptiveQuiz.Api.DTOs.Responses;

public class LeaderboardEntryResponse
{
    public int UserId { get; set; }

    public int Rank { get; set; }

    public string DisplayName { get; set; } = "";

    public int TotalScore { get; set; }

    public int Attempts { get; set; }
}