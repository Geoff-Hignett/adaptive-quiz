using AdaptiveQuiz.Api.Domain;
using AdaptiveQuiz.Api.Services;
using Microsoft.AspNetCore.Mvc;
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