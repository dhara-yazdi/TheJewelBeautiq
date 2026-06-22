using JewelleryCatalog.Domain.Interfaces;
using JewelleryCatalog.Infrastructure.Data;

namespace JewelleryCatalog.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;

    public ICategoryRepository Categories { get; }
    public IProductRepository Products { get; }
    public IInquiryRepository Inquiries { get; }

    public UnitOfWork(AppDbContext context)
    {
        _context = context;
        Categories = new CategoryRepository(context);
        Products = new ProductRepository(context);
        Inquiries = new InquiryRepository(context);
    }

    public async Task<int> SaveChangesAsync() => await _context.SaveChangesAsync();

    public void Dispose() => _context.Dispose();
}
