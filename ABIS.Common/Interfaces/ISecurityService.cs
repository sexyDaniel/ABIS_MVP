using ABIS.Common.Entities;

namespace ABIS.Common.Interfaces
{
    public interface ISecurityService
    {
        byte[] GetRandomBytes(int size);
        string GetPasswordHash(string password, byte[] salt);
        string GetJwtToken(User user);
    }
}
