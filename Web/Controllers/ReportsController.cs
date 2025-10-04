using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Web.DTOs;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReportsController : ControllerBase
    {
        private readonly IReportRepository _reportRepository;
        private readonly ITemplateRepository _templateRepository;
        private readonly UserManager<User> _userManager;
        private readonly IReportExportService _reportExportService;

        public ReportsController(
            IReportRepository reportRepository,
            ITemplateRepository templateRepository,
            UserManager<User> userManager,
            IReportExportService reportExportService)
        {
            _reportRepository = reportRepository;
            _templateRepository = templateRepository;
            _userManager = userManager;
            _reportExportService = reportExportService;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ReportDto>>> GetReports()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var reports = (await _reportRepository.ListAllAsync()).Where(r => r.UserId == userId);

            var reportDtos = reports.Select(r => new ReportDto
            {
                Id = r.Id,
                Title = r.Title,
                Content = r.Content,
                Language = r.Language,
                CreatedAt = r.CreatedAt,
                UpdatedAt = r.UpdatedAt
            }).ToList();

            return Ok(reportDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReportDto>> GetReport(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var report = await _reportRepository.GetByIdAsync(id);

            if (report == null || report.UserId != userId)
            {
                return NotFound();
            }

            return new ReportDto
            {
                Id = report.Id,
                Title = report.Title,
                Content = report.Content,
                Language = report.Language,
                CreatedAt = report.CreatedAt,
                UpdatedAt = report.UpdatedAt
            };
        }

        [HttpPost]
        public async Task<ActionResult<ReportDto>> CreateReport(CreateUpdateReportDto reportDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("User ID could not be determined from token.");
            }

            var report = new Report
            {
                Title = reportDto.Title,
                Content = reportDto.Content,
                Language = reportDto.Language,
                UserId = userId
            };

            var createdReport = await _reportRepository.AddAsync(report);
            return CreatedAtAction(nameof(GetReport), new { id = createdReport.Id }, createdReport);
        }

        [HttpPost("from-template")]
        public async Task<ActionResult<ReportDto>> CreateReportFromTemplate(CreateReportFromTemplateDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("User ID could not be determined from token.");
            }

            var template = await _templateRepository.GetByIdAsync(dto.TemplateId);

            if (template == null)
            {
                return BadRequest("Template not found.");
            }

            var report = new Report
            {
                Title = dto.Title,
                Content = template.Content, // Use template content
                Language = template.Language,
                UserId = userId
            };

            var createdReport = await _reportRepository.AddAsync(report);
            return CreatedAtAction(nameof(GetReport), new { id = createdReport.Id }, createdReport);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReport(int id, CreateUpdateReportDto reportDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var report = await _reportRepository.GetByIdAsync(id);

            if (report == null || report.UserId != userId)
            {
                return NotFound();
            }

            report.Title = reportDto.Title;
            report.Content = reportDto.Content;
            report.Language = reportDto.Language;
            report.UpdatedAt = DateTime.UtcNow;

            await _reportRepository.UpdateAsync(report);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReport(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var report = await _reportRepository.GetByIdAsync(id);

            if (report == null || report.UserId != userId)
            {
                return NotFound();
            }

            await _reportRepository.DeleteAsync(report);
            return NoContent();
        }

        [HttpGet("{id}/export/pdf")]
        public async Task<IActionResult> ExportReportAsPdf(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var report = await _reportRepository.GetByIdAsync(id);

            if (report == null || report.UserId != userId)
            {
                return NotFound();
            }

            var pdfBytes = await _reportExportService.GeneratePdfAsync(report);
            return File(pdfBytes, "application/pdf", $"{report.Title}.pdf");
        }

        [HttpGet("{id}/export/docx")]
        public async Task<IActionResult> ExportReportAsDocx(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var report = await _reportRepository.GetByIdAsync(id);

            if (report == null || report.UserId != userId)
            {
                return NotFound();
            }

            var docxBytes = await _reportExportService.GenerateDocxAsync(report);
            return File(docxBytes, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", $"{report.Title}.docx");
        }
    }
}