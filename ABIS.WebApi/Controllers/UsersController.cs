using ABIS.Common.DTOs.UserDTOs;
using ABIS.Common.Interfaces;
using ABIS.WebApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ABIS.Common.DTOs.AuthDTOs;
using System.Web;

namespace ABIS.WebApi.Controllers
{
    [ApiController]
    [Route("api")]
    [GlobalExceptionFilter]
    public class UsersController : BaseController
    {
        private readonly IUserService _userService;
        private readonly ISecurityService b;

        public UsersController(IUserService userService, ISecurityService ba)
        {
            _userService = userService;
            b = ba;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("users/create-user")]
        public async Task<IActionResult> CreateUserAsync(CreateUserDTO usersDTO) 
        {
            await _userService.CreateUserAsync(usersDTO, UserId);;
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("users/create-users")]
        public async Task<IActionResult> CreateUsersAsync(CreateUsersDTO usersDTO)
        {
            await _userService.CreateUsersAsync(usersDTO, UserId);

            return Ok();
        }

        [Authorize(Roles = "Admin,User")]
        [HttpDelete("users/{id}/delete")]
        public async Task<IActionResult> DeleteUserAsync()
        {
            await _userService.DeleteUserAsync(UserId);

            return Ok();
        }

        [HttpPatch("users/change-password")]
        public async Task<AuthResponse> ChangePasswordAsync(ChangePasswordDTO passwordDTO)
        {
            var response = await _userService.ChangePassword(passwordDTO);

            return response;
        }

        [Authorize]
        [HttpPut("users/update")]
        public async Task<IActionResult> UpdateUserAsync(UpdateUserDTO updateUserDTO)
        {
            await _userService.UpdateUserAsync(updateUserDTO, UserId);

            return Ok();
        }
    }
}
