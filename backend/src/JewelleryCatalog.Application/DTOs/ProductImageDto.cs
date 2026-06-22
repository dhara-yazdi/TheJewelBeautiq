namespace JewelleryCatalog.Application.DTOs;

public record ProductImageDto(
    int Id,
    string ImageUrl,
    string AltText,
    bool IsPrimary,
    int DisplayOrder);

public record CreateProductImageDto(
    string ImageUrl,
    string AltText,
    bool IsPrimary,
    int DisplayOrder);
