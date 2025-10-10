import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { FiLogIn, FiLogOut, FiUserPlus, FiGrid, FiFileText, FiSettings, FiUser } from 'react-icons/fi';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const currentUser = authService.getCurrentUser();
    const isAdmin = currentUser?.roles?.includes('Admin');

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const NavLink: React.FC<{ to: string; children: React.ReactNode; icon?: any }> = ({ to, children, icon }) => (
        <Link to={to} className="flex items-center text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
            {icon && React.createElement(icon, { className: "mr-2" })}
            {children}
        </Link>
    );

    return (
        <header className="bg-surface shadow-sm border-b border-border">
            <div className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-text">
                        <Link to={currentUser ? "/dashboard" : "/login"}>FIR Editor</Link>
                    </div>
                    <nav className="flex items-center space-x-2">
                        {currentUser ? (
                            <>
                                <NavLink to="/dashboard" icon={FiGrid}>Dashboard</NavLink>
                                <NavLink to="/reports" icon={FiFileText}>Reports</NavLink>
                                {isAdmin && (
                                    <NavLink to="/admin/dashboard" icon={FiSettings}>Admin</NavLink>
                                )}
                                <NavLink to="/account" icon={FiUser}>Account</NavLink>
                                <button
                                    onClick={handleLogout}
                                    className="btn-secondary btn flex items-center"
                                >
                                    <FiLogOut className="mr-2" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn-primary btn flex items-center">
                                    <FiLogIn className="mr-2" />
                                    Login
                                </Link>
                                <Link to="/register" className="btn-secondary btn flex items-center ml-2">
                                    <FiUserPlus className="mr-2" />
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;