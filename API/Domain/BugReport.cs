namespace AdaptiveQuiz.Api.Domain;

public class BugReport
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }

    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Status { get; set; } = "Open";

    public DateTime CreatedAt { get; set; }

}