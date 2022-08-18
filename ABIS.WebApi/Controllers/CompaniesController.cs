using ABIS.Common.DTOs.CompanyDTOs;
using ABIS.Common.DTOs.UserDTOs;
using ABIS.Common.Enums;
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
    public class CompaniesController : BaseController
    {
        private readonly ICompanyService _companyService;

        public CompaniesController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("companies/create")]
        public async Task<IActionResult> CreateCompanyAsync(CreateCompanyDTO createCompanyDTO)
        {
            await _companyService.CreateCompanyAsync(createCompanyDTO, UserId);

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("companies/{id:int}/delete")]
        public async Task<IActionResult> DeleteCompanyAsync(int id)
        {
            await _companyService.DeleteCompanyAsync(id, UserId);

            return Ok();
        }

        [Authorize]
        [HttpGet("companies")]
        public async Task<ICollection<GetCompanyDTO>> GetCompanysAsync()
        {
            var response = await _companyService.GetCompanysAsync(UserId);

            return response;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("companies/{id:int}/users")]
        public async Task<ICollection<CompanyUserDTO>> GetCompanyUsersAsync(int id)
        {
            var response = await _companyService.GetCompanyUsersAsync(UserId, id, Roles.User);

            return response;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("companies/{id:int}/admins")]
        public async Task<ICollection<CompanyUserDTO>> GetCompanyAdminsAsync(int id)
        {
            var response = await _companyService.GetCompanyUsersAsync(UserId, id, Roles.Admin);

            return response;
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("companies/{id:int}/update")]
        public async Task<IActionResult> UpdateCompanyAsync(UpdateCompanyDTO updateCompanyDTO)
        {
            await _companyService.UpdateCompanyAsync(updateCompanyDTO);

            return Ok();
        }
    }
}
