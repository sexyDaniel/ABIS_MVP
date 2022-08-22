
using ABIS.Common.Entities;

namespace ABIS.Common.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(string addressee, string topic, string text);
        Task SendEmailForPassword(Token[] tokens, string redirectUrl);
    }
}
