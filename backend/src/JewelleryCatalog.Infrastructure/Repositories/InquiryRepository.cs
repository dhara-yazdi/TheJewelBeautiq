using JewelleryCatalog.Domain.Entities;
using JewelleryCatalog.Domain.Interfaces;
using JewelleryCatalog.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace JewelleryCatalog.Infrastructure.Repositories;

public class InquiryRepository : Repository<Inquiry>, IInquiryRepository
{
    public InquiryRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Inquiry>> GetUnreadInquiriesAsync()
    {
        return await Context.Inquiries
            .Where(i => !i.IsRead)
            .Include(i => i.Product)
            .OrderByDescending(i => i.CreatedAt)
            .ToListAsync();
    }

    public async Task<(IEnumerable<Inquiry> Inquiries, int TotalCount)> GetPagedInquiriesAsync(
        int page, int pageSize, bool? isRead = null)
    {
        var query = Context.Inquiries
            .Include(i => i.Product)
            .AsQueryable();

        if (isRead.HasValue)
            query = query.Where(i => i.IsRead == isRead.Value);

        var totalCount = await query.CountAsync();
        var inquiries = await query
            .OrderByDescending(i => i.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (inquiries, totalCount);
    }
}
