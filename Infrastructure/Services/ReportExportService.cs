using System;
using System.IO;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.Extensions.Hosting;
using SelectPdf;

namespace Infrastructure.Services
{
    public class ReportExportService : IReportExportService
    {
        private readonly string _fontPath;

        public ReportExportService(IHostEnvironment hostEnvironment)
        {
            // It's important to resolve the path relative to the content root
            var contentRoot = hostEnvironment.ContentRootPath;
            _fontPath = Path.Combine(contentRoot, "Fonts", "Jameel Noori Nastaleeq.ttf");
        }
        public Task<byte[]> GeneratePdfAsync(Report report)
        {
            try
            {
                var isUrdu = report.Language.Equals("urdu", StringComparison.OrdinalIgnoreCase);
                string fontFaceCss = "";
                string bodyStyle = "";

                if (isUrdu)
                {
                    if (File.Exists(_fontPath))
                    {
                        // Convert font to Base64 to embed it in the CSS
                        string fontBase64 = Convert.ToBase64String(File.ReadAllBytes(_fontPath));
                        fontFaceCss = @"
                            @font-face {
                                font-family: 'Jameel Noori Nastaleeq';
                                src: url(data:font/ttf;base64," + fontBase64 + @") format('truetype');
                            }";
                        bodyStyle = "font-family: 'Jameel Noori Nastaleeq'; direction: rtl;";
                    }
                    else
                    {
                        // Fallback or log if font is not found
                        Console.WriteLine("Jameel Noori Nastaleeq font not found at path: " + _fontPath);
                        bodyStyle = "direction: rtl;"; // Still apply RTL for Urdu
                    }
                }

                // Create a new HTML to PDF converter
                HtmlToPdf converter = new HtmlToPdf();
                converter.Options.PdfPageSize = PdfPageSize.A4;
                converter.Options.MarginTop = 20;
                converter.Options.MarginBottom = 20;

                // Construct the HTML content with embedded styles
                string htmlContent = $@"
                    <html>
                        <head>
                            <meta charset='UTF-8'>
                            <style>
                                {fontFaceCss}
                                body {{
                                    {bodyStyle}
                                }}
                                .content {{
                                    white-space: pre-wrap; /* Preserve whitespace and newlines */
                                }}
                            </style>
                        </head>
                        <body>
                            <h1>{report.Title}</h1>
                            <div class='content'>{report.Content}</div>
                        </body>
                    </html>";

                // Convert the HTML string to a PDF document
                PdfDocument pdf = converter.ConvertHtmlString(htmlContent);

                // Save the PDF to a memory stream
                using (MemoryStream ms = new MemoryStream())
                {
                    pdf.Save(ms);
                    pdf.Close(); // Close the document before returning the bytes
                    return Task.FromResult(ms.ToArray());
                }
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                Console.WriteLine($"An error occurred during PDF generation: {ex.Message}");
                // Return an empty PDF or throw a custom exception
                return Task.FromResult(Array.Empty<byte>());
            }
        }

        public Task<byte[]> GenerateDocxAsync(Report report)
        {
            using (MemoryStream mem = new MemoryStream())
            {
                // Create a Wordprocessing document.
                using (WordprocessingDocument wordDocument = WordprocessingDocument.Create(mem, WordprocessingDocumentType.Document, true))
                {
                    // Add a main document part.
                    MainDocumentPart mainPart = wordDocument.AddMainDocumentPart();

                    // Create the document structure.
                    mainPart.Document = new Document();
                    Body body = mainPart.Document.AppendChild(new Body());

                    // Add title.
                    Paragraph titlePara = body.AppendChild(new Paragraph());
                    Run titleRun = titlePara.AppendChild(new Run());
                    titleRun.AppendChild(new Text(report.Title));
                    // You can add styling here if needed, e.g., for font size or bold.

                    // Add content.
                    Paragraph contentPara = body.AppendChild(new Paragraph());
                    Run contentRun = contentPara.AppendChild(new Run());
                    contentRun.AppendChild(new Text(report.Content));
                }

                return Task.FromResult(mem.ToArray());
            }
        }
    }
}