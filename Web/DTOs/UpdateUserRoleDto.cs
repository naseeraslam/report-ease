using System.ComponentModel.DataAnnotations;

namespace Web.DTOs
{
    public class UpdateUserRoleDto
    {
        [Required]
        public string UserId { get; set; } = null!;

        [Required]
        public string RoleName { get; set; } = null!;
    }
}