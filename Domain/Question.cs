namespace FootballQuiz.Api.Domain;

public class Question
{
    public int Id { get; set; }
    public string Text { get; set; } = "";

    public int Difficulty { get; set; }
    public string Category { get; set; } = "";

    public string Type { get; set; } = ""; // MultipleChoice, TrueFalse etc.

    public string Data { get; set; } = ""; // JSON payload
}