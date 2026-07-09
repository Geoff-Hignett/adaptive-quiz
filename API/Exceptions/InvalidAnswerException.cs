namespace AdaptiveQuiz.Api.Exceptions
{
    public class InvalidAnswerException : ApiException
    {
        public InvalidAnswerException()
            : base("Invalid answer option")
        {
        }
    }
}