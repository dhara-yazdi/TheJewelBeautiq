namespace JewelleryCatalog.Application.DTOs;

public record LoginDto(string Username, string Password);

public record AuthResponseDto(string Token, string Username, string FullName, DateTime ExpiresAt);

public record DashboardDto(
    int TotalProducts,
    int TotalCategories,
    int TotalInquiries,
    int UnreadInquiries,
    List<ProductListDto> RecentProducts,
    List<InquiryDto> RecentInquiries);
