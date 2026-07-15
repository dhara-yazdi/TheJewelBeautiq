namespace JewelleryCatalog.Domain.Entities;

public class ProductImage
{
    public int Id { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string AltText { get; set; } = string.Empty;
    public bool IsPrimary { get; set; }
    public int DisplayOrder { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;

}
