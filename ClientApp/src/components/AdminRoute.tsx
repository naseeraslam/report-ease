import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string | string[];
  exp: number;
}

const isAdmin = (): boolean => {
  const user = authService.getCurrentUser();
  if (!user || !user.token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(user.token);
    const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (Array.isArray(roles)) {
      return roles.includes('Admin');
    }
    return roles === 'Admin';
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

const AdminRoute: React.FC = () => {
  if (!isAdmin()) {
    // User is not an admin, redirect to dashboard or another appropriate page
    return <Navigate to="/dashboard" />;
  }

  // User is an admin, render the child routes
  return <Outlet />;
};

export default AdminRoute;