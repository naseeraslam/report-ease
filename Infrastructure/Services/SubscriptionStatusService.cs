using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services
{
    public class SubscriptionStatusService : IHostedService, IDisposable
    {
        private readonly ILogger<SubscriptionStatusService> _logger;
        private readonly IServiceProvider _services;
        private Timer? _timer;

        public SubscriptionStatusService(IServiceProvider services, ILogger<SubscriptionStatusService> logger)
        {
            _services = services;
            _logger = logger;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Subscription Status Service is starting.");

            _timer = new Timer(DoWork, null, TimeSpan.Zero,
                TimeSpan.FromHours(1)); // Check every hour

            return Task.CompletedTask;
        }

        private void DoWork(object? state)
        {
            _logger.LogInformation("Subscription Status Service is working.");

            using (var scope = _services.CreateScope())
            {
                var subscriptionRepository =
                    scope.ServiceProvider
                        .GetRequiredService<IUserSubscriptionRepository>();

                var expiredSubscriptions = subscriptionRepository.ListAllAsync().Result
                    .Where(s => s.IsActive && s.ExpiryDate.HasValue && s.ExpiryDate.Value < DateTime.UtcNow);

                foreach (var sub in expiredSubscriptions)
                {
                    _logger.LogInformation($"Deactivating subscription for user {sub.UserId}.");
                    sub.IsActive = false;
                    subscriptionRepository.UpdateAsync(sub).Wait();
                }
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Subscription Status Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}