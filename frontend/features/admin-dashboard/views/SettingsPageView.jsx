'use client';

import { useState } from 'react';
import { Sliders, Users, Bell, Shield, FileText } from 'lucide-react';

export default function SettingsPageView() {
  const [activeSubTab, setActiveSubTab] = useState('audit');

  const subTabs = [
    { id: 'general', label: 'General', icon: Sliders },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'audit', label: 'Audit Log', icon: FileText },
  ];

  const auditLogs = [
    { time: '2025-02-11 12:38', user: 'Admin', action: 'Change Password', details: 'Details · Entered OTP Account: SPRING25', ip: '192.168.1.25' },
    { time: '2025-02-11 10:14', user: 'Admin', action: 'Approve Registration', details: 'Approved applicant: Ayesha Khan (2025-APC-12)', ip: '192.168.1.25' },
    { time: '2025-02-10 16:50', user: 'Admin', action: 'Create Promo Code', details: 'Created voucher code: SPRING25 (15% OFF)', ip: '192.168.1.25' },
    { time: '2025-02-10 14:22', user: 'Admin', action: 'Verify Payment Slip', details: 'Verified bank transaction TXN-883190', ip: '192.168.1.25' },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dz-text-primary)', margin: 0 }}>
          Settings & Audit Log
        </h1>
        <span
          className="admin-badge-sticker"
          style={{
            background: 'var(--color-lightblue)',
            color: 'var(--color-darkblue)',
            fontSize: '0.62rem',
            padding: '2px 8px',
            transform: 'rotate(2deg)',
            margin: 0,
            border: 'none',
          }}
        >
          system controls
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1.25rem', alignItems: 'start' }}>
        {/* Left Sub-nav */}
        <div className="db-card" style={{ padding: '0.65rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {subTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSubTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: isActive ? 'var(--dz-purple-soft)' : 'transparent',
                    color: isActive ? 'var(--dz-purple-primary)' : 'var(--dz-text-secondary)',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '0.825rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Audit Content */}
        <div className="db-card">
          <div className="db-card__header">
            <span className="db-card__title">Audit Log</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="db-table-clean">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Details</th>
                  <th>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log, idx) => (
                  <tr key={idx}>
                    <td style={{ color: 'var(--dz-text-muted)', fontSize: '0.775rem' }}>{log.time}</td>
                    <td style={{ fontWeight: 700 }}>{log.user}</td>
                    <td>
                      <span style={{ background: 'var(--dz-purple-soft)', color: 'var(--dz-purple-primary)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.725rem', fontWeight: 800 }}>
                        {log.action}
                      </span>
                    </td>
                    <td style={{ color: 'var(--dz-text-muted)' }}>{log.details}</td>
                    <td style={{ color: 'var(--dz-text-muted)', fontFamily: 'monospace' }}>{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--dz-border)' }}>
            <button type="button" className="db-btn-purple-pill">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
