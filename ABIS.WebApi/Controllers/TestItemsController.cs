using ABIS.Common.DTOs.TestItemDTOs;
using ABIS.Common.Interfaces;
using ABIS.WebApi.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}
