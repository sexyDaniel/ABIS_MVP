using ABIS.Common.DTOs.StatisticDTOs;
using ABIS.Common.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ABIS.WebApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class StatisticsController : BaseController
    {
        private readonly IStatisticsService _statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpPost("statistics/check-one-answer")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CheckOneAnswerTypeAsync(CheckOneAnswerTypeDTO oneAnswerTypeDTO) 
        {
            await _statisticsService.CheckOneAnswerTypeAsync(oneAnswerTypeDTO, UserId);

            return Ok();
        }

        [HttpPost("statistics/check-open-answer")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CheckOpenAnswerTypeAsync(CheckOpenAnswerTypeDTO openAnswerTypeDTO)
        {
            await _statisticsService.CheckOpenAnswerTypeAsync(openAnswerTypeDTO, UserId);

            return Ok();
        }

        [HttpPost("statistics/check-multiple-answer")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CheckMultipleAnswerTypeAsync(CheckMultipleAnswerTypeDTO multipleAnswerTypeDTO)
        {
            await _statisticsService.CheckMultipleAnswerTypeAsync(multipleAnswerTypeDTO, UserId);

            return Ok();
        }

        [HttpPost("statistics/check-correlate-answer")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CheckCorrelateAnswerTypeAsync(CheckCorrelateTypeDTO ratioQuestionDTO)
        {
            await _statisticsService.CheckCorrelateAnswerTypeAsync(ratioQuestionDTO, UserId);

            return Ok();
        }

        [HttpGet("users/{userId}/test-units/{testUnitId:int}/statistics")]
        [Authorize(Roles = "User")]
        public async Task<GetUnitResultByUser> GetUnitResultForUserAsync(int testUnitId)
        {
            var result = await _statisticsService.GetUnitResultByUserAsync(testUnitId, UserId);

            return result;
        }
    }
}
