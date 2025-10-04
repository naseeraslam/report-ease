using System.Collections.Generic;
using Core.Entities;

namespace Web.DTOs
{
    public class UserDetailDto
    {
        public string Id { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public IList<string> Roles { get; set; } = new List<string>();
        public UserSubscription? Subscription { get; set; }
    }
}