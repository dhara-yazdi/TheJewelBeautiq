using JewelleryCatalog.Domain.Entities;

namespace JewelleryCatalog.Domain.Interfaces;

public interface ICategoryRepository : IRepository<Category>
{
    Task<IEnumerable<Category>> GetActiveCategoriesAsync();
    Task<Category?> GetCategoryWithProductsAsync(int id);
}
