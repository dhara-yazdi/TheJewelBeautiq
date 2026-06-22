using JewelleryCatalog.Domain.Entities;
using JewelleryCatalog.Domain.Interfaces;
using JewelleryCatalog.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace JewelleryCatalog.Infrastructure.Repositories;

public class AdminUserRepository : Repository<AdminUser>, IAdminUserRepository
{
    public AdminUserRepository(AppDbContext context) : base(context) { }

    public async Task<AdminUser?> GetByUsernameAsync(string username)
    {
        return await Context.AdminUsers
            .FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());
    }
}
