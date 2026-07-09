namespace AdaptiveQuiz.Api.Exceptions;

public class InvalidBugCommentException : ApiException
{
    public InvalidBugCommentException(string message)
        : base(message)
    {
    }
}