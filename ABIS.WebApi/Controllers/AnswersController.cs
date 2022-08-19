using ABIS.Common.DTOs.AnswerDTOs;
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
    public class AnswersController : BaseController
    {
        private readonly IAnswerService _answerService;

        public AnswersController(IAnswerService answerService)
        {
            _answerService = answerService;
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("answers/create")]
        public async Task<IActionResult> CreateAnswerAsync(CreateSingleAnswerDTO createSingleAnswerDTO) 
        {
            await _answerService.CreateAnswerAsync(createSingleAnswerDTO);

            return Ok();
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPut("answers/{id:int}/update")]
        public async Task<IActionResult> UpdateAnswerAsync(UpdateAnswerDTO updateAnswerDTO)
        {
            await _answerService.UpdateAnswerAsync(updateAnswerDTO);

            return Ok();
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpDelete("test-items/{testItemId:int}/answers/{answerId:int}/delete")]
        public async Task<IActionResult> DeleteAnswerAsync(int testItemId, int answerId)
        {
            await _answerService.DeleteAnswerAsync(answerId,testItemId);

            return Ok();
        }
    }
}
