'use client';

import { Search, Mail, Bell } from 'lucide-react';

export default function AdminTopBar({ searchQuery, onSearchChange, admin }) {
  return (
    <header className="db-topbar">
      {/* Search pill with ⌘ F badge */}
      <div className="db-topbar__search">
        <Search size={16} color="#9ca3af" />
        <input
          type="text"
          placeholder="Search task, event, or candidate..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <span className="db-topbar__shortcut">⌘ F</span>
      </div>

      {/* Right controls */}
      <div className="db-topbar__actions">
        {/* Exact Login Page Secure Gateway Pill */}
        <div className="admin-status-pill" style={{ marginRight: '0.5rem', display: 'flex', alignItems: 'center' }}>
          <span className="admin-status-dot" />
          SECURE ADMIN GATEWAY
        </div>

        <button type="button" className="db-icon-circle-btn" title="Messages">
          <Mail size={16} />
        </button>

        <button type="button" className="db-icon-circle-btn" title="Notifications">
          <Bell size={16} />
        </button>

        {/* Profile Chip */}
        <div className="db-profile-chip">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.8rem',
            }}
          >
            A
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--dz-text-primary)' }}>
              {admin?.name || 'Looplab Admin'}
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--dz-text-muted)', fontWeight: 600 }}>
              {admin?.email || 'admin@looplab.site'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
