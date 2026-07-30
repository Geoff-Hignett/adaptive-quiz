using AdaptiveQuiz.Api.Domain;
using AdaptiveQuiz.Api.DTOs.Requests;
using AdaptiveQuiz.Api.DTOs.Responses;
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
    private readonly UserService _userService;
    private readonly BugService _bugService;


    public AdminBugsController(UserService userService, BugService bugService)
    {
        _userService = userService;
        _bugService = bugService;
    }

    [HttpGet]
    public async Task<IActionResult> GetBugReportsAsync()
    {
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userEmail))
            return Unauthorized();

        var user = await _userService.GetOrCreateUserAsync(userEmail);

        if (user.Role != Roles.Admin)
            return Forbid();

        var reports = await _bugService.GetAllBugReportsAsync();

        return Ok(reports);
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatusAsync(int id, [FromBody] UpdateBugRequest request)
    {
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userEmail))
            return Unauthorized();

        var user = await _userService.GetOrCreateUserAsync(userEmail);

        if (user.Role != Roles.Admin)
            return Forbid();

        try
        {
            var bug = await _bugService.UpdateBugAsync(id, request);

            if (bug == null)
                return NotFound();

            return Ok(bug);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}/comments")]
    public async Task<IActionResult> GetCommentsAsync(int id)
    {
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userEmail))
            return Unauthorized();

        var user = await _userService.GetOrCreateUserAsync(userEmail);

        if (user.Role != Roles.Admin)
            return Forbid();

        var comments = await _bugService.GetBugCommentsAsync(id);

        return Ok(comments);
    }

    [HttpPost("{id}/comments")]
    public async Task<IActionResult> AddCommentAsync(int id, [FromBody] CreateBugCommentRequest request)
    {
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userEmail))
            return Unauthorized();

        var user = await _userService.GetOrCreateUserAsync(userEmail);

        if (user.Role != Roles.Admin)
            return Forbid();

        try
        {
            var comment = await _bugService.AddBugCommentAsync(
                id,
                user.Id,
                request);

			return Ok(new CreateBugCommentResponse
			{
				Id = comment.Id,
				BugReportId = comment.BugReportId,
				UserId = comment.UserId,
				Comment = comment.Comment,
				CreatedAt = comment.CreatedAt
			});
		}
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBugAsync(int id)
    {
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        if (string.IsNullOrEmpty(userEmail))
            return Unauthorized();

        var user = await _userService.GetOrCreateUserAsync(userEmail);

        if (user.Role != Roles.Admin)
            return Forbid();

        var bug = await _bugService.GetBugReportAsync(id);

        if (bug == null)
            return NotFound();

        return Ok(bug);
    }
}