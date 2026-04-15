using Microsoft.AspNetCore.Mvc;

namespace AdaptiveQuiz.Controllers;

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