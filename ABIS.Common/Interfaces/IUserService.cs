using ABIS.Common.DTOs.AuthDTOs;
using ABIS.Common.DTOs.UserDTOs;

namespace ABIS.Common.Interfaces
{
    public interface IUserService
    {
        Task CreateUserAsync(CreateUserDTO userDTO, Guid? adminId);
        Task CreateUsersAsync(CreateUsersDTO usersDTO, Guid? adminId);
        Task<AuthResponse> ChangePassword(ChangePasswordDTO passwordDTO);
        Task UpdateUserAsync(UpdateUserDTO updateUserDTO, Guid? userId);
        Task DeleteUserAsync(Guid? id);
    }
}
