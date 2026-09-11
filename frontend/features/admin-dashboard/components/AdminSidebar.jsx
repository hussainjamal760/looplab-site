'use client';

import {
  LayoutGrid,
  Users,
  CheckCircle,
  XCircle,
  Tag,
  Settings,
  HelpCircle,
  LogOut,
  Smartphone,
  Infinity as InfinityIcon,
} from 'lucide-react';

import {
  useGetAdminMetricsQuery,
} from '@/store/api/adminApi';

export default function AdminSidebar({
  activeTab,
  onTabChange,
  onLogout,
}) {
  const { data: metrics } =
    useGetAdminMetricsQuery(undefined, {
      pollingInterval: 30000,
    });

  const pendingCount = Number(
    metrics?.pendingPayments ??
      metrics?.pendingRegistrations ??
      metrics?.pending ??
      0
  );

  const approvedCount = Number(
    metrics?.approvedRegistrations ??
      metrics?.verifiedRegistrations ??
      metrics?.approved ??
      0
  );

  const rejectedCount = Number(
    metrics?.rejectedRegistrations ??
      metrics?.rejected ??
      0
  );

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutGrid,
    },
    {
      id: 'registrations',
      label: 'Pending Registrations',
      icon: Users,
      badge:
        pendingCount > 0
          ? String(pendingCount)
          : null,
    },
    {
      id: 'successful-registrations',
      label: 'Successful Registrations',
      icon: CheckCircle,
      badge:
        approvedCount > 0
          ? String(approvedCount)
          : null,
    },
    {
      id: 'rejected-registrations',
      label: 'Rejected Registrations',
      icon: XCircle,
      badge:
        rejectedCount > 0
          ? String(rejectedCount)
          : null,
    },
    {
      id: 'promo-codes',
      label: 'Promo Codes',
      icon: Tag,
    },
  ];

  const generalItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
    {
      id: 'help',
      label: 'Help',
      icon: HelpCircle,
    },
  ];

  return (
    <aside className="db-sidebar">
      {/* Brand */}

      <div
        className="db-sidebar__brand"
        style={{
          position: 'relative',
          paddingBottom: '1.25rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
          }}
        >
          <InfinityIcon
            size={26}
            strokeWidth={2.5}
            color="#9E00FE"
          />

          <span
            className="admin-brand-logo"
            style={{
              fontFamily:
                "var(--font-pacifico, 'Pacifico', cursive)",
              fontSize: '1.6rem',
              letterSpacing: '-0.5px',
              color:
                'var(--color-black-deep)',
              lineHeight: 1,
            }}
          >
            LOOPLAB
          </span>
        </div>

        <img
          src="/assets/Footer-Sticker SVG/footer-sticker-smiley.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-2px',
            top: '-2px',
            width: '26px',
            height: '26px',
            transform: 'rotate(12deg)',
            filter:
              'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            pointerEvents: 'none',
          }}
        />
      </div>

      <nav className="db-sidebar__nav">
        <div className="db-sidebar__menu-label">
          Menu
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`db-nav-item ${
                isActive ? 'active' : ''
              }`}
              onClick={() =>
                onTabChange(item.id)
              }
            >
              <div className="db-nav-item__left">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="db-nav-badge">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div
          className="db-sidebar__menu-label"
          style={{
            marginTop: '0.75rem',
          }}
        >
          General
        </div>

        {generalItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`db-nav-item ${
                isActive ? 'active' : ''
              }`}
              onClick={() =>
                onTabChange(item.id)
              }
            >
              <div className="db-nav-item__left">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}

        <button
          type="button"
          className="db-nav-item"
          onClick={onLogout}
          style={{
            color: '#ef4444',
          }}
        >
          <div className="db-nav-item__left">
            <LogOut size={18} />
            <span>Logout</span>
          </div>
        </button>
      </nav>

      {/* Bottom application card */}

      <div
        className="db-sidebar-app-card"
        style={{
          position: 'relative',
        }}
      >
        <img
          src="/assets/HorizontalWords SVG/horizontal-words-sticker-phone.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-10px',
            bottom: '-12px',
            width: '64px',
            height: '64px',
            transform: 'rotate(-10deg)',
            opacity: 0.9,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.7rem',
            opacity: 0.85,
            fontWeight: 700,
          }}
        >
          <Smartphone size={14} />
          <span>LoopLab Mobile</span>
        </div>

        <div
          style={{
            fontSize: '0.9rem',
            fontWeight: 800,
            lineHeight: 1.25,
            maxWidth: '120px',
          }}
        >
          Download our Mobile App
        </div>

        <button
          type="button"
          className="db-sidebar-app-card__btn"
        >
          Download
        </button>
      </div>
    </aside>
  );
}