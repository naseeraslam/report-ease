import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

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
        } else if (typeof errorData === 'string'){
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
    <div className="flex items-center justify-center min-h-screen bg-neutral-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-neutral-800">Create Account</h2>
          <p className="mt-2 text-neutral-500">Join us and start creating reports</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-neutral-400" />
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-neutral-400" />
            <input
              type="email"
              className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-neutral-400" />
            <input
              type="password"
              className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center whitespace-pre-line">{error}</p>}
          <div>
            <button type="submit" className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-md transition duration-300">
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;