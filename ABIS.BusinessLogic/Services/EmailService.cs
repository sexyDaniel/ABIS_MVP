using ABIS.Common.Interfaces;
using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MailKit.Security;
using System.Web;

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

        public async Task SendEmailForPassword(string[] addressees, string redirectUrl) 
        {
            using var client = new SmtpClient();

            await client.ConnectAsync(_configuration["Email:smtpServer"], 587, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_configuration["Email:administration"], _configuration["Email:password"]);

            foreach (var adress in addressees) 
            {
                var message = new MimeMessage();

                message.From.Add(new MailboxAddress("ABIS", _configuration["Email:administration"]));
                message.To.Add(new MailboxAddress("", adress));

                message.Subject = "Установка пароля";
                var token = await _tokenService.CreatePasswordToken(adress);
                var encodedToken = HttpUtility.UrlEncode(token);
                var encodedEmail = HttpUtility.UrlEncode(adress);
                message.Body = new TextPart(MimeKit.Text.TextFormat.Html)
                {
                    Text = $"Ссылка для установки пароля: {redirectUrl}?token={encodedToken}&email={encodedEmail}"
                };
                await client.SendAsync(message);
            }
            await client.DisconnectAsync(true);
        }
    }
}
