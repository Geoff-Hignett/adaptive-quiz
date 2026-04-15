using AdaptiveQuiz.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AdaptiveQuiz.Api.Controllers;

[ApiController]
[Route("api/quiz")]
public class QuizController : ControllerBase
{
    private readonly QuizService _quizService;

    public QuizController(QuizService quizService)
    {
        _quizService = quizService;
    }

    [HttpPost("start")]
    public async Task<IActionResult> StartQuiz()
    {
        // Fake user for now
        int userId = 1;

        try
        {
            var attempt = await _quizService.StartQuiz(userId);

            return Ok(new
            {
                attempt.Id,
                attempt.StartingLevel
            });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}