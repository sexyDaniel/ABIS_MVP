using ABIS.Common.DTOs.AuthDTOs;

namespace ABIS.Common.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> RegistrationAsync(RegistrationDTO registrationDTO);
        Task<AuthResponse> LoginAsync(LoginDTO loginDTO);
        Task<CheckEmailDTO> CheckEmailAsync(string email);
        Task<AuthData> GetAuthData(Guid? userId);
    }
}
