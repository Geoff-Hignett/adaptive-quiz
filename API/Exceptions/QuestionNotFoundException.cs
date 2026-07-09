namespace AdaptiveQuiz.Api.Exceptions
{
    public class QuestionNotFoundException : ApiException
    {
        public QuestionNotFoundException()
            : base("Active question not found")
        {
        }
    }
}