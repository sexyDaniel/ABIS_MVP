using ABIS.Common.DTOs.CompanyDTOs;

namespace ABIS.Common.DTOs.AuthDTOs
{
    public class RegistrationAdminDTO : RegistrationDTO
    {
        public CreateCompanyDTO CompanyDTO { get; set; }
    }
}
