import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const currentUser = authService.getCurrentUser();
    const isAdmin = currentUser?.roles?.includes('Admin');

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <Link to="/dashboard" className="text-2xl font-bold text-gray-800">
                            FIR Editor
                        </Link>
                        <div className="flex items-center space-x-6">
                            <Link to="/dashboard" className="text-gray-600 hover:text-blue-500">Dashboard</Link>
                            <Link to="/reports" className="text-gray-600 hover:text-blue-500">Reports</Link>
                            {isAdmin && (
                                <Link to="/admin/templates" className="text-gray-600 hover:text-blue-500">Admin</Link>
                            )}
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-4">Welcome, {currentUser?.username}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="container mx-auto p-6">
                <Outlet /> {/* Child routes will be rendered here */}
            </main>
        </div>
    );
};

export default Layout;