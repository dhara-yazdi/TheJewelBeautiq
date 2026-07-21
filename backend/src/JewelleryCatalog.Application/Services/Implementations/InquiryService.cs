using JewelleryCatalog.Application.DTOs;
using JewelleryCatalog.Application.Services.Interfaces;
using JewelleryCatalog.Domain.Entities;
using JewelleryCatalog.Domain.Interfaces;
using JewelleryCatalog.Application.Email;

namespace JewelleryCatalog.Application.Services.Implementations;

public class InquiryService : IInquiryService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IEmailService _emailService;

    public InquiryService(IUnitOfWork unitOfWork, IEmailService emailService)
    {
        _unitOfWork = unitOfWork;
        _emailService = emailService;
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

        try
        {
            var html = InquiryEmailTemplate.Build(dto);

            await _emailService.SendAsync(new EmailRequest
            {
                Subject = $"New Product Inquiry - {dto.ProductName}",
                HtmlBody = html,
                ReplyTo = dto.Email,
                ReplyToName = dto.Name
            });
        }
        catch (Exception)
        {
            // Email sending failed.
            // The inquiry has already been saved, so don't fail the request.
            // TODO: Add logging later.
        }

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
