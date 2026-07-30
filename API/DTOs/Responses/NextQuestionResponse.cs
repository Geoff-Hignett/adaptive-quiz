namespace AdaptiveQuiz.Api.DTOs.Responses;

public class NextQuestionResponse
{
    public int Id { get; set; }

    public string Text { get; set; } = "";
    public string Type { get; set; } = "";
    public int Difficulty { get; set; }

    public List<string> Options { get; set; } = new();
}