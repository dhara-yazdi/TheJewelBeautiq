using JewelleryCatalog.Domain.Entities;
using JewelleryCatalog.Domain.Interfaces;
using JewelleryCatalog.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace JewelleryCatalog.Infrastructure.Repositories;

public class CategoryRepository : Repository<Category>, ICategoryRepository
{
    public CategoryRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Category>> GetActiveCategoriesAsync()
    {
        return await Context.Categories
            .Where(c => c.IsActive)
            .Include(c => c.Products)
            .OrderBy(c => c.Name)
            .ToListAsync();
    }

    public async Task<Category?> GetCategoryWithProductsAsync(int id)
    {
        return await Context.Categories
            .Include(c => c.Products)
                .ThenInclude(p => p.Images)
            .FirstOrDefaultAsync(c => c.Id == id);
    }
}
