namespace JewelleryCatalog.Application.DTOs;

public record InquiryDto(
    int Id,
    string Name,
    string Email,
    string Phone,
    string Subject,
    string Message,
    bool IsRead,
    int? ProductId,
    string? ProductName,
    DateTime CreatedAt);

public record CreateInquiryDto(
    string Name,
    string Email,
    string Phone,
    string Subject,
    string Message,
    int? ProductId,
    string? ProductName,
    string? ProductSku);
