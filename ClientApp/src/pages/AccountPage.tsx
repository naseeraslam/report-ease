import React from 'react';
import { Link } from 'react-router-dom';
import { FiKey } from 'react-icons/fi';

const AccountPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/update-password"
          className="bg-surface p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center"
        >
          <FiKey className="text-3xl text-primary mr-4" />
          <div>
            <h2 className="text-xl font-semibold">Update Password</h2>
            <p className="text-text-secondary">Change your password to keep your account secure.</p>
          </div>
        </Link>
        {/* Future account management options can be added here */}
      </div>
    </div>
  );
};

export default AccountPage;