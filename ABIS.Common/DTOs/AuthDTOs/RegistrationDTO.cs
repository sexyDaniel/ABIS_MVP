using ABIS.Common.Enums;

namespace ABIS.Common.DTOs.AuthDTOs
{
    public class RegistrationDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Roles Role { get; set; }
    }
}
