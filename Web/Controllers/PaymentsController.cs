using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities;
using System;
using System.IO;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Checkout;
using Web.DTOs;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PaymentsController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserSubscriptionRepository _subscriptionRepository;
        private readonly IConfiguration _config;

        public PaymentsController(
            UserManager<User> userManager,
            IUserSubscriptionRepository subscriptionRepository,
            IConfiguration config)
        {
            _userManager = userManager;
            _subscriptionRepository = subscriptionRepository;
            _config = config;
        }

        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] CreateCheckoutSessionRequestDto req)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("User ID cannot be found in token.");
            }

            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new() { "card" },
                LineItems = new()
                {
                    new SessionLineItemOptions
                    {
                        Price = req.PriceId,
                        Quantity = 1,
                    },
                },
                Mode = "subscription", // Can be "payment" for one-time or "subscription" for recurring
                SuccessUrl = req.SuccessUrl,
                CancelUrl = req.CancelUrl,
                ClientReferenceId = userId // Important for webhook
            };

            var service = new SessionService();
            Session session = await service.CreateAsync(options);

            return Ok(new { sessionId = session.Id, url = session.Url });
        }

        [HttpPost("webhook")]
        [AllowAnonymous]
        public async Task<IActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var webhookSecret = _config["Stripe:WebhookSecret"];

            if (string.IsNullOrEmpty(webhookSecret))
            {
                // Log this error, as it's a server configuration issue.
                return BadRequest("Stripe webhook secret is not configured.");
            }

            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], webhookSecret);

            if (stripeEvent.Type == "checkout.session.completed")
            {
                var session = stripeEvent.Data.Object as Session;
                if (session?.ClientReferenceId != null)
                {
                    var userId = session.ClientReferenceId;
                    var user = await _userManager.FindByIdAsync(userId);
                    if (user != null)
                    {
                        // Here you would typically determine the plan based on the price ID
                        // For simplicity, we'll just create a "Monthly" plan for now
                        var subscription = new UserSubscription
                        {
                            UserId = userId,
                            PlanType = PlanType.Monthly,
                            StartDate = DateTime.UtcNow,
                            ExpiryDate = DateTime.UtcNow.AddMonths(1),
                            IsActive = true,
                            PaymentStatus = "Paid"
                        };
                        await _subscriptionRepository.AddAsync(subscription);
                    }
                }
            }

            return Ok();
        }
    }
}