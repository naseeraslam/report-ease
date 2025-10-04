using System.IO;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using SelectPdf;

namespace Infrastructure.Services
{
    public class ReportExportService : IReportExportService
    {
        public Task<byte[]> GeneratePdfAsync(Report report)
        {
            // Create a new PDF document
            PdfDocument doc = new PdfDocument();

            // Add a new page to the document
            PdfPage page = doc.AddPage();

            // Create a new HTML to PDF converter
            HtmlToPdf converter = new HtmlToPdf();

            // It's a good practice to wrap the content in a basic HTML structure
            string htmlContent = $"<html><body><h1>{report.Title}</h1><div>{report.Content}</div></body></html>";

            // Convert the HTML string to a PDF document
            PdfDocument pdf = converter.ConvertHtmlString(htmlContent);

            // Save the PDF to a memory stream
            MemoryStream ms = new MemoryStream();
            pdf.Save(ms);
            byte[] pdfBytes = ms.ToArray();
            ms.Close();
            pdf.Close();

            return Task.FromResult(pdfBytes);
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