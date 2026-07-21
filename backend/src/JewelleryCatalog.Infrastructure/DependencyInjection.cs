using JewelleryCatalog.Application.Services.Implementations;
using JewelleryCatalog.Application.Services.Interfaces;
using JewelleryCatalog.Domain.Interfaces;
using JewelleryCatalog.Infrastructure.Data;
using JewelleryCatalog.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using JewelleryCatalog.Infrastructure.Email.Services;
using JewelleryCatalog.Infrastructure.Email.Models;

namespace JewelleryCatalog.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName)));

        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IAdminUserRepository, AdminUserRepository>();

        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IInquiryService, InquiryService>();
        services.AddScoped<IAuthService, AuthService>();


        services.Configure<EmailSettings>(configuration.GetSection("Email"));

        services.AddScoped<IEmailService, EmailService>();

        return services;
    }
}
