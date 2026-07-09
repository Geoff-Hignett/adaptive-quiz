namespace AdaptiveQuiz.Api.Exceptions
{
    public class UserNotAuthenticatedException : ApiException
    {
        public UserNotAuthenticatedException()
            : base("User not found")
        {
        }
    }
}