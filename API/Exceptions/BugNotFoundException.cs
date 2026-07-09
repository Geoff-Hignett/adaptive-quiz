namespace AdaptiveQuiz.Api.Exceptions;

public class BugNotFoundException : ApiException
{
    public BugNotFoundException()
        : base("Bug not found")
    {
    }
}