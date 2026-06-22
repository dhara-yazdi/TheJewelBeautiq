using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using JewelleryCatalog.Application.DTOs;
using JewelleryCatalog.Application.Services.Interfaces;
using JewelleryCatalog.Domain.Entities;
using JewelleryCatalog.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace JewelleryCatalog.Application.Services.Implementations;

public class AuthService : IAuthService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IAdminUserRepository _adminRepo;
    private readonly IConfiguration _configuration;

    public AuthService(IUnitOfWork unitOfWork, IAdminUserRepository adminRepo, IConfiguration configuration)
    {
        _unitOfWork = unitOfWork;
        _adminRepo = adminRepo;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto?> LoginAsync(LoginDto dto)
    {
        var admin = await _adminRepo.GetByUsernameAsync(dto.Username);
        if (admin is null || !VerifyPassword(dto.Password, admin.PasswordHash))
            return null;

        admin.LastLoginAt = DateTime.UtcNow;
        _adminRepo.Update(admin);
        await _unitOfWork.SaveChangesAsync();

        var token = GenerateJwtToken(admin.Username, admin.Email);
        var expirationHours = double.Parse(_configuration["Jwt:ExpirationHours"] ?? "8");
        var expiresAt = DateTime.UtcNow.AddHours(expirationHours);

        return new AuthResponseDto(token, admin.Username, admin.FullName, expiresAt);
    }

    public async Task<DashboardDto> GetDashboardAsync()
    {
        var products = await _unitOfWork.Products.GetAllAsync();
        var categories = await _unitOfWork.Categories.GetAllAsync();
        var allInquiries = await _unitOfWork.Inquiries.GetAllAsync();
        var unreadInquiries = await _unitOfWork.Inquiries.GetUnreadInquiriesAsync();

        var recentProducts = (await _unitOfWork.Products.GetActiveProductsAsync())
            .OrderByDescending(p => p.CreatedAt)
            .Take(5);

        var recentInquiries = allInquiries
            .OrderByDescending(i => i.CreatedAt)
            .Take(5);

        return new DashboardDto(
            products.Count(),
            categories.Count(),
            allInquiries.Count(),
            unreadInquiries.Count(),
            recentProducts.Select(p => new ProductListDto(
                p.Id, p.Name, p.Price, p.Material, p.IsFeatured,
                p.Category?.Name ?? string.Empty,
                p.Images.FirstOrDefault(i => i.IsPrimary)?.ImageUrl
                    ?? p.Images.FirstOrDefault()?.ImageUrl)).ToList(),
            recentInquiries.Select(i => new InquiryDto(
                i.Id, i.Name, i.Email, i.Phone, i.Subject, i.Message,
                i.IsRead, i.ProductId, i.Product?.Name, i.CreatedAt)).ToList());
    }

    private string GenerateJwtToken(string username, string email)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]
                ?? "DefaultSuperSecretKeyForDevelopment12345!"));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Email, email),
            new Claim(ClaimTypes.Role, "Admin")
        };

        var expirationHours = double.Parse(_configuration["Jwt:ExpirationHours"] ?? "8");
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(expirationHours),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public static string HashPassword(string password)
    {
        var salt = RandomNumberGenerator.GetBytes(16);
        var hash = Rfc2898DeriveBytes.Pbkdf2(
            password, salt, 100000, HashAlgorithmName.SHA256, 32);
        return $"{Convert.ToBase64String(salt)}.{Convert.ToBase64String(hash)}";
    }

    private static bool VerifyPassword(string password, string storedHash)
    {
        var parts = storedHash.Split('.');
        if (parts.Length != 2) return false;

        var salt = Convert.FromBase64String(parts[0]);
        var hash = Convert.FromBase64String(parts[1]);
        var computedHash = Rfc2898DeriveBytes.Pbkdf2(
            password, salt, 100000, HashAlgorithmName.SHA256, 32);

        return CryptographicOperations.FixedTimeEquals(hash, computedHash);
    }
}
