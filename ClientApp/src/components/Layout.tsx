import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/dashboard" className="text-xl font-bold">
            FIR Report Editor
          </Link>
          <div>
            {currentUser ? (
              <>
                <span className="mr-4">Welcome, {currentUser.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mr-4">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4 flex-grow">
        <Outlet /> {/* Child routes will be rendered here */}
      </main>
    </div>
  );
};

export default Layout;