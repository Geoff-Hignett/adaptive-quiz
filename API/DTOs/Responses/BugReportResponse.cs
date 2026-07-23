namespace AdaptiveQuiz.Api.Responses;

public class BugReportResponse
{
    public int Id { get; set; }

    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Status { get; set; } = "";
    public string Severity { get; set; } = "";

    public DateTime CreatedAt { get; set; }

    public string DisplayName { get; set; } = "";
}