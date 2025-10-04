using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace Web.DTOs
{
    public class CreateUpdateReportDto
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = null!;

        [Required]
        public string Content { get; set; } = null!;

        [Required]
        public Language Language { get; set; }
    }
}