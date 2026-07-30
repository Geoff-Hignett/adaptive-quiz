using AdaptiveQuiz.Api.Domain;
using AdaptiveQuiz.Api.DTOs.Requests;
using AdaptiveQuiz.Api.DTOs.Responses;
using AdaptiveQuiz.Api.Infrastructure;
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
    private readonly UserService _userService;
    private readonly QuestionService _questionService;


    public AdminQuestionsController(UserService userService, QuestionService questionService)
    {
        _userService = userService;
        _questionService = questionService;
    }

    [HttpGet]
    public async Task<IActionResult> GetQuestionsAsync()
    {
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userEmail))
            return Unauthorized();

        var user = await _userService.GetOrCreateUserAsync(userEmail);

        if (user.Role != Roles.Admin)
            return Forbid();

        var questions = await _questionService.GetAllQuestionsAsync();

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
    public async Task<IActionResult> CreateQuestionAsync([FromBody] CreateQuestionRequest request)
    {
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userEmail))
            return Unauthorized();

        var user = await _userService.GetOrCreateUserAsync(userEmail);

        if (user.Role != Roles.Admin)
            return Forbid();

        var question = await _questionService.CreateQuestionAsync(request);

        return Ok(question);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetQuestionAsync(int id)
    {
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userEmail))
            return Unauthorized();

        var user = await _userService.GetOrCreateUserAsync(userEmail);

        if (user.Role != Roles.Admin)
            return Forbid();

        var question = await _questionService.GetQuestionByIdAsync(id);

        if (question == null)
            return NotFound();

        var data = JsonSerializer.Deserialize<QuestionData>(question.Data);

		return Ok(new QuestionResponse
		{
			Id = question.Id,
			Text = question.Text,
			Difficulty = question.Difficulty,
			Category = question.Category,
			Type = question.Type,
			Options = data?.Options ?? new List<string>(),
			CorrectAnswer = data?.CorrectAnswer
		});
	}

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuestionAsync(int id, [FromBody] CreateQuestionRequest request)
    {
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userEmail))
            return Unauthorized();

        var user = await _userService.GetOrCreateUserAsync(userEmail);

        if (user.Role != Roles.Admin)
            return Forbid();

        var question = await _questionService.UpdateQuestionAsync(id, request);

        if (question == null)
            return NotFound();

        return Ok(question);
    }

}
