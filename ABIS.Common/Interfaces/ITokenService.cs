using ABIS.Common.Entities;

namespace ABIS.Common.Interfaces
{
    public interface ITokenService
    {
        Task<Token[]> CreatePasswordTokens(Token[] token);
        Task DeletePasswordToken(string email);
    }
}
