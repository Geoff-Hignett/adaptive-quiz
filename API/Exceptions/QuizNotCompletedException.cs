namespace AdaptiveQuiz.Api.Exceptions
{
    public class QuizNotCompletedException : ApiException
    {
        public QuizNotCompletedException()
            : base("User hasn't answered all the questions in the quiz")
        {
        }
    }
}
