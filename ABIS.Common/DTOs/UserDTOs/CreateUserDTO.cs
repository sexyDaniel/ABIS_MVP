using ABIS.Common.Enums;

namespace ABIS.Common.DTOs.UserDTOs
{
    public class CreateUserDTO
    {
        public string Email { get; set; }
        public string PasswordSavedLink { get; set; }
        public int CompanyId { get; set; }
        public Roles Role { get; set; } = Roles.User; 

    }
}
