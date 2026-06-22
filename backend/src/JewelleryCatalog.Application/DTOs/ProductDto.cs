namespace JewelleryCatalog.Application.DTOs;

public record ProductDto(
    int Id,
    string Name,
    string Description,
    decimal Price,
    string Sku,
    string Material,
    decimal Weight,
    bool IsFeatured,
    bool IsActive,
    int CategoryId,
    string CategoryName,
    List<ProductImageDto> Images,
    DateTime CreatedAt);

public record ProductListDto(
    int Id,
    string Name,
    decimal Price,
    string Material,
    bool IsFeatured,
    string CategoryName,
    string? PrimaryImageUrl);

public record CreateProductDto(
    string Name,
    string Description,
    decimal Price,
    string Sku,
    string Material,
    decimal Weight,
    bool IsFeatured,
    int CategoryId);

public record UpdateProductDto(
    string Name,
    string Description,
    decimal Price,
    string Sku,
    string Material,
    decimal Weight,
    bool IsFeatured,
    bool IsActive,
    int CategoryId);

public record PagedResultDto<T>(
    IEnumerable<T> Items,
    int TotalCount,
    int Page,
    int PageSize,
    int TotalPages);
