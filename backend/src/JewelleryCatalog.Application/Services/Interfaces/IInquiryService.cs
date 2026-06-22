using JewelleryCatalog.Application.DTOs;

namespace JewelleryCatalog.Application.Services.Interfaces;

public interface IInquiryService
{
    Task<PagedResultDto<InquiryDto>> GetInquiriesAsync(int page, int pageSize, bool? isRead = null);
    Task<InquiryDto?> GetInquiryByIdAsync(int id);
    Task<InquiryDto> CreateInquiryAsync(CreateInquiryDto dto);
    Task<bool> MarkAsReadAsync(int id);
    Task<bool> DeleteInquiryAsync(int id);
}
