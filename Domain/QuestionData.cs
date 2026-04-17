namespace AdaptiveQuiz.Api.Domain;

public class QuestionData
{
    public List<string> Options { get; set; } = new();
    public string CorrectAnswer { get; set; } = "";
}
