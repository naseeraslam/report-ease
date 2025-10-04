using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    public class UserSubscription
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; } = null!;

        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;

        [Required]
        public PlanType PlanType { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime? ExpiryDate { get; set; } // Nullable for Lifetime plans
        public bool IsActive { get; set; }
        public string PaymentStatus { get; set; } = null!; // e.g., "Paid", "Pending", "Failed"
    }
}