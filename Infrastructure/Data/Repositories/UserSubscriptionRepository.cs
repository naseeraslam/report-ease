using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data.Repositories
{
    public class UserSubscriptionRepository : Repository<UserSubscription>, IUserSubscriptionRepository
    {
        public UserSubscriptionRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}