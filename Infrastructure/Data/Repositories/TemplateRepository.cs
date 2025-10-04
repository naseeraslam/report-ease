using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data.Repositories
{
    public class TemplateRepository : Repository<Template>, ITemplateRepository
    {
        public TemplateRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}