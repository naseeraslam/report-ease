using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories
{
    public class UserSubscriptionRepository : Repository<UserSubscription>, IUserSubscriptionRepository
    {
        public UserSubscriptionRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<UserSubscription> GetUserSubscriptionByUserIdAsync(string userId)
        {
            return await _context.UserSubscriptions
                .FirstOrDefaultAsync(s => s.UserId == userId);
        }
    }
}