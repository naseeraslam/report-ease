import React from 'react';
import { Link } from 'react-router-dom';
import { FilePlus2, FolderOpen } from 'lucide-react';

const DashboardPage: React.FC = () => {
    return (
        <div className="p-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
                        Welcome to Your Dashboard
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">
                        Manage your FIR reports, templates, and track your activity here.
                    </p>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Create New Report */}
                    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Create a New Report
                            </h2>
                            <FilePlus2 className="w-8 h-8 text-blue-500" />
                        </div>
                        <p className="text-gray-600 mb-6">
                            Start a fresh FIR report using the latest templates and guidelines.
                        </p>
                        <Link
                            to="/reports/new"
                            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all"
                        >
                            Create Report
                        </Link>
                    </div>

                    {/* View All Reports */}
                    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                View All Reports
                            </h2>
                            <FolderOpen className="w-8 h-8 text-green-500" />
                        </div>
                        <p className="text-gray-600 mb-6">
                            Access all your submitted or draft reports in one place.
                        </p>
                        <Link
                            to="/reports"
                            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all"
                        >
                            View Reports
                        </Link>
                    </div>
                </div>

                {/* Footer info */}
                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>Need help? Visit the help section or contact support.</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
