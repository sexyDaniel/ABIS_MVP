
namespace ABIS.Common.DTOs.AuthDTOs
{
    public class AuthData
    {
        public string Email { get; set; }
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public bool IsCompanyExists { get; set; }
    }
}
