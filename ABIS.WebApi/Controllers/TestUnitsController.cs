using ABIS.Common.DTOs.TestUnitsDTOs;
using ABIS.Common.Interfaces;
using ABIS.WebApi.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ABIS.WebApi.Controllers
{
    [Route("api")]
    [ApiController]
    [GlobalExceptionFilter]
    public class TestUnitsController : BaseController
    {
        private readonly ITestUnitService _testUnitService;
        public TestUnitsController(ITestUnitService testUnitService)
        {
            _testUnitService = testUnitService;
        }


        [HttpPost("test-units/create")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> CreateTheoryUnitAsync([FromBody] CreateTestUnitDTO createTestUnitDTO)
        {
            await _testUnitService.CreateTestUnit(createTestUnitDTO);
            return Ok();
        }
    }
}
