namespace AdaptiveQuiz.Api.Exceptions;

public class InvalidBugUpdateException : ApiException
{
    public InvalidBugUpdateException(string message)
        : base(message)
    {
    }
}