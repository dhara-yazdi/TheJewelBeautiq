using JewelleryCatalog.Domain.Entities;

namespace JewelleryCatalog.Domain.Interfaces;

public interface IInquiryRepository : IRepository<Inquiry>
{
    Task<IEnumerable<Inquiry>> GetUnreadInquiriesAsync();
    Task<(IEnumerable<Inquiry> Inquiries, int TotalCount)> GetPagedInquiriesAsync(
        int page, int pageSize, bool? isRead = null);
}
