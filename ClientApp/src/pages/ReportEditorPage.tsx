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

    const handleExportPdf = async () => {
        if (!id) return;
        try {
            const pdfBlob = await reportService.exportReportAsPdf(Number(id));
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title || 'report'}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (err) {
            setError('Failed to export PDF.');
            console.error(err);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) return <p>Loading editor...</p>;

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6">{isEditing ? 'Edit Report' : 'Create New Report'}</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Language</label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(Number(e.target.value) as Language)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={Language.English}>English</option>
                        <option value={Language.Urdu}>Urdu</option>
                    </select>
                </div>

                <div className="mb-6">
                    <RichEditor content={content} setContent={setContent} language={language} />
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                        {isEditing && (
                            <>
                                <button
                                    type="button"
                                    onClick={handleExportPdf}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                                >
                                    Export as PDF
                                </button>
                                <button
                                    type="button"
                                    onClick={handlePrint}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                                >
                                    Print
                                </button>
                            </>
                        )}
                    </div>
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => navigate('/reports')}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg mr-2 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                        >
                            {isEditing ? 'Update Report' : 'Create Report'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ReportEditorPage;
