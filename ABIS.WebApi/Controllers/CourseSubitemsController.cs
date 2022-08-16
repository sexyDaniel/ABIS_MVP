using ABIS.Common.DTOs.CourseSubitemDTOs;
using ABIS.Common.Interfaces;
using ABIS.WebApi.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ABIS.WebApi.Controllers
{
    [Route("api")]
    [ApiController]
    [GlobalExceptionFilter]
    public class CourseSubitemsController : BaseController
    {
        private readonly ICourseSubitemService _courseSubitemService;

        public CourseSubitemsController(ICourseSubitemService courseSubitemService)
        {
            _courseSubitemService = courseSubitemService;
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("course-sub-items/create")]
        public async Task<IActionResult> CreateCourseSubitemAsync([FromBody] CreateCourseSubitemDTO createCourseSubitemDTO) 
        {
            await _courseSubitemService.CreateCurseSubitemAsync(createCourseSubitemDTO);

            return Ok();
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPut("course-sub-items/{id:int}/update")]
        public async Task<IActionResult> UpdateCourseSubitemAsync([FromBody] UpdateCourseSubItemDTO updateCourseSubItemDTO)
        {
            await _courseSubitemService.UpdateCurseSubitemAsync(updateCourseSubItemDTO);

            return Ok();
        }
    }
}
