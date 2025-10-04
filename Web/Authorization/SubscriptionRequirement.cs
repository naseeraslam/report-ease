using Core.Entities;
using Microsoft.AspNetCore.Authorization;

namespace Web.Authorization
{
    public class SubscriptionRequirement : IAuthorizationRequirement
    {
        public PlanType RequiredPlan { get; }

        public SubscriptionRequirement(PlanType requiredPlan)
        {
            RequiredPlan = requiredPlan;
        }
    }
}