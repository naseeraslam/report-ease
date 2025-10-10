import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import ReportsListPage from './pages/ReportsListPage';
import ReportEditorPage from './pages/ReportEditorPage';
import AdminTemplatesPage from './pages/AdminTemplatesPage';
import AdminTemplateEditorPage from './pages/AdminTemplateEditorPage';
import AdminRoute from './components/AdminRoute';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AccountPage from './pages/AccountPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import UserManagementPage from './pages/UserManagementPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes with Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/reports" element={<ReportsListPage />} />
            <Route path="/reports/new" element={<ReportEditorPage />} />
            <Route path="/reports/edit/:id" element={<ReportEditorPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/update-password" element={<UpdatePasswordPage />} />

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/users" element={<UserManagementPage />} />
              <Route path="/admin/templates" element={<AdminTemplatesPage />} />
              <Route path="/admin/templates/new" element={<AdminTemplateEditorPage />} />
              <Route path="/admin/templates/edit/:id" element={<AdminTemplateEditorPage />} />
            </Route>
          </Route>
        </Route>

        {/* Redirect root path */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;