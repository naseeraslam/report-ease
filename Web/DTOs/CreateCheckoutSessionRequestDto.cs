using System.ComponentModel.DataAnnotations;

namespace Web.DTOs
{
    public class CreateCheckoutSessionRequestDto
    {
        [Required]
        public string PriceId { get; set; } = null!;

        [Required]
        public string SuccessUrl { get; set; } = null!;

        [Required]
        public string CancelUrl { get; set; } = null!;
    }
}