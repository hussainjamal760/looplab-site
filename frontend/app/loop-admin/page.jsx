'use client';

import { useState, useEffect } from 'react';
import SmoothScroll from '@/features/effects-and-cursor/components/SmoothScroll';
import CursorBubble from '@/features/effects-and-cursor/components/CursorBubble';
import TransitionScribble from '@/features/effects-and-cursor/components/TransitionScribble';
import AdminBadgeHeader from '@/features/admin-auth/components/AdminBadgeHeader';
import AdminLoginForm from '@/features/admin-auth/components/AdminLoginForm';
import AdminDashboardView from '@/features/admin-auth/components/AdminDashboardView';
import { fetchCurrentAdmin } from '@/features/admin-auth/services/adminAuthService';

export default function LoopAdminPage() {
  const [admin, setAdmin] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkExistingSession() {
      try {
        const currentAdmin = await fetchCurrentAdmin();
        if (currentAdmin) {
          setAdmin(currentAdmin);
        }
      } catch (err) {
        // Unauthenticated state
      } finally {
        setCheckingAuth(false);
      }
    }

    checkExistingSession();
  }, []);

  return (
    <div className="admin-page-container">
      <SmoothScroll />
      <CursorBubble />

      {/* Decorative ambient background glows */}
      <div className="admin-bg-blob admin-blob-1" />
      <div className="admin-bg-blob admin-blob-2" />

      <AdminBadgeHeader />

      <main className="admin-main">
        {!checkingAuth && (
          admin ? (
            <AdminDashboardView admin={admin} onLogout={() => setAdmin(null)} />
          ) : (
            <AdminLoginForm onSuccess={(loggedInAdmin) => setAdmin(loggedInAdmin)} />
          )
        )}
      </main>

      <TransitionScribble />
    </div>
  );
}
