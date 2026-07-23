namespace AdaptiveQuiz.Api.Responses;

public class BugCommentResponse
{
    public int Id { get; set; }

    public string Comment { get; set; } = "";

    public DateTime CreatedAt { get; set; }

    public string DisplayName { get; set; } = "";
    public string Role { get; set; } = "";
}