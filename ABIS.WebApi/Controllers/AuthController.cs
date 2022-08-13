using Microsoft.AspNetCore.Mvc;

namespace ABIS.WebApi.Controllers;

[ApiController]
[Route("api")]
public class AuthController : BaseController
{
    [HttpGet("users/registration")]
    public async Task<IActionResult> RegistrationAsync()
    {
        return Ok("Четко");
    }
}