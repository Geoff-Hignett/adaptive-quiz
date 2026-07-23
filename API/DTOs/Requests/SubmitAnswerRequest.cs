namespace AdaptiveQuiz.Api.DTOs.Requests
{
    public class SubmitAnswerRequest
    {
        public int AttemptId { get; set; }
        public int QuestionId { get; set; }
        public string Answer { get; set; } = "";
        public int TimeTakenMs { get; set; }
    }
}
