namespace AdaptiveQuiz.Api.Exceptions;

public class QuizNotFoundException : ApiException
{
    public QuizNotFoundException()
        : base("Quiz not found")
    {
    }
}