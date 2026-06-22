namespace JewelleryCatalog.Domain.Interfaces;

public interface IUnitOfWork : IDisposable
{
    ICategoryRepository Categories { get; }
    IProductRepository Products { get; }
    IInquiryRepository Inquiries { get; }
    Task<int> SaveChangesAsync();
}
