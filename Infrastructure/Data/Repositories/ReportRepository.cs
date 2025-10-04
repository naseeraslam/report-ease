using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data.Repositories
{
    public class ReportRepository : Repository<Report>, IReportRepository
    {
        public ReportRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}