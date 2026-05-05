namespace AdaptiveQuiz.Api.Domain;

public class UserQuestionHistory
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public int QuestionId { get; set; }
}