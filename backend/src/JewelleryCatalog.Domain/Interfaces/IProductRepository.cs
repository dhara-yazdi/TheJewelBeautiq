using JewelleryCatalog.Domain.Entities;

namespace JewelleryCatalog.Domain.Interfaces;

public interface IProductRepository : IRepository<Product>
{
    Task<IEnumerable<Product>> GetActiveProductsAsync();
    Task<IEnumerable<Product>> GetFeaturedProductsAsync();
    Task<IEnumerable<Product>> GetProductsByCategoryAsync(int categoryId);
    Task<Product?> GetProductWithImagesAsync(int id);
    Task<(IEnumerable<Product> Products, int TotalCount)> GetPagedProductsAsync(
        int page, int pageSize, int? categoryId = null, string? search = null);
}
