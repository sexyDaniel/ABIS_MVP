
namespace ABIS.Common.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(string addressee, string topic, string text);
        Task SendEmailForPassword(string[] addressees, string redirectUrl);
    }
}
