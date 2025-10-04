using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class Template
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = null!;

        [Required]
        public string Content { get; set; } = null!;

        [Required]
        public Language Language { get; set; }
    }
}