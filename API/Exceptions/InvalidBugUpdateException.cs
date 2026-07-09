namespace AdaptiveQuiz.Api.Exceptions;

public class InvalidDisplayNameException : ApiException
{
    public InvalidDisplayNameException(string message)
        : base(message)
    {
    }
}