namespace AdaptiveQuiz.Api.Requests;

public class CreateQuestionRequest
{
    public string Text { get; set; } = "";

    public int Difficulty { get; set; }

    public string Category { get; set; } = "";

    public string Type { get; set; } = "";

    public List<string> Options { get; set; } = new();

    public string CorrectAnswer { get; set; } = "";
}