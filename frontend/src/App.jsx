import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';

const App = () => (
  <Routes>
    <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
    <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
    </Route>
    <Route path="/dashboard" element={<Navigate to="/" replace />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default App;
