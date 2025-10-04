using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data.Seed
{
    public static class DbInitializer
    {
        public static async Task SeedAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            // Seed Roles
            await roleManager.CreateAsync(new IdentityRole("Admin"));
            await roleManager.CreateAsync(new IdentityRole("Master"));
            await roleManager.CreateAsync(new IdentityRole("Subscriber"));
            await roleManager.CreateAsync(new IdentityRole("Free"));

            // Seed Admin User
            if (userManager.Users.All(u => u.Email != "admin@firreporteditor.com"))
            {
                var adminUser = new User
                {
                    UserName = "admin",
                    Email = "admin@firreporteditor.com",
                    EmailConfirmed = true
                };

                await userManager.CreateAsync(adminUser, "Admin@123");
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
        }
    }
}