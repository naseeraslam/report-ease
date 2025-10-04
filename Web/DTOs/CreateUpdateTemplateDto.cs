using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace Web.DTOs
{
    public class CreateUpdateTemplateDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = null!;

        [Required]
        public string Content { get; set; } = null!;

        [Required]
        public Language Language { get; set; }
    }
}