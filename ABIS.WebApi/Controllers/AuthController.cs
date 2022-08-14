using ABIS.Common.DTOs.AuthDTOs;
using ABIS.Common.Interfaces;
using ABIS.WebApi.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ABIS.WebApi.Controllers;

[ApiController]
[Route("api")]
[GlobalExceptionFilter]
public class AuthController : BaseController
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    // POST api/users/registration
    [HttpPost("users/registration")]
    public async Task<IActionResult> RegistrationAsync([FromBody] RegistrationDTO registrationDTO)
    {
        var response = await _authService.RegistrationAsync(registrationDTO);
        return Ok(response);
    }

    // POST api/users/login
    [HttpPost("users/login")]
    public async Task<IActionResult> LoginAsync([FromBody] LoginDTO loginDTO)
    {
        var response = await _authService.LoginAsync(loginDTO);
        return Ok(response);
    }

    // GET api/users/check-email
    [HttpGet("users/check-email")]
    public async Task<IActionResult> CheckEmailAsync([FromBody] string email)
    {
        var response = await _authService.CheckEmailAsync(email);
        return Ok(response);
    }

    // GET api/users/auth-data
    [Authorize]
    [HttpGet("users/auth-data")]
    public async Task<IActionResult> AuthDataAsync()
    {
        return Ok(new 
        { 
            role = User.FindFirst(ClaimTypes.Role).Value,
            id = User.FindFirst(ClaimTypes.Sid).Value,
        });
    }
}