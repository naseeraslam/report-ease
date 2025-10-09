import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { FiMail, FiLock } from 'react-icons/fi';
import Header from '../components/Header';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await authService.login({ email, password });
            navigate('/dashboard');
        } catch (err: any) {
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError('Failed to login. Please check your credentials.');
            }
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="flex items-center justify-center py-20">
                <div className="w-full max-w-md p-8 space-y-6 bg-surface rounded-2xl shadow-lg border border-border">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-text">Welcome Back!</h2>
                        <p className="mt-2 text-text-light">Please sign in to continue</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="relative">
                            <FiMail className="absolute top-3.5 left-3 text-text-light" />
                            <input
                                type="email"
                                className="input-field pl-10"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative">
                            <FiLock className="absolute top-3.5 left-3 text-text-light" />
                            <input
                                type="password"
                                className="input-field pl-10"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center whitespace-pre-line">{error}</p>}
                        <div>
                            <button type="submit" className="w-full btn-primary btn">
                                Sign In
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-sm text-text-light">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;