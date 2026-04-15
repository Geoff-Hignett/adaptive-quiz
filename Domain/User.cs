namespace AdaptiveQuiz.Api.Domain;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = "";
    public string Role { get; set; } = "User";

    public int CurrentLevel { get; set; } = 1;
    public DateTime? LastQuizAt { get; set; }
}
