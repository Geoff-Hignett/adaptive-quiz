using AdaptiveQuiz.Api.Domain;
using AdaptiveQuiz.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;

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

    [Authorize]
    [HttpPost("start")]
    public async Task<IActionResult> StartQuiz()
    {
        try
        {
            var userId = await GetCurrentUserId();
            var attempt = await _quizService.StartQuizForUser(userId);

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

    [Authorize]
    [HttpGet("next")]
    public async Task<IActionResult> GetNext(int attemptId)
    {
        try
        {
            var userId = await GetCurrentUserId();
            var question = await _quizService.GetNextQuestion(attemptId, userId);
            var data = JsonSerializer.Deserialize<QuestionData>(question.Data);

            return Ok(new
            {
                question.Id,
                question.Text,
                question.Type,
                options = data?.Options
            });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpPost("answer")]
    public async Task<IActionResult> SubmitAnswer([FromBody] SubmitAnswerRequest request)
    {
        try
        {
            var userId = await GetCurrentUserId();
            var result = await _quizService.SubmitAnswer(request, userId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpGet("results")]
    public async Task<IActionResult> GetResults(int attemptId)
    {
        try
        {
            var userId = await GetCurrentUserId();
            var result = await _quizService.GetResults(attemptId, userId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    private async Task<int> GetCurrentUserId()
    {
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userEmail))
            throw new Exception("User email not found in token");

        return await _quizService.GetUserIdFromEmail(userEmail);
    }


}