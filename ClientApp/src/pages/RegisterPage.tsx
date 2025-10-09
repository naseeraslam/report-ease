import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import Header from '../components/Header';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await authService.register({ username, email, password });
            // After successful registration, log the user in
            await authService.login({ email, password });
            navigate('/dashboard');
        } catch (err: any) {
            if (err.response && err.response.data) {
                const errorData = err.response.data;
                // ASP.NET Identity errors are often an array of objects with a 'description' property
                if (Array.isArray(errorData)) {
                    const messages = errorData.map((e: { description: string }) => e.description).join('\n');
                    setError(messages);
                } else if (errorData.errors) {
                    // Handle standard validation problem details (e.g., from [ApiController])
                    const messages = Object.values(errorData.errors).flat().join('\n');
                    setError(messages);
                } else if (typeof errorData === 'string') {
                    setError(errorData);
                } else {
                    setError('An unknown error occurred. Please check the console for more details.');
                }
            } else {
                setError('An unexpected error occurred. Please try again.');
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
                        <h2 className="text-3xl font-bold text-text">Create Account</h2>
                        <p className="mt-2 text-text-light">Join us and start creating reports</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div className="relative">
                            <FiUser className="absolute top-3.5 left-3 text-text-light" />
                            <input
                                type="text"
                                className="input-field pl-10"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
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
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-sm text-text-light">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;