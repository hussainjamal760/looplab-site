'use client';

import { LogOut, ShieldCheck, Database, Cpu, Activity, UserCheck } from 'lucide-react';
import { logoutAdmin } from '../services/adminAuthService';

export default function AdminDashboardView({ admin, onLogout }) {
  const handleLogout = async () => {
    await logoutAdmin();
    onLogout();
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <div className="admin-card-shell admin-dashboard-box">
      <div className="admin-badge-sticker" style={{ background: '#e6fab9' }}>
        authenticated session
      </div>

      <div className="admin-user-badge">
        <div className="admin-user-avatar">{getInitials(admin?.name)}</div>
        <div className="admin-user-info">
          <div className="admin-user-name">{admin?.name || 'LoopLab Admin'}</div>
          <div className="admin-user-role">{admin?.role || 'Superadmin'} · {admin?.email || 'admin@looplab.site'}</div>
        </div>
      </div>

      <h2 style={{ fontFamily: 'Epilogue', fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.5rem' }}>
        SYSTEM CONTROL PANEL
      </h2>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
        LoopLab Backend Engine & MongoDB Atlas Connected
      </p>

      <div className="admin-action-grid">
        <div className="admin-action-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#29725f', marginBottom: '4px' }}>
            <Database size={18} />
            <span style={{ fontWeight: 800, fontSize: '0.75rem' }}>CLUSTER</span>
          </div>
          <h4>MongoDB Atlas</h4>
          <p>Connected & Healthy</p>
        </div>

        <div className="admin-action-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9E00FE', marginBottom: '4px' }}>
            <Cpu size={18} />
            <span style={{ fontWeight: 800, fontSize: '0.75rem' }}>REST API</span>
          </div>
          <h4>Express TS v5</h4>
          <p>Port 5000 Active</p>
        </div>

        <div className="admin-action-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f5693c', marginBottom: '4px' }}>
            <ShieldCheck size={18} />
            <span style={{ fontWeight: 800, fontSize: '0.75rem' }}>AUTH GATE</span>
          </div>
          <h4>JWT Security</h4>
          <p>HTTPOnly Cookie Active</p>
        </div>

        <div className="admin-action-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', marginBottom: '4px' }}>
            <Activity size={18} />
            <span style={{ fontWeight: 800, fontSize: '0.75rem' }}>STATUS</span>
          </div>
          <h4>Production Engine</h4>
          <p>All Systems Go</p>
        </div>
      </div>

      <button
        type="button"
        className="admin-submit-btn"
        onClick={handleLogout}
        style={{ background: '#fee2e2', color: '#991b1b', borderColor: '#ef4444', boxShadow: '4px 4px 0px #ef4444' }}
      >
        <LogOut size={18} />
        Terminate Admin Session
      </button>
    </div>
  );
}
