using JewelleryCatalog.Application.DTOs;
using JewelleryCatalog.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JewelleryCatalog.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InquiriesController : ControllerBase
{
    private readonly IInquiryService _inquiryService;

    public InquiriesController(IInquiryService inquiryService)
    {
        _inquiryService = inquiryService;
    }

    [HttpPost]
    public async Task<ActionResult<InquiryDto>> Create(CreateInquiryDto dto)
    {
        var inquiry = await _inquiryService.CreateInquiryAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = inquiry.Id }, inquiry);
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<PagedResultDto<InquiryDto>>> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] bool? isRead = null)
    {
        var result = await _inquiryService.GetInquiriesAsync(page, pageSize, isRead);
        return Ok(result);
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<InquiryDto>> GetById(int id)
    {
        var inquiry = await _inquiryService.GetInquiryByIdAsync(id);
        if (inquiry is null) return NotFound();
        return Ok(inquiry);
    }

    [HttpPatch("{id}/read")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> MarkAsRead(int id)
    {
        var result = await _inquiryService.MarkAsReadAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _inquiryService.DeleteInquiryAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }
}
