'use client';

import AdminDashboardRoot from '@/features/admin-dashboard/AdminDashboardRoot';
import { logoutAdmin } from '../services/adminAuthService';

export default function AdminDashboardView({ admin, onLogout }) {
  const handleLogout = async () => {
    await logoutAdmin();
    onLogout();
  };

  return <AdminDashboardRoot admin={admin} onLogout={handleLogout} />;
}
