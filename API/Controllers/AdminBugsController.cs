using AdaptiveQuiz.Api.Domain;
using AdaptiveQuiz.Api.Infrastructure;
using AdaptiveQuiz.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AdaptiveQuiz.Api.Controllers;

[ApiController]
[Route("api/admin/bugs")]
[Authorize]
public class AdminBugsController : ControllerBase
{
    private readonly QuizService _quizService;

    public AdminBugsController(QuizService quizService)
    {
        _quizService = quizService;
    }

    [HttpGet]
    public async Task<IActionResult> GetBugReports()
    {
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userEmail))
            return Unauthorized();

        var user = await _quizService.EnsureUserExists(userEmail);

        if (user.Role != Roles.Admin)
            return Forbid();

        var reports = await _quizService.GetAllBugReports();

        return Ok(reports);
    }
}