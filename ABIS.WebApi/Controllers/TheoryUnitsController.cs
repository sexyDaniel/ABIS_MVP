using ABIS.Common.DTOs.TheoryUnitDTOs;
using ABIS.Common.Interfaces;
using ABIS.WebApi.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ABIS.WebApi.Controllers
{
    [Route("api")]
    [ApiController]
    [GlobalExceptionFilter]
    public class TheoryUnitsController : BaseController
    {
        private readonly ITheoryUnitService _theoryUnitService;
        public TheoryUnitsController(ITheoryUnitService theoryUnitService)
        {
            _theoryUnitService = theoryUnitService;
        }

        [HttpPost("theory-units/create")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> CreateTheoryUnitAsync([FromBody] CreateTheoryUnitDTO createTheoryUnitDTO) 
        {
            await _theoryUnitService.CreateTheoryUnitAsync(createTheoryUnitDTO);
            return Ok();
        }

        [HttpPut("theory-units/{id:int}/update")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> UpdateTheoryUnitAsync([FromBody] UpdateTheoryUnitDTO updateTheoryUnitDTO)
        {
            await _theoryUnitService.UpdateTheoryUnitAsync(updateTheoryUnitDTO);
            return Ok();
        }
    }
}
