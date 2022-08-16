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
    public async Task<AuthResponse> RegistrationAsync([FromBody] RegistrationDTO registrationDTO)
    {
        var response = await _authService.RegistrationAsync(registrationDTO);
        return response;
    }

    // POST api/users/login
    [HttpPost("users/login")]
    public async Task<AuthResponse> LoginAsync([FromBody] LoginDTO loginDTO)
    {
        var response = await _authService.LoginAsync(loginDTO);
        return response;
    }

    // GET api/users/check-email
    [HttpGet("users/check-email")]
    public async Task<CheckEmailDTO> CheckEmailAsync([FromQuery] string email)
    {
        var response = await _authService.CheckEmailAsync(email);
        return response;
    }

    // GET api/users/auth-data
    [Authorize]
    [HttpGet("users/auth-data")]
    public async Task<AuthData> AuthDataAsync()
    {
        var response = await _authService.GetAuthData(UserId);
        return response;
    }
}