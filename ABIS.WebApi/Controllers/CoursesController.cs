using ABIS.Common.DTOs.CourseDTOs;
using ABIS.Common.Interfaces;
using ABIS.WebApi.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ABIS.WebApi.Controllers
{
    [Route("api")]
    [ApiController]
    [GlobalExceptionFilter]
    public class CoursesController : BaseController
    {
        private readonly ICourseService _courseService;
        public CoursesController(ICourseService course)
        {
            _courseService = course;
        }

        [Authorize(Roles = "User")]
        [HttpPost("courses/{id:int}/add-to-course")]
        public async Task<IActionResult> AddUserToCourseAsync(int id)
        {
            await _courseService.AddUserToCourse(UserId, id);

            return Ok();
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("courses/create")]
        public async Task<IActionResult> CreateCourseAsync(CreateCourseDTO courseDTO) 
        {
            await _courseService.CreateCourseAsync(courseDTO);

            return Ok();
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("courses/{id:int}/update")]
        public async Task<IActionResult> UpdateCourseAsync(UpdateCourseDTO courseDTO)
        {
            await _courseService.UpdateCourseAsync(courseDTO);

            return Ok();
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPatch("courses/{id:int}/change-status")]
        public async Task<IActionResult> ChangeCourseStatusAsync(int id)
        {
            await _courseService.ChangeCourseStatus(id);

            return Ok();
        }

        [Authorize]
        [HttpGet("courses")]
        public async Task<ICollection<GetCourseDTO>> GetCoursesAsync()
        {
            var response = await _courseService.GetCoursesAsync();

            return response;
        }

        [Authorize]
        [HttpGet("courses/for-user")]
        public async Task<ICollection<GetCourseDTO>> GetUserCoursesAsync()
        {
            var response = await _courseService.GetUserCourses(UserId);

            return response;
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("courses/{id:int}/for-super-admin")]
        public async Task<GetCourseByIdDTO> GetCourseForSuperUserAsync(int id)
        {
            var response = await _courseService.GetCourseByIdForSuperAdmin(id);

            return response;
        }

        [Authorize(Roles = "User")]
        [HttpGet("courses/{id:int}/for-user")]
        public async Task<GetCourseByIdForUser> GetCourseForUserAsync(int id)
        {
            var response = await _courseService.GetCourseByIdForUserAsync(id, UserId);

            return response;
        }

        [HttpGet("courses/for-super-admin")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ICollection<GetCourseDTO>> GetCoursesForSuperAdminAsync()
        {
            var response = await _courseService.GetCoursesAsync(true);

            return response;
        }

    }
}
