import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import reportService from '../services/reportService';
import { ReportDto, Language } from '../types/report.types';
import { FaEdit, FaCopy, FaFilePdf, FaFileWord, FaTrash, FaPlus } from 'react-icons/fa';

const ReportsListPage: React.FC = () => {
  const [reports, setReports] = useState<ReportDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await reportService.getReports();
        setReports(data);
      } catch (err) {
        setError('Failed to fetch reports.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await reportService.deleteReport(id);
        setReports(reports.filter(r => r.id !== id));
      } catch (err) {
        setError('Failed to delete report.');
        console.error(err);
      }
    }
  };

  const handleCopy = async (id: number) => {
    const newTitle = window.prompt("Enter a new title for the copied report:");
    if (newTitle) {
      try {
        const newReport = await reportService.copyReport(id, { title: newTitle });
        setReports([...reports, newReport]);
      } catch (err) {
        setError('Failed to copy report.');
        console.error(err);
      }
    }
  };

  const handleExport = async (report: ReportDto, format: 'pdf' | 'docx') => {
    try {
      const blob = format === 'pdf'
        ? await reportService.exportReportAsPdf(report.id)
        : await reportService.exportReportAsDocx(report.id);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.title}.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      setError(`Failed to export as ${format.toUpperCase()}.`);
      console.error(err);
    }
  };

  if (loading) return <p className="text-center text-neutral-500">Loading reports...</p>;
  if (error) return <p className="text-red-500 bg-red-100 p-4 rounded-lg text-center">{error}</p>;

  return (
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-800">My Reports</h1>
          <Link
              to="/reports/new"
              className="flex items-center bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md"
          >
            <FaPlus className="mr-2" />
            Create New Report
          </Link>
        </div>

        {reports.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 text-lg">No reports found. Click "Create New Report" to get started.</p>
            </div>
        ) : (
            <div className="overflow-x-auto rounded-lg border border-neutral-200">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Language</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Last Updated</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                {reports.map(report => (
                    <tr key={report.id} className="hover:bg-neutral-50 transition duration-300">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{report.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${report.language === Language.English ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {report.language === Language.English ? 'English' : 'Urdu'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {new Date(report.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                        <Link to={`/reports/edit/${report.id}`} className="p-2 rounded-full hover:bg-neutral-200 transition duration-300" title="Edit">
                          <FaEdit className="text-neutral-600" />
                        </Link>
                        <button onClick={() => handleCopy(report.id)} className="p-2 rounded-full hover:bg-neutral-200 transition duration-300" title="Copy">
                          <FaCopy className="text-neutral-600" />
                        </button>
                        <button onClick={() => handleExport(report, 'pdf')} className="p-2 rounded-full hover:bg-neutral-200 transition duration-300" title="Export as PDF">
                          <FaFilePdf className="text-red-600" />
                        </button>
                        <button onClick={() => handleExport(report, 'docx')} className="p-2 rounded-full hover:bg-neutral-200 transition duration-300" title="Export as DOCX">
                          <FaFileWord className="text-blue-600" />
                        </button>
                        <button onClick={() => handleDelete(report.id)} className="p-2 rounded-full hover:bg-neutral-200 transition duration-300" title="Delete">
                          <FaTrash className="text-red-600" />
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        )}
      </div>
  );
};

export default ReportsListPage;