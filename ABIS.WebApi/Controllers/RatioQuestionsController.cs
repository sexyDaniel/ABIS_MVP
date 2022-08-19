using ABIS.Common.DTOs.RatioQuestionDTOs;
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
    public class RatioQuestionsController : BaseController
    {
        private readonly IRatioQuestionsService _ratioQuestionsService;

        public RatioQuestionsController(IRatioQuestionsService ratioQuestionsService)
        {
            _ratioQuestionsService = ratioQuestionsService;
        }

        [HttpPost("ratio-questions/create")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> CreateRatioQuestionAsync(CreateRatioQuestion createRatioQuestion) 
        {
            await _ratioQuestionsService.CreateRatioQuestionAsync(createRatioQuestion);

            return Ok();
        }

        [HttpPut("ratio-questions/{id:int}/update")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> UpdateRatioQuestionAsync(UpdateRatioQuestionDTO updateRatioQuestionDTO)
        {
            await _ratioQuestionsService.UpdateRatioQuestioAsync(updateRatioQuestionDTO);

            return Ok();
        }

        [HttpDelete("test-items/{testItemId:int}/ratio-questions/{questionId:int}/delete")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> DeleteRatioQuestionAsync(int testItemId, int questionId)
        {
            await _ratioQuestionsService.DeleteRatioQuestionAsync(testItemId, questionId);

            return Ok();
        }
    }
}
