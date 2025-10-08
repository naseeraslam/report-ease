import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import reportService from '../services/reportService';
import { ReportDto, Language } from '../types/report.types';

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

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p className="text-red-500 mb-4">{error}</p>;

  return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Reports</h1>
          <Link
              to="/reports/new"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New Report
          </Link>
        </div>

        {reports.length === 0 ? (
            <p>No reports found. Click "Create New Report" to get started.</p>
        ) : (
            <div className="bg-white shadow-md rounded overflow-hidden">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Language</th>
                  <th className="px-6 py-3 text-left">Last Updated</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
                </thead>
                <tbody className="text-gray-700">
                {reports.map(report => (
                    <tr key={report.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3">{report.title}</td>
                      <td className="px-6 py-3">
                        {report.language === Language.English ? 'English' : 'Urdu'}
                      </td>
                      <td className="px-6 py-3">
                        {new Date(report.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <Link
                            to={`/reports/edit/${report.id}`}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(report.id)}
                            className="text-red-600 hover:text-red-900"
                        >
                          Delete
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
