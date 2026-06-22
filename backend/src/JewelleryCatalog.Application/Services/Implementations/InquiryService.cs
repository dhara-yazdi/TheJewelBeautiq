using JewelleryCatalog.Application.DTOs;
using JewelleryCatalog.Application.Services.Interfaces;
using JewelleryCatalog.Domain.Entities;
using JewelleryCatalog.Domain.Interfaces;

namespace JewelleryCatalog.Application.Services.Implementations;

public class InquiryService : IInquiryService
{
    private readonly IUnitOfWork _unitOfWork;

    public InquiryService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<PagedResultDto<InquiryDto>> GetInquiriesAsync(
        int page, int pageSize, bool? isRead = null)
    {
        var (inquiries, totalCount) = await _unitOfWork.Inquiries
            .GetPagedInquiriesAsync(page, pageSize, isRead);

        var items = inquiries.Select(MapToDto);
        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

        return new PagedResultDto<InquiryDto>(items, totalCount, page, pageSize, totalPages);
    }

    public async Task<InquiryDto?> GetInquiryByIdAsync(int id)
    {
        var inquiry = await _unitOfWork.Inquiries.GetByIdAsync(id);
        return inquiry is null ? null : MapToDto(inquiry);
    }

    public async Task<InquiryDto> CreateInquiryAsync(CreateInquiryDto dto)
    {
        var inquiry = new Inquiry
        {
            Name = dto.Name,
            Email = dto.Email,
            Phone = dto.Phone,
            Subject = dto.Subject,
            Message = dto.Message,
            ProductId = dto.ProductId
        };

        await _unitOfWork.Inquiries.AddAsync(inquiry);
        await _unitOfWork.SaveChangesAsync();
        return MapToDto(inquiry);
    }

    public async Task<bool> MarkAsReadAsync(int id)
    {
        var inquiry = await _unitOfWork.Inquiries.GetByIdAsync(id);
        if (inquiry is null) return false;

        inquiry.IsRead = true;
        _unitOfWork.Inquiries.Update(inquiry);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteInquiryAsync(int id)
    {
        var inquiry = await _unitOfWork.Inquiries.GetByIdAsync(id);
        if (inquiry is null) return false;

        _unitOfWork.Inquiries.Remove(inquiry);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }

    private static InquiryDto MapToDto(Inquiry i) => new(
        i.Id, i.Name, i.Email, i.Phone, i.Subject, i.Message,
        i.IsRead, i.ProductId, i.Product?.Name, i.CreatedAt);
}
