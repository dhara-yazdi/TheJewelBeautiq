namespace JewelleryCatalog.Application.DTOs;

public record CategoryDto(
    int Id,
    string Name,
    string Description,
    string ImageUrl,
    bool IsActive,
    int ProductCount,
    DateTime CreatedAt);

public record CreateCategoryDto(
    string Name,
    string Description,
    string ImageUrl);

public record UpdateCategoryDto(
    string Name,
    string Description,
    string ImageUrl,
    bool IsActive);
