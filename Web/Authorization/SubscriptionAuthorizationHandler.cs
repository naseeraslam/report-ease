using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace Web.Authorization
{
    public class SubscriptionAuthorizationHandler : AuthorizationHandler<SubscriptionRequirement>
    {
        private readonly IUserSubscriptionRepository _subscriptionRepository;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;

        public SubscriptionAuthorizationHandler(
            IUserSubscriptionRepository subscriptionRepository,
            UserManager<User> userManager,
            IConfiguration config)
        {
            _subscriptionRepository = subscriptionRepository;
            _userManager = userManager;
            _config = config;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, SubscriptionRequirement requirement)
        {
            if (!_config.GetValue<bool>("Features:EnableSubscriptionChecks"))
            {
                context.Succeed(requirement);
                return;
            }

            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return;
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && await _userManager.IsInRoleAsync(user, "Admin"))
            {
                context.Succeed(requirement); // Admins bypass subscription checks
                return;
            }

            var subscriptions = await _subscriptionRepository.ListAllAsync();
            var userSubscription = subscriptions.FirstOrDefault(s => s.UserId == userId && s.IsActive);

            if (userSubscription != null)
            {
                // This is a simplified check. A real-world app might have tiered plans.
                // For now, any active subscription (not Free) passes the check.
                if (userSubscription.PlanType >= requirement.RequiredPlan)
                {
                    context.Succeed(requirement);
                }
            }
        }
    }
}