using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using RollOffApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;

using System.Threading.Tasks;

namespace RollOffApi.Repository
{
    public class EmailService: IEmailService
    {
        private readonly IConfiguration _config;
        public EmailService(IConfiguration configurtaion)
        {
            _config = configurtaion;
        }
        public void SendEmail(EmailModel emailModel)
        {
            var emailMessage = new MimeMessage();
            var from = _config["EmailSettings:From"];
            emailMessage.From.Add(new MailboxAddress("Bhakti Takane", from));
            emailMessage.To.Add(new MailboxAddress(emailModel.To, emailModel.To));
            emailMessage.Subject = emailModel.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = string.Format(emailModel.Content)
            };
            using(var client = new SmtpClient())
            {
                try
                {
                    client.Connect(_config["EmailSettings:SmtpServer"], 587, true);
                    client.Authenticate(_config["EmailSettings: From"], _config["EmailSettings:Password"]);
                    client.Send(emailMessage);
                }
                catch(Exception e)
                {
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }


        }
    }
}
