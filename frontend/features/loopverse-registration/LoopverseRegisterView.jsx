'use client';

import { ArrowLeft, Home, Lock, ShieldAlert, Sparkles } from 'lucide-react';
import Link from 'next/link';
import '@/app/styles/loopverse-registration.css';

export default function LoopverseRegisterView() {
  return (
    <div className="lvr-page">
      <div className="lvr-container">
        <div className="lvr-hero-header">
          <Link href="/loopverse" className="lvr-badge" style={{ textDecoration: 'none' }}>
            <ArrowLeft size={14} /> Back to Loopverse 3.0
          </Link>
          <h1 className="lvr-title">
            Portal <span>Closed.</span>
          </h1>
          <p className="lvr-subtitle">
            Registrations for Loopverse 3.0 are officially closed. No further submissions are accepted.
          </p>
        </div>

        <div className="lvr-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(158, 0, 254, 0.15))',
              border: '2px solid rgba(239, 68, 68, 0.4)',
              color: '#ef4444',
              marginBottom: '24px',
            }}
          >
            <Lock size={40} />
          </div>

          <div
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            🔒 Submissions Closed
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '12px', color: '#ffffff' }}>
            Loopverse 3.0 Registration Period Has Ended
          </h2>

          <p style={{ maxWidth: '580px', margin: '0 auto 28px', color: '#a1a1aa', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Thank you for the incredible enthusiasm and overwhelming response! Registration for both our Onsite (Lahore) and Virtual tracks is now completely closed. No new registrations can be submitted.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              maxWidth: '640px',
              margin: '0 auto 36px',
              textAlign: 'left',
            }}
          >
            <div style={{ background: '#141416', border: '1px solid #27272a', padding: '16px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: '#a1a1aa', textTransform: 'uppercase', fontWeight: 700 }}>
                Onsite Track
              </span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ef4444', marginTop: '4px' }}>
                🔒 Closed (Full Capacity)
              </div>
            </div>

            <div style={{ background: '#141416', border: '1px solid #27272a', padding: '16px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: '#a1a1aa', textTransform: 'uppercase', fontWeight: 700 }}>
                Virtual Track
              </span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ef4444', marginTop: '4px' }}>
                🔒 Closed (Deadline Passed)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/loopverse"
              className="lvr-btn lvr-btn--next"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Sparkles size={16} /> Loopverse 3.0 Details
            </Link>
            <Link
              href="/"
              className="lvr-btn lvr-btn--back"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Home size={16} /> Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
