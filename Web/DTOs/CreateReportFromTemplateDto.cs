using System.ComponentModel.DataAnnotations;

namespace Web.DTOs
{
    public class CreateReportFromTemplateDto
    {
        [Required]
        public int TemplateId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = null!;
    }
}