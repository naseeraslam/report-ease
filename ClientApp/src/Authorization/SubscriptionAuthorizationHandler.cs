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
                return;
            }

            var userId = httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return;
            }

            var userManager = httpContext.RequestServices.GetRequiredService<UserManager<User>>();
            var user = await userManager.FindByIdAsync(userId);
            if (user != null && await userManager.IsInRoleAsync(user, "Admin"))
            {
                context.Succeed(requirement); // Admins bypass subscription checks
                return;
            }

            var subscriptionRepository = httpContext.RequestServices.GetRequiredService<IUserSubscriptionRepository>();
            var subscriptions = await subscriptionRepository.ListAllAsync();
            var userSubscription = subscriptions.FirstOrDefault(s => s.UserId == userId && s.IsActive);

            if (userSubscription != null)
            {
                if (userSubscription.PlanType >= requirement.RequiredPlan)
                {
                    context.Succeed(requirement);
                }
            }
        }
    }
}