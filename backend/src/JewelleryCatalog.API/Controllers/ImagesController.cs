using JewelleryCatalog.Application.DTOs;
using JewelleryCatalog.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        int productId, IFormFile file, [FromForm] string? altText, [FromForm] bool isPrimary = false)
    {
        if (file is null || file.Length == 0)
            return BadRequest("No file uploaded");

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
        var extension = Path.GetExtension(file.FileName).ToLower();
        if (!allowedExtensions.Contains(extension))
            return BadRequest("Invalid file type. Allowed: jpg, jpeg, png, webp");

        if (file.Length > 5 * 1024 * 1024)
            return BadRequest("File size must not exceed 5MB");

        var uploadsDir = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads", "products");
        Directory.CreateDirectory(uploadsDir);

        var fileName = $"{Guid.NewGuid()}{extension}";
        var filePath = Path.Combine(uploadsDir, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var imageUrl = $"/uploads/products/{fileName}";
        var dto = new CreateProductImageDto(imageUrl, altText ?? file.FileName, isPrimary, 0);
        var image = await _productService.AddProductImageAsync(productId, dto);

        if (image is null)
        {
            System.IO.File.Delete(filePath);
            return NotFound("Product not found");
        }

        return Ok(image);
    }

    [HttpDelete("{imageId}")]
    public async Task<IActionResult> RemoveImage(int productId, int imageId)
    {
        var result = await _productService.RemoveProductImageAsync(productId, imageId);
        if (!result) return NotFound();
        return NoContent();
    }
}
