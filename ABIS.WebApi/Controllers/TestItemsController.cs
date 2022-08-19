using ABIS.Common.DTOs.TestItemDTOs;
using ABIS.Common.Exceptions;
using ABIS.Common.Interfaces;
using ABIS.WebApi.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace ABIS.WebApi.Controllers
{
    [Route("api")]
    [ApiController]
    [GlobalExceptionFilter]
    public class TestItemsController : BaseController
    {
        private readonly ITestItemService _testItemService;
        public TestItemsController(ITestItemService testItemService)
        {
            _testItemService = testItemService;
        }

        [HttpPost("test-items/create")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<AnswerForCreateDTO> CreateTestItemAsync([FromBody] CreateTestItemDTO createTestItemDTO) 
        {
            var response = await _testItemService.CreateTestItemAsync(createTestItemDTO);

            return response;
        }

        [HttpPost("test-items/create-ratio")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<AnswerForCreateDTO> CreateRatioTestItemAsync([FromBody] CreateRatioTestitemDTO createTestItemDTO)
        {
            var response = await _testItemService.CreateRatioTestItemAsync(createTestItemDTO);

            return response;
        }

        [HttpGet("test-unit/{id:int}/test-items/for-super-admin")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ICollection<GetTestItemDTO>> GetTestItemAsync(int id)
        {
            var response = await _testItemService.GetTestItemsAsync(id);

            return response;
        }

        [HttpPut("test-items/update")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> UpdateTestItemAsync([FromBody] UpdateTestItemDTO updateTestItemDTO)
        {
            await _testItemService.UpdateTestItemAsync(updateTestItemDTO);

            return Ok();
        }

        [HttpDelete("test-items/{id:int}/delete")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> DeleteTestItemAsync(int id)
        {
            await _testItemService.DeleteTestItemAsync(id);

            return Ok();
        }
    }
}
