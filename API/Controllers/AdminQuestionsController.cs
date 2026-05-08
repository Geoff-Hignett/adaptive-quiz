using AdaptiveQuiz.Api.Domain;
using AdaptiveQuiz.Api.Infrastructure;
using AdaptiveQuiz.Api.Requests;
using AdaptiveQuiz.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;

namespace AdaptiveQuiz.Api.Controllers;

[ApiController]
[Route("api/admin/questions")]
[Authorize]
public class AdminQuestionsController : ControllerBase
{
    private readonly QuizService _quizService;

    public AdminQuestionsController(QuizService quizService)
    {
        _quizService = quizService;
    }

    [HttpGet]
    public async Task<IActionResult> GetQuestions()
    {
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userEmail))
            return Unauthorized();

        var user = await _quizService.EnsureUserExists(userEmail);

        if (user.Role != Roles.Admin)
            return Forbid();

        var questions = await _quizService.GetAllQuestions();

        var result = questions.Select(q =>
        {
            var data = JsonSerializer.Deserialize<QuestionData>(q.Data);

            return new
            {
                q.Id,
                q.Text,
                q.Difficulty,
                q.Category,
                q.Type,
                options = data?.Options,
                correctAnswer = data?.CorrectAnswer
            };
        });

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateQuestion(
    [FromBody] CreateQuestionRequest request)
    {
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userEmail))
            return Unauthorized();

        var user = await _quizService.EnsureUserExists(userEmail);

        if (user.Role != Roles.Admin)
            return Forbid();

        var question = await _quizService.CreateQuestion(request);

        return Ok(question);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetQuestion(int id)
    {
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userEmail))
            return Unauthorized();

        var user = await _quizService.EnsureUserExists(userEmail);

        if (user.Role != Roles.Admin)
            return Forbid();

        var question = await _quizService.GetQuestionById(id);

        if (question == null)
            return NotFound();

        var data = JsonSerializer.Deserialize<QuestionData>(question.Data);

        return Ok(new
        {
            question.Id,
            question.Text,
            question.Difficulty,
            question.Category,
            question.Type,
            options = data?.Options,
            correctAnswer = data?.CorrectAnswer
        });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuestion(
    int id,
    [FromBody] CreateQuestionRequest request)
    {
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userEmail))
            return Unauthorized();

        var user = await _quizService.EnsureUserExists(userEmail);

        if (user.Role != Roles.Admin)
            return Forbid();

        var question = await _quizService.UpdateQuestion(
            id,
            request);

        if (question == null)
            return NotFound();

        return Ok(question);
    }
}
