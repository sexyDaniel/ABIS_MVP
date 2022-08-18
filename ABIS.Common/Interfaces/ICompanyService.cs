using ABIS.Common.DTOs.CompanyDTOs;
using ABIS.Common.DTOs.UserDTOs;
using ABIS.Common.Enums;

namespace ABIS.Common.Interfaces
{
    public interface ICompanyService
    {
        Task CreateCompanyAsync(CreateCompanyDTO createCompanyDTO, Guid? adminId);
        Task DeleteCompanyAsync(int id, Guid? adminId);
        Task<ICollection<GetCompanyDTO>> GetCompanysAsync(Guid? id);
        Task<ICollection<CompanyUserDTO>> GetCompanyUsersAsync(Guid? adminId, int companyId, Roles role);
        Task UpdateCompanyAsync(UpdateCompanyDTO updateCompanyDTO);
    }
}
