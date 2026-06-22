using JewelleryCatalog.Domain.Entities;

namespace JewelleryCatalog.Domain.Interfaces;

public interface IAdminUserRepository : IRepository<AdminUser>
{
    Task<AdminUser?> GetByUsernameAsync(string username);
}
