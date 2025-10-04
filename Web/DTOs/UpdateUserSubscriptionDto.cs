using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace Web.DTOs
{
    public class UpdateUserSubscriptionDto
    {
        [Required]
        public string UserId { get; set; } = null!;

        [Required]
        public PlanType PlanType { get; set; }
    }
}