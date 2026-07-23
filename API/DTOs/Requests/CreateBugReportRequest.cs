namespace AdaptiveQuiz.Api.DTOs.Requests;

public class CreateBugReportRequest
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
}