using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IUserSubscriptionRepository : IRepository<UserSubscription>
    {
        Task<UserSubscription> GetUserSubscriptionByUserIdAsync(string userId);
    }
}