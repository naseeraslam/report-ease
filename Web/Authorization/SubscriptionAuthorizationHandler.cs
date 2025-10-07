using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Web.Authorization
{
    public class SubscriptionAuthorizationHandler : AuthorizationHandler<SubscriptionRequirement>
    {
        private readonly IConfiguration _config;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SubscriptionAuthorizationHandler(IConfiguration config, IHttpContextAccessor httpContextAccessor)
        {
            _config = config;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, SubscriptionRequirement requirement)
        {
            if (!_config.GetValue<bool>("Features:EnableSubscriptionChecks"))
            {
                context.Succeed(requirement);
                return;
            }

            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null)
            {
                // No HttpContext available, e.g., in a background service.
                // Decide if access should be denied or allowed by default.
                // For this case, we'll deny access as we can't check the subscription.
                return;
            }

            var userId = httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                // No user ID found in the token.
                return;
            }

            using (var scope = httpContext.RequestServices.CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var subscriptionRepository = scope.ServiceProvider.GetRequiredService<IUserSubscriptionRepository>();

                var user = await userManager.FindByIdAsync(userId);
                if (user != null && await userManager.IsInRoleAsync(user, "Admin"))
                {
                    context.Succeed(requirement);
                    return;
                }

                var userSubscription = await subscriptionRepository.GetUserSubscriptionByUserIdAsync(userId);

                if (userSubscription != null && userSubscription.IsActive)
                {
                    if (userSubscription.PlanType >= requirement.RequiredPlan)
                    {
                        context.Succeed(requirement);
                    }
                }
            }
        }
    }
}