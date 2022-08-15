
namespace ABIS.Common.DTOs.UserDTOs
{
    public class CreateUsersDTO
    {
        public ICollection<string> Emails { get; set; }
        public string PasswordSavedLink { get; set; }
        public int CompanyId { get; set; }
    }
}
