using JewelleryCatalog.Application.DTOs;
using JewelleryCatalog.Application.Services.Interfaces;
using JewelleryCatalog.Domain.Entities;
using JewelleryCatalog.Domain.Interfaces;

namespace JewelleryCatalog.Application.Services.Implementations;

public class ProductService : IProductService
{
    private readonly IUnitOfWork _unitOfWork;

    public ProductService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<PagedResultDto<ProductListDto>> GetProductsAsync(
        int page, int pageSize, int? categoryId = null, string? search = null)
    {
        var (products, totalCount) = await _unitOfWork.Products
            .GetPagedProductsAsync(page, pageSize, categoryId, search);

        var items = products.Select(MapToListDto);
        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

        return new PagedResultDto<ProductListDto>(items, totalCount, page, pageSize, totalPages);
    }

    public async Task<IEnumerable<ProductListDto>> GetFeaturedProductsAsync()
    {
        var products = await _unitOfWork.Products.GetFeaturedProductsAsync();
        return products.Select(MapToListDto);
    }

    public async Task<ProductDto?> GetProductByIdAsync(int id)
    {
        var product = await _unitOfWork.Products.GetProductWithImagesAsync(id);
        return product is null ? null : MapToDto(product);
    }

    //public async Task<ProductDto> CreateProductAsync(CreateProductDto dto)
    //{
    //    var product = new Product
    //    {
    //        Name = dto.Name,
    //        Description = dto.Description,
    //        Price = dto.Price,
    //        Sku = dto.Sku,
    //        Material = dto.Material,
    //        Weight = dto.Weight,
    //        IsFeatured = dto.IsFeatured,
    //        CategoryId = dto.CategoryId
    //    };

    //    await _unitOfWork.Products.AddAsync(product);
    //    await _unitOfWork.SaveChangesAsync();

    //    var created = await _unitOfWork.Products.GetProductWithImagesAsync(product.Id);
    //    return MapToDto(created!);
    //}

    public async Task<ProductDto> CreateProductAsync(CreateProductDto dto)
    {
        try
        {

            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                Sku = dto.Sku,
                Material = dto.Material,
                Weight = dto.Weight,
                IsFeatured = dto.IsFeatured,
                CategoryId = dto.CategoryId
            };

            await _unitOfWork.Products.AddAsync(product);
            await _unitOfWork.SaveChangesAsync();

            var created = await _unitOfWork.Products.GetProductWithImagesAsync(product.Id);
            return MapToDto(created!);
        }
        catch (Exception ex)
        {
            throw new Exception(
                ex.InnerException?.Message ?? ex.Message,
                ex);
        }
    }

    public async Task<ProductDto?> UpdateProductAsync(int id, UpdateProductDto dto)
    {
        var product = await _unitOfWork.Products.GetProductWithImagesAsync(id);
        if (product is null) return null;

        product.Name = dto.Name;
        product.Description = dto.Description;
        product.Price = dto.Price;
        product.Sku = dto.Sku;
        product.Material = dto.Material;
        product.Weight = dto.Weight;
        product.IsFeatured = dto.IsFeatured;
        product.IsActive = dto.IsActive;
        product.CategoryId = dto.CategoryId;
        product.UpdatedAt = DateTime.UtcNow;

        _unitOfWork.Products.Update(product);
        await _unitOfWork.SaveChangesAsync();
        return MapToDto(product);
    }

    public async Task<bool> DeleteProductAsync(int id)
    {
        var product = await _unitOfWork.Products.GetByIdAsync(id);
        if (product is null) return false;

        _unitOfWork.Products.Remove(product);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }

    public async Task<ProductImageDto?> AddProductImageAsync(int productId, CreateProductImageDto dto)
    {
        var product = await _unitOfWork.Products.GetProductWithImagesAsync(productId);
        if (product is null) return null;

        var image = new ProductImage
        {
            ImageUrl = dto.ImageUrl,
            AltText = dto.AltText,
            IsPrimary = dto.IsPrimary,
            DisplayOrder = dto.DisplayOrder,
            ProductId = productId
        };

        if (dto.IsPrimary)
        {
            foreach (var existing in product.Images)
                existing.IsPrimary = false;
        }

        product.Images.Add(image);
        await _unitOfWork.SaveChangesAsync();

        return new ProductImageDto(image.Id, image.ImageUrl, image.AltText, image.IsPrimary, image.DisplayOrder);
    }

    public async Task<bool> RemoveProductImageAsync(int productId, int imageId)
    {
        var product = await _unitOfWork.Products.GetProductWithImagesAsync(productId);
        if (product is null) return false;

        var image = product.Images.FirstOrDefault(i => i.Id == imageId);
        if (image is null) return false;

        product.Images.Remove(image);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }

    private static ProductDto MapToDto(Product p) => new(
        p.Id, p.Name, p.Description, p.Price, p.Sku, p.Material, p.Weight,
        p.IsFeatured, p.IsActive, p.CategoryId,
        p.Category?.Name ?? string.Empty,
        p.Images.OrderBy(i => i.DisplayOrder)
            .Select(i => new ProductImageDto(i.Id, i.ImageUrl, i.AltText, i.IsPrimary, i.DisplayOrder))
            .ToList(),
        p.CreatedAt);

    private static ProductListDto MapToListDto(Product p) => new(
        p.Id, p.Name, p.Price, p.Material, p.IsFeatured,
        p.Category?.Name ?? string.Empty,
        p.Images.FirstOrDefault(i => i.IsPrimary)?.ImageUrl
            ?? p.Images.FirstOrDefault()?.ImageUrl);
}
