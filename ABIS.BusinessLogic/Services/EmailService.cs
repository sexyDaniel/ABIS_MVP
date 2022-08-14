using ABIS.Common.Interfaces;
using MimeKit;
using MailKit.Net.Smtp;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace ABIS.BusinessLogic.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
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

            await client.ConnectAsync(_configuration["Email:smtpServer"], 465, false);
            await client.AuthenticateAsync(_configuration["Email:administration"], _configuration["Email:password"]);
            await client.SendAsync(message);

            await client.DisconnectAsync(true);
        }
    }
}
