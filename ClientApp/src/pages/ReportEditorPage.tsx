import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import reportService from '../services/reportService';
import { CreateUpdateReportDto, Language } from '../types/report.types';
import RichEditor from "../components/RichEditor.tsx";

const ReportEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Default language to English (or Urdu if you prefer)
  const [language, setLanguage] = useState<Language>(Language.English);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      reportService.getReport(Number(id))
          .then(data => {
            setTitle(data.title);
            setContent(data.content);
            setLanguage(data.language);
          })
          .catch(err => {
            setError('Failed to load report data.');
            console.error(err);
          })
          .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Ensure language is always defined
    const reportData: CreateUpdateReportDto = {
      title,
      content,
      language: language ?? Language.English
    };

    try {
      if (isEditing) {
        await reportService.updateReport(Number(id), reportData);
      } else {
        await reportService.createReport(reportData);
      }
      navigate('/reports');
    } catch (err) {
      setError('Failed to save the report.');
      console.error(err);
    }
  };

  if (loading) return <p>Loading editor...</p>;

  return (
      <div>
        <h1 className="text-3xl font-bold mb-4">{isEditing ? 'Edit Report' : 'Create New Report'}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Language</label>
            <select
                value={language}
                onChange={(e) => setLanguage(Number(e.target.value) as Language)}
                className="w-full px-3 py-2 border rounded"
            >
              <option value={Language.English}>English</option>
              <option value={Language.Urdu}>Urdu</option>
            </select>
          </div>

          <div className="mb-4">
            {/* Pass a guaranteed language to the editor */}
            <RichEditor content={content} setContent={setContent} language={language} />
          </div>

          <div className="flex justify-end">
            <button
                type="button"
                onClick={() => navigate('/reports')}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isEditing ? 'Update Report' : 'Create Report'}
            </button>
          </div>
        </form>
      </div>
  );
};

export default ReportEditorPage;
