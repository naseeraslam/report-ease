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
        <div className="min-h-screen bg-neutral-100 font-sans">
            <nav className="bg-primary-dark shadow-lg">
                <div className="container mx-auto px-6 py-3">
                    <div className="flex justify-between items-center">
                        <Link to="/dashboard" className="text-2xl font-bold text-white tracking-wider">
                            FIR Editor
                        </Link>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/dashboard" className="text-neutral-300 hover:text-white transition duration-300">Dashboard</Link>
                            <Link to="/reports" className="text-neutral-300 hover:text-white transition duration-300">Reports</Link>
                            {isAdmin && (
                                <Link to="/admin/templates" className="text-neutral-300 hover:text-white transition duration-300">Admin</Link>
                            )}
                        </div>
                        <div className="flex items-center">
                            <FaUserCircle className="text-white text-xl mr-2" />
                            <span className="text-white mr-6">Welcome, {currentUser?.username}</span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center bg-secondary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                            >
                                <FaSignOutAlt className="mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="container mx-auto p-8">
                <Outlet /> {/* Child routes will be rendered here */}
            </main>
        </div>
    );
};

export default Layout;