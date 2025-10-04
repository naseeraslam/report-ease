import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>This is a protected dashboard. Only logged-in users can see this.</p>
      <p className="mt-4">
        From here, you will be able to manage your FIR reports and templates.
      </p>
    </div>
  );
};

export default DashboardPage;