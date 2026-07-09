namespace AdaptiveQuiz.Api.Exceptions
{
    public class QuizAlreadyTakenException : ApiException
    {
        public QuizAlreadyTakenException()
            : base("User has already taken the quiz this month.")
        {
        }
    }
}