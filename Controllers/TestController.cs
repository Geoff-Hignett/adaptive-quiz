using Microsoft.AspNetCore.Mvc;

namespace FootballQuiz.Controllers;

[ApiController]
[Route("api/test")]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("API is working");
    }
}