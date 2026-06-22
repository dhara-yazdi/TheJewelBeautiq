using JewelleryCatalog.Application.DTOs;

namespace JewelleryCatalog.Application.Services.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto?> LoginAsync(LoginDto dto);
    Task<DashboardDto> GetDashboardAsync();
}
