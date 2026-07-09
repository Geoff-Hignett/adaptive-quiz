using AdaptiveQuiz.Api.Exceptions;

public class InvalidQuestionFlowException : ApiException
{
    public InvalidQuestionFlowException()
        : base("Invalid question flow")
    {
    }
}