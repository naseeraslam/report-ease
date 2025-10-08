import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p>This is a protected dashboard. Only logged-in users can see this.</p>
            <p className="mt-4">
                From here, you will be able to manage your FIR reports and templates.
            </p>

            {/* Link to create a new report */}
            <div className="mt-6">
                <Link
                    to="/reports/new"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Create New Report
                </Link>
            </div>

            {/* Link to reports list */}
            <div className="mt-4">
                <Link
                    to="/reports"
                    className="text-blue-500 hover:underline"
                >
                    View All Reports
                </Link>
            </div>
        </div>
    );
};

export default DashboardPage;
