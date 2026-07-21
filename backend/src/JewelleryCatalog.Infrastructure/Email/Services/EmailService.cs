using JewelleryCatalog.Application.Email;
using JewelleryCatalog.Application.Services.Interfaces;
using JewelleryCatalog.Infrastructure.Email.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace JewelleryCatalog.Infrastructure.Email.Services;

public class EmailService : IEmailService
{
    private readonly EmailSettings _settings;

    public EmailService(IOptions<EmailSettings> options)
    {
        _settings = options.Value;
    }

    public async Task SendAsync(EmailRequest request)
    {
        var email = new MimeMessage();

        // From
        email.From.Add(new MailboxAddress(
            _settings.FromName,
            _settings.FromEmail));

        // To
        var recipient = string.IsNullOrWhiteSpace(request.To)
            ? _settings.AdminEmail
            : request.To;

        email.To.Add(MailboxAddress.Parse(recipient));

        // Reply-To (Customer)
        if (!string.IsNullOrWhiteSpace(request.ReplyTo))
        {
            email.ReplyTo.Add(new MailboxAddress(
                request.ReplyToName ?? "",
                request.ReplyTo));
        }

        email.Subject = request.Subject;

        email.Body = new BodyBuilder
        {
            HtmlBody = request.HtmlBody
        }.ToMessageBody();

        using var smtp = new SmtpClient();

        await smtp.ConnectAsync(
            _settings.Host,
            _settings.Port,
            SecureSocketOptions.StartTls);

        await smtp.AuthenticateAsync(
            _settings.Username,
            _settings.Password);

        await smtp.SendAsync(email);

        await smtp.DisconnectAsync(true);
    }
}