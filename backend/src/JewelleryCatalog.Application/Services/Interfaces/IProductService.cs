using JewelleryCatalog.Application.DTOs;

namespace JewelleryCatalog.Application.Services.Interfaces;

public interface IProductService
{
    Task<PagedResultDto<ProductListDto>> GetProductsAsync(int page, int pageSize, int? categoryId = null, string? search = null);
    Task<IEnumerable<ProductListDto>> GetFeaturedProductsAsync();
    Task<ProductDto?> GetProductByIdAsync(int id);
    Task<ProductDto> CreateProductAsync(CreateProductDto dto);
    Task<ProductDto?> UpdateProductAsync(int id, UpdateProductDto dto);
    Task<bool> DeleteProductAsync(int id);
    Task<ProductImageDto?> AddProductImageAsync(int productId, CreateProductImageDto dto);
    Task<bool> RemoveProductImageAsync(int productId, int imageId);
}
