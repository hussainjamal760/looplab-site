'use client';

import { useState } from 'react';

import AdminSidebar from './components/AdminSidebar';
import AdminTopBar from './components/AdminTopBar';

import DashboardOverviewView from './views/DashboardOverviewView';
import RegistrationsPageView from './views/RegistrationsPageView';
import SuccessfulRegistrationsPageView from './views/SuccessfulRegistrationsPageView';
import RejectedRegistrationsPageView from './views/RejectedRegistrationsPageView';
import PromoCodesPageView from './views/PromoCodesPageView';
import SettingsPageView from './views/SettingsPageView';
import EventsPageView from './views/EventsPageView';

export default function AdminDashboardRoot({
  admin,
  onLogout,
}) {
  const [activeTab, setActiveTab] =
    useState('dashboard');

  const [searchQuery, setSearchQuery] =
    useState('');

  return (
    <div className="db-layout">
      <div
        className="admin-bg-blob admin-blob-1"
        style={{
          opacity: 0.18,
          zIndex: 0,
        }}
      />

      <div
        className="admin-bg-blob admin-blob-2"
        style={{
          opacity: 0.16,
          zIndex: 0,
        }}
      />

      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
      />

      <div className="db-main-content">
        <AdminTopBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          admin={admin}
        />

        {activeTab === 'dashboard' && (
          <DashboardOverviewView
            onAddEvent={() =>
              setActiveTab('events')
            }
          />
        )}

        {activeTab === 'events' && (
          <EventsPageView
            onBack={() =>
              setActiveTab('dashboard')
            }
          />
        )}

        {activeTab ===
          'registrations' && (
          <RegistrationsPageView />
        )}

        {activeTab ===
          'successful-registrations' && (
          <SuccessfulRegistrationsPageView />
        )}

        {activeTab ===
          'rejected-registrations' && (
          <RejectedRegistrationsPageView />
        )}

        {activeTab ===
          'promo-codes' && (
          <PromoCodesPageView />
        )}

        {activeTab === 'settings' && (
          <SettingsPageView />
        )}

        {activeTab === 'help' && (
          <div className="db-card">
            <h2>Help & Support</h2>

            <p>
              Contact the LoopLab technical
              team for dashboard support.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}