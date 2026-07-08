namespace AdaptiveQuiz.Api.Exceptions
{
    public class QuizAlreadyTakenException : Exception
    {
        public QuizAlreadyTakenException()
            : base("User has already taken the quiz this month.")
        {
        }
    }
}
