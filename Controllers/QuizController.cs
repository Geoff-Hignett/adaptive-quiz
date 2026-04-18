using AdaptiveQuiz.Api.Data;
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

    public QuizController(QuizService quizService, AppDbContext context)
    {
        _quizService = quizService;
    }

    [Authorize]
    [HttpPost("start")]
    public async Task<IActionResult> StartQuiz()
    {
        try
        {
            // Extract email from Supabase JWT
            var userEmail = User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userEmail))
                return Unauthorized("User email not found in token");

            // Delegate to service
            var attempt = await _quizService.StartQuizForUser(userEmail);

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

    [HttpGet("next")]
    public async Task<IActionResult> GetNext(int attemptId)
    {
        try
        {
            var question = await _quizService.GetNextQuestion(attemptId);
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

    [HttpPost("answer")]
    public async Task<IActionResult> SubmitAnswer([FromBody] SubmitAnswerRequest request)
    {
        try
        {
            var result = await _quizService.SubmitAnswer(request);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("results")]
    public async Task<IActionResult> GetResults(int attemptId)
    {
        try
        {
            var result = await _quizService.GetResults(attemptId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}