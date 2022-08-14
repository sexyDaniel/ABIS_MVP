
namespace ABIS.Common.Interfaces
{
    public interface IUserService
    {
        Task CreateUserAsync();
        Task CreateUsersAsync();
        Task UpdateUserAsync();
        Task DeleteUserAsync();
    }
}
