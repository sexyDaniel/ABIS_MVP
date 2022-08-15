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

        [HttpGet("courses")]
        public async Task<IActionResult> GetCoursesAsync()
        {
            var response = await _courseService.GetCoursesAsync();

            return Ok(response);
        }

        [HttpGet("courses/for-super-admin")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> GetCoursesForSuperAdminAsync()
        {
            var response = await _courseService.GetCoursesAsync(true);

            return Ok(response);
        }

    }
}
