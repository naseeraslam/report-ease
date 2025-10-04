using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.DTOs;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class TemplatesController : ControllerBase
    {
        private readonly ITemplateRepository _templateRepository;

        public TemplatesController(ITemplateRepository templateRepository)
        {
            _templateRepository = templateRepository;
        }

        [HttpGet]
        [AllowAnonymous] // All users should be able to view templates
        public async Task<ActionResult<IReadOnlyList<Template>>> GetTemplates()
        {
            var templates = await _templateRepository.ListAllAsync();
            return Ok(templates);
        }

        [HttpGet("{id}")]
        [AllowAnonymous] // All users should be able to view a single template
        public async Task<ActionResult<Template>> GetTemplate(int id)
        {
            var template = await _templateRepository.GetByIdAsync(id);
            if (template == null)
            {
                return NotFound();
            }
            return Ok(template);
        }

        [HttpPost]
        public async Task<ActionResult<Template>> CreateTemplate(CreateUpdateTemplateDto templateDto)
        {
            var template = new Template
            {
                Name = templateDto.Name,
                Content = templateDto.Content,
                Language = templateDto.Language
            };

            var createdTemplate = await _templateRepository.AddAsync(template);
            return CreatedAtAction(nameof(GetTemplate), new { id = createdTemplate.Id }, createdTemplate);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTemplate(int id, CreateUpdateTemplateDto templateDto)
        {
            var template = await _templateRepository.GetByIdAsync(id);
            if (template == null)
            {
                return NotFound();
            }

            template.Name = templateDto.Name;
            template.Content = templateDto.Content;
            template.Language = templateDto.Language;

            await _templateRepository.UpdateAsync(template);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTemplate(int id)
        {
            var template = await _templateRepository.GetByIdAsync(id);
            if (template == null)
            {
                return NotFound();
            }

            await _templateRepository.DeleteAsync(template);
            return NoContent();
        }
    }
}