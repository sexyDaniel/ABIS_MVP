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

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("courses/create")]
        public async Task<IActionResult> CreateCourseAsync(CreateCourseDTO courseDTO) 
        {
            await _courseService.CreateCourseAsync(courseDTO);

            return Ok();
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("courses/update")]
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

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("courses/{id:int}/for-super-admin")]
        public async Task<GetCourseByIdDTO> GetCourseForSuperUserAsync(int id)
        {
            var response = await _courseService.GetCourseById(id);

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
