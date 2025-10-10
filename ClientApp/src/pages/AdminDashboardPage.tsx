import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiFileText } from 'react-icons/fi';

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <p className="text-lg text-text-secondary mb-8">
        Welcome to the admin dashboard. Here you can manage users, templates, and other application settings.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/users"
          className="bg-surface p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center"
        >
          <FiUsers className="text-3xl text-primary mr-4" />
          <div>
            <h2 className="text-xl font-semibold">User Management</h2>
            <p className="text-text-secondary">View, edit, and manage user roles.</p>
          </div>
        </Link>
        <Link
          to="/admin/templates"
          className="bg-surface p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center"
        >
          <FiFileText className="text-3xl text-primary mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Template Management</h2>
            <p className="text-text-secondary">Create and manage report templates.</p>
          </div>
        </Link>
        {/* Future admin features can be added here */}
      </div>
    </div>
  );
};

export default AdminDashboardPage;