namespace AdaptiveQuiz.Api.Exceptions;

public class NoQuestionsAvailableException : ApiException
{
    public NoQuestionsAvailableException()
        : base("No questions are available for this quiz.")
    {
    }
}