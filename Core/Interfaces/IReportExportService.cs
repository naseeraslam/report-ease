using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IReportExportService
    {
        Task<byte[]> GeneratePdfAsync(Report report);
        Task<byte[]> GenerateDocxAsync(Report report);
    }
}