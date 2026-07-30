namespace AdaptiveQuiz.Api.DTOs.Responses;

public class CreateBugCommentResponse
{
    public int Id { get; set; }

    public int BugReportId { get; set; }

    public int UserId { get; set; }

    public string Comment { get; set; } = "";

    public DateTime CreatedAt { get; set; }
}