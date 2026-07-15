using JewelleryCatalog.Application.DTOs;
using JewelleryCatalog.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;

namespace JewelleryCatalog.API.Controllers;

[ApiController]
[Route("api/products/{productId}/images")]
[Authorize(Roles = "Admin")]
public class ImagesController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly IWebHostEnvironment _env;

    public ImagesController(IProductService productService, IWebHostEnvironment env)
    {
        _productService = productService;
        _env = env;
    }

    [HttpPost]
    public async Task<ActionResult<ProductImageDto>> AddImage(
        int productId, CreateProductImageDto dto)
    {
        var image = await _productService.AddProductImageAsync(productId, dto);
        if (image is null) return NotFound("Product not found");
        return Ok(image);
    }

    [HttpPost("upload")]
    public async Task<ActionResult<ProductImageDto>> UploadImage(
    int productId,
    IFormFile file,
    [FromForm] string? altText,
    [FromForm] bool isPrimary = false)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };

        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

        if (!allowedExtensions.Contains(extension))
            return BadRequest("Invalid file type. Allowed: jpg, jpeg, png, webp.");

        if (file.Length > 5 * 1024 * 1024)
            return BadRequest("File size must not exceed 5 MB.");

        // ORIGINAL CODE
        // var uploadsDir = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads", "products");
        // Directory.CreateDirectory(uploadsDir);

        var uploadsDir = Path.Combine(
            _env.WebRootPath ?? "wwwroot",
            "uploads",
            "products");

        Directory.CreateDirectory(uploadsDir);

        // ORIGINAL CODE
        // var fileName = $"{Guid.NewGuid()}{extension}";

        var fileName = $"{Guid.NewGuid()}.webp";

        // ORIGINAL CODE
        // var filePath = Path.Combine(uploadsDir, fileName);

        var filePath = Path.Combine(uploadsDir, fileName);

        try
        {
            // ORIGINAL CODE
            // using (var stream = new FileStream(filePath, FileMode.Create))
            // {
            //     await file.CopyToAsync(stream);
            // }

            using var image = await Image.LoadAsync(file.OpenReadStream());

            // Resize while maintaining aspect ratio
            image.Mutate(x =>
            {
                x.Resize(new ResizeOptions
                {
                    Mode = ResizeMode.Max,
                    Size = new Size(1200, 1200)
                });
            });

            // Save as WebP
            await image.SaveAsync(filePath, new WebpEncoder
            {
                Quality = 85
            });


            var imageUrl = $"/uploads/products/{fileName}";

            var dto = new CreateProductImageDto(imageUrl, altText ?? Path.GetFileNameWithoutExtension(file.FileName), isPrimary, 0);

            var productImage = await _productService.AddProductImageAsync(productId, dto);

            if (productImage == null)
            {
                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);

                return NotFound("Product not found.");
            }

            return Ok(productImage);
        }
        catch (UnknownImageFormatException)
        {
            return BadRequest("The uploaded file is not a valid image.");
        }
        catch (Exception ex)
        {
            if (System.IO.File.Exists(filePath))
                System.IO.File.Delete(filePath);

            return StatusCode(StatusCodes.Status500InternalServerError,
                $"Image upload failed. {ex.Message}");
        }
    }

    [HttpDelete("{imageId}")]
    public async Task<IActionResult> RemoveImage(int productId, int imageId)
    {
        // Get the product with images
        var product = await _productService.GetProductByIdAsync(productId);

        if (product == null)
            return NotFound("Product not found.");

        // Find the image
        var image = product.Images.FirstOrDefault(i => i.Id == imageId);

        if (image == null)
            return NotFound("Image not found.");

        // Delete database record
        var result = await _productService.RemoveProductImageAsync(productId, imageId);

        if (!result)
            return NotFound();

        // Delete physical file
        try
        {
            var filePath = Path.Combine(
                _env.WebRootPath!,
                image.ImageUrl.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));

            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }
        catch
        {
            // Optional: log error
            // Database record is already deleted.
        }

        return NoContent();
    }
}
