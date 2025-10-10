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
            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }
            if (!await roleManager.RoleExistsAsync("User"))
            {
                await roleManager.CreateAsync(new IdentityRole("User"));
            }

            // Seed Admin User
            if (userManager.Users.All(u => u.Email != "naseeraslamkhan016@gmail.com"))
            {
                var adminUser = new User
                {
                    UserName = "naseeraslamkhan016@gmail.com",
                    Email = "naseeraslamkhan016@gmail.com",
                    EmailConfirmed = true
                };

                await userManager.CreateAsync(adminUser, "Admin1234!");
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
        }
    }
}