using ABIS.Common.DTOs.UserDTOs;
using ABIS.Common.Interfaces;
using ABIS.WebApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ABIS.WebApi.Controllers
{
    [ApiController]
    [Route("api")]
    [GlobalExceptionFilter]
    public class UsersController : BaseController
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("users/create-user")]
        public async Task<IActionResult> CreateUserAsync(CreateUserDTO usersDTO) 
        {
            await _userService.CreateUserAsync(usersDTO, UserId);

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("users/create-users")]
        public async Task<IActionResult> CreateUsersAsync(CreateUsersDTO usersDTO)
        {
            await _userService.CreateUsersAsync(usersDTO, UserId);

            return Ok();
        }

        [HttpPatch("users/change-password")]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordDTO passwordDTO)
        {
            await _userService.ChangePassword(passwordDTO);

            return Ok();
        }
    }
}
