namespace AdaptiveQuiz.Api.Requests;

public class CreateBugReportRequest
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
}