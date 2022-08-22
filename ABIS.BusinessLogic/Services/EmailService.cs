using ABIS.Common.Interfaces;
using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MailKit.Security;
using System.Web;
using ABIS.Common.Entities;
using ABIS.Common.Exceptions;

namespace ABIS.BusinessLogic.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ISecurityService _securityService;
        private readonly ITokenService _tokenService;

        public EmailService(IConfiguration configuration, ISecurityService securityService, ITokenService tokenService)
        {
            _configuration = configuration;
            _securityService = securityService;
            _tokenService = tokenService;
        }

        public async Task SendEmailAsync(string addressee, string topic, string text)
        {
            var message = new MimeMessage();

            message.From.Add(new MailboxAddress("ABIS", _configuration["Email:administration"]));
            message.To.Add(new MailboxAddress("", addressee));
           
            message.Subject = topic;
            message.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = text
            };

            using var client = new SmtpClient();

            await client.ConnectAsync(_configuration["Email:smtpServer"], 587, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_configuration["Email:administration"], _configuration["Email:password"]);
            await client.SendAsync(message);

            await client.DisconnectAsync(true);
        }

        public async Task SendEmailForPassword(Token[] tokens, string redirectUrl) 
        {
            using var client = new SmtpClient();

            await client.ConnectAsync(_configuration["Email:smtpServer"], 587, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_configuration["Email:administration"], _configuration["Email:password"]);

            var invalidEmails = new List<string>();
            foreach (var token in tokens)
            {
                try
                {
                    var message = new MimeMessage();

                    message.From.Add(new MailboxAddress("ABIS", _configuration["Email:administration"]));
                    message.To.Add(new MailboxAddress("", token.Email));

                    message.Subject = "Установка пароля";
                    var encodedToken = HttpUtility.UrlEncode(token.Value);
                    var encodedEmail = HttpUtility.UrlEncode(token.Email);
                    message.Body = new TextPart(MimeKit.Text.TextFormat.Html)
                    {
                        Text = $"Ссылка для установки пароля: {redirectUrl}?token={encodedToken}&email={encodedEmail}"
                    };
                    await client.SendAsync(message);
                }
                catch (Exception ex) 
                {
                    invalidEmails.Add(token.Email);
                }
               
            }
            await client.DisconnectAsync(true);

            if (invalidEmails.Count > 0) 
            {
                throw new BusinessLogicException($"Не удалось отправить ссылку следующим адресам: {string.Join(" ", invalidEmails)}");
            }
        }
    }
}
