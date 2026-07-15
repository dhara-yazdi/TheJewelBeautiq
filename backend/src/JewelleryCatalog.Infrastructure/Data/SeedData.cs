using JewelleryCatalog.Application.Services.Implementations;
using JewelleryCatalog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace JewelleryCatalog.Infrastructure.Data;

public static class SeedData
{
    public static async Task InitializeAsync(IServiceProvider serviceProvider)
    {
        using var context = serviceProvider.GetRequiredService<AppDbContext>();
        await context.Database.MigrateAsync();

        if (await context.AdminUsers.AnyAsync())
            return;

        var admin = new AdminUser
        {
            Username = "admin",
            Email = "Thejewelbeautiq@gmail.com",
            PasswordHash = AuthService.HashPassword("TJB@2026"),
            FullName = "System Administrator"
        };
        context.AdminUsers.Add(admin);

        var categories = new[]
        {
            new Category
            {
                Name = "Rings",
                Description = "Exquisite rings crafted with precision, featuring diamonds, gemstones, and precious metals.",
                ImageUrl = "/images/categories/rings.jpg"
            },
            new Category
            {
                Name = "Necklaces",
                Description = "Elegant necklaces and pendants that make a statement of luxury and sophistication.",
                ImageUrl = "/images/categories/necklaces.jpg"
            },
            new Category
            {
                Name = "Bracelets",
                Description = "Stunning bracelets and bangles designed to adorn your wrist with timeless beauty.",
                ImageUrl = "/images/categories/bracelets.jpg"
            },
            new Category
            {
                Name = "Earrings",
                Description = "From classic studs to dramatic chandeliers, our earrings capture the essence of elegance.",
                ImageUrl = "/images/categories/earrings.jpg"
            },
            new Category
            {
                Name = "Watches",
                Description = "Luxury timepieces that blend masterful engineering with exquisite design.",
                ImageUrl = "/images/categories/watches.jpg"
            }
        };
        context.Categories.AddRange(categories);
        await context.SaveChangesAsync();

        var products = new[]
        {
            new Product
            {
                Name = "Diamond Solitaire Ring",
                Description = "A breathtaking 2-carat diamond solitaire set in 18K white gold. The diamond is GIA certified with excellent cut, clarity, and color.",
                Price = 12500.00m,
                Sku = "RNG-DS-001",
                Material = "18K White Gold, Diamond",
                Weight = 4.5m,
                IsFeatured = true,
                CategoryId = categories[0].Id,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/diamond-solitaire-1.jpg", AltText = "Diamond Solitaire Ring Front View", IsPrimary = true, DisplayOrder = 1 },
                    new() { ImageUrl = "/images/products/diamond-solitaire-2.jpg", AltText = "Diamond Solitaire Ring Side View", DisplayOrder = 2 }
                }
            },
            new Product
            {
                Name = "Ruby Eternity Band",
                Description = "Stunning eternity band featuring channel-set rubies in 14K yellow gold. A symbol of everlasting love.",
                Price = 3800.00m,
                Sku = "RNG-RB-002",
                Material = "14K Yellow Gold, Ruby",
                Weight = 3.2m,
                IsFeatured = true,
                CategoryId = categories[0].Id,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/ruby-eternity-1.jpg", AltText = "Ruby Eternity Band", IsPrimary = true, DisplayOrder = 1 }
                }
            },
            new Product
            {
                Name = "Pearl Drop Necklace",
                Description = "Lustrous South Sea pearl pendant on a delicate 18K gold chain. The pearl measures 12mm with exceptional luster.",
                Price = 5200.00m,
                Sku = "NCK-PD-001",
                Material = "18K Gold, South Sea Pearl",
                Weight = 8.0m,
                IsFeatured = true,
                CategoryId = categories[1].Id,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/pearl-necklace-1.jpg", AltText = "Pearl Drop Necklace", IsPrimary = true, DisplayOrder = 1 }
                }
            },
            new Product
            {
                Name = "Emerald Tennis Necklace",
                Description = "Magnificent tennis necklace featuring 15 carats of Colombian emeralds set in platinum with diamond accents.",
                Price = 28000.00m,
                Sku = "NCK-ET-002",
                Material = "Platinum, Emerald, Diamond",
                Weight = 32.0m,
                IsFeatured = true,
                CategoryId = categories[1].Id,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/emerald-necklace-1.jpg", AltText = "Emerald Tennis Necklace", IsPrimary = true, DisplayOrder = 1 }
                }
            },
            new Product
            {
                Name = "Diamond Tennis Bracelet",
                Description = "Classic tennis bracelet with 5 carats of round brilliant diamonds set in 18K white gold.",
                Price = 9500.00m,
                Sku = "BRC-DT-001",
                Material = "18K White Gold, Diamond",
                Weight = 12.0m,
                IsFeatured = true,
                CategoryId = categories[2].Id,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/diamond-bracelet-1.jpg", AltText = "Diamond Tennis Bracelet", IsPrimary = true, DisplayOrder = 1 }
                }
            },
            new Product
            {
                Name = "Gold Cuff Bracelet",
                Description = "Bold 22K gold cuff bracelet with intricate filigree work. Handcrafted by master artisans.",
                Price = 4200.00m,
                Sku = "BRC-GC-002",
                Material = "22K Gold",
                Weight = 28.0m,
                IsFeatured = false,
                CategoryId = categories[2].Id,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/gold-cuff-1.jpg", AltText = "Gold Cuff Bracelet", IsPrimary = true, DisplayOrder = 1 }
                }
            },
            new Product
            {
                Name = "Sapphire Drop Earrings",
                Description = "Elegant drop earrings featuring 3-carat Ceylon sapphires surrounded by diamonds in 18K white gold.",
                Price = 7800.00m,
                Sku = "EAR-SD-001",
                Material = "18K White Gold, Sapphire, Diamond",
                Weight = 6.0m,
                IsFeatured = true,
                CategoryId = categories[3].Id,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/sapphire-earrings-1.jpg", AltText = "Sapphire Drop Earrings", IsPrimary = true, DisplayOrder = 1 }
                }
            },
            new Product
            {
                Name = "Diamond Stud Earrings",
                Description = "Timeless diamond studs totaling 2 carats, set in platinum with secure screw-back closures.",
                Price = 6500.00m,
                Sku = "EAR-DS-002",
                Material = "Platinum, Diamond",
                Weight = 3.0m,
                IsFeatured = false,
                CategoryId = categories[3].Id,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/diamond-studs-1.jpg", AltText = "Diamond Stud Earrings", IsPrimary = true, DisplayOrder = 1 }
                }
            },
            new Product
            {
                Name = "Luxury Chronograph Watch",
                Description = "Swiss-made automatic chronograph with 18K rose gold case, sapphire crystal, and alligator strap.",
                Price = 18500.00m,
                Sku = "WTC-LC-001",
                Material = "18K Rose Gold, Sapphire Crystal",
                Weight = 85.0m,
                IsFeatured = true,
                CategoryId = categories[4].Id,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/chronograph-1.jpg", AltText = "Luxury Chronograph Watch", IsPrimary = true, DisplayOrder = 1 }
                }
            },
            new Product
            {
                Name = "Diamond Bezel Dress Watch",
                Description = "Elegant dress watch with diamond-set bezel, mother-of-pearl dial, and platinum bracelet.",
                Price = 22000.00m,
                Sku = "WTC-DB-002",
                Material = "Platinum, Diamond, Mother of Pearl",
                Weight = 72.0m,
                IsFeatured = false,
                CategoryId = categories[4].Id,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/dress-watch-1.jpg", AltText = "Diamond Bezel Dress Watch", IsPrimary = true, DisplayOrder = 1 }
                }
            }
        };
        context.Products.AddRange(products);

        var inquiries = new[]
        {
            new Inquiry
            {
                Name = "Sarah Johnson",
                Email = "sarah@example.com",
                Phone = "+1-555-0101",
                Subject = "Custom Ring Inquiry",
                Message = "I'm interested in a custom engagement ring. Could you provide details on your bespoke service?",
                ProductId = products[0].Id > 0 ? products[0].Id : null
            },
            new Inquiry
            {
                Name = "Michael Chen",
                Email = "michael@example.com",
                Phone = "+1-555-0102",
                Subject = "Necklace Availability",
                Message = "Is the Emerald Tennis Necklace available for immediate purchase? I'd like to gift it for an anniversary."
            }
        };
        context.Inquiries.AddRange(inquiries);
        await context.SaveChangesAsync();
    }
}
