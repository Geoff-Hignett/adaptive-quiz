namespace AdaptiveQuiz.Api.Exceptions
{
    public class UnauthorizedQuizAccessException : ApiException
    {
        public UnauthorizedQuizAccessException()
            : base("Unauthorized access")
        {
        }
    }
}
