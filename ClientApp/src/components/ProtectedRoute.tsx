import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute: React.FC = () => {
  const currentUser = authService.getCurrentUser();

  if (!currentUser) {
    // User not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // User is authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;