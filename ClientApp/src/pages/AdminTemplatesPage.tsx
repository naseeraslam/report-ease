import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import templateService from '../services/templateService';
import { TemplateDto } from '../types/template.types';
import { Language } from '../types/report.types';

const AdminTemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<TemplateDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await templateService.getTemplates();
        setTemplates(data);
      } catch (err) {
        setError('Failed to fetch templates.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await templateService.deleteTemplate(id);
        setTemplates(templates.filter(t => t.id !== id));
      } catch (err) {
        setError('Failed to delete template.');
        console.error(err);
      }
    }
  };

  if (loading) return <p>Loading templates...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Manage Templates</h1>
        <Link
          to="/admin/templates/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Template
        </Link>
      </div>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Language</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {templates.map((template) => (
              <tr key={template.id} className="border-b">
                <td className="px-6 py-3">{template.name}</td>
                <td className="px-6 py-3">{Language[template.language]}</td>
                <td className="px-6 py-3 text-center">
                  <Link to={`/admin/templates/edit/${template.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(template.id)}
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
    </div>
  );
};

export default AdminTemplatesPage;