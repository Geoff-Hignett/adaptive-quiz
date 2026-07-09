namespace AdaptiveQuiz.Api.Exceptions
{
    public class QuizFinishedException : ApiException
    {
        public QuizFinishedException()
            : base("User has answered all the questions in the quiz")
        {
        }
    }
}
