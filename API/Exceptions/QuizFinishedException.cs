namespace AdaptiveQuiz.Api.Exceptions
{
    public class QuizNotCompletedException : ApiException
    {
        public QuizNotCompletedException()
            : base("User has answered all the questions in the quiz")
        {
        }
    }
}
