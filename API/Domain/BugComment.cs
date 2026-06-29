namespace AdaptiveQuiz.Api.Domain;

public class BugComment
{
    public int Id { get; set; }

    public int BugReportId { get; set; }
    public BugReport? BugReport { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }

    public string Comment { get; set; } = "";

    public DateTime CreatedAt { get; set; }
}