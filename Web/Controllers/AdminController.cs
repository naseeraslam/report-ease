using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web.DTOs;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserSubscriptionRepository _subscriptionRepository;

        public AdminController(UserManager<User> userManager, IUserSubscriptionRepository subscriptionRepository)
        {
            _userManager = userManager;
            _subscriptionRepository = subscriptionRepository;
        }

        [HttpGet("users")]
        public async Task<ActionResult<IReadOnlyList<UserDetailDto>>> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var subscriptions = await _subscriptionRepository.ListAllAsync();

            var userDetailDtos = new List<UserDetailDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var subscription = subscriptions.FirstOrDefault(s => s.UserId == user.Id);

                userDetailDtos.Add(new UserDetailDto
                {
                    Id = user.Id,
                    UserName = user.UserName ?? string.Empty,
                    Email = user.Email ?? string.Empty,
                    Roles = roles,
                    Subscription = subscription
                });
            }

            return Ok(userDetailDtos);
        }

        [HttpPost("update-role")]
        public async Task<IActionResult> UpdateUserRole(UpdateUserRoleDto dto)
        {
            var user = await _userManager.FindByIdAsync(dto.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var currentRoles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, currentRoles);

            var result = await _userManager.AddToRoleAsync(user, dto.RoleName);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { message = "User role updated successfully." });
        }

        [HttpPost("update-subscription")]
        public async Task<IActionResult> UpdateUserSubscription(UpdateUserSubscriptionDto dto)
        {
            var user = await _userManager.FindByIdAsync(dto.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var subscription = (await _subscriptionRepository.ListAllAsync()).FirstOrDefault(s => s.UserId == dto.UserId);

            if (subscription == null)
            {
                subscription = new UserSubscription
                {
                    UserId = dto.UserId,
                    PaymentStatus = "Admin Granted"
                };
            }

            subscription.PlanType = dto.PlanType;
            subscription.IsActive = true;
            subscription.StartDate = DateTime.UtcNow;

            if (dto.PlanType == PlanType.Monthly)
            {
                subscription.ExpiryDate = DateTime.UtcNow.AddMonths(1);
            }
            else
            {
                subscription.ExpiryDate = null; // Free and Lifetime plans do not expire
            }

            if (subscription.Id == 0) // New subscription
            {
                await _subscriptionRepository.AddAsync(subscription);
            }
            else // Existing subscription
            {
                await _subscriptionRepository.UpdateAsync(subscription);
            }

            return Ok(new { message = "User subscription updated successfully." });
        }
    }
}