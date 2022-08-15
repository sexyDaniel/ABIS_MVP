
using ABIS.Common.DTOs.UserDTOs;

namespace ABIS.Common.Interfaces
{
    public interface IUserService
    {
        Task CreateUserAsync(CreateUserDTO userDTO, Guid? adminId);
        Task CreateUsersAsync(CreateUsersDTO usersDTO, Guid? adminId);
        Task ChangePassword(ChangePasswordDTO passwordDTO);
        Task UpdateUserAsync();
        Task DeleteUserAsync();
    }
}
