using System.ComponentModel.DataAnnotations;

namespace Web.DTOs
{
    public class CopyReportDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
    }
}