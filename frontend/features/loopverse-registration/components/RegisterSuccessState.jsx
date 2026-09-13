'use client';

import { CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function RegisterSuccessState({ formData, event }) {
  return (
    <div className="lvr-success-card">
      <div className="lvr-success-icon">
        <CheckCircle2 size={40} />
      </div>

      <span className="lvr-badge" style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>
        REGISTRATION CONFIRMED
      </span>

      <h2 className="lvr-success-title">You’re In The Loop!</h2>

      <p className="lvr-success-text">
        Congratulations, <strong>{formData.fullName}</strong>! Your registration for{' '}
        <strong>{event?.title || 'Loopverse 3.0'}</strong> ({formData.track.toUpperCase()} TRACK) has been
        submitted and recorded in our database.
      </p>

      <div
        style={{
          background: '#FAFAFA',
          border: '2px solid #1a1a1a',
          borderRadius: '16px',
          padding: '20px',
          maxWidth: '440px',
          margin: '0 auto 28px',
          textAlign: 'left',
          boxShadow: '4px 4px 0 #1a1a1a',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#9E00FE' }}>
          <ShieldCheck size={18} />
          <strong style={{ fontSize: '0.9rem' }}>OFFICIAL EVENT PASS DRAFT</strong>
        </div>
        <p style={{ fontSize: '0.86rem', color: '#555', margin: '4px 0' }}>
          <strong>Participant:</strong> {formData.fullName} ({formData.email})
        </p>
        <p style={{ fontSize: '0.86rem', color: '#555', margin: '4px 0' }}>
          <strong>Module:</strong> {formData.module}
        </p>
        <p style={{ fontSize: '0.86rem', color: '#555', margin: '4px 0' }}>
          <strong>Institute:</strong> {formData.university}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <Link href="/loopverse" className="lvr-btn lvr-btn--back">
          <ArrowLeft size={16} /> Return to Loopverse
        </Link>
      </div>
    </div>
  );
}
