'use client';

import Link from 'next/link';

export default function LoopverseRegistration() {
  return (
    <section className="loopverse-registration-section">
      <div className="registration-card">
        <span className="registration-badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
          FLAGSHIP • REGISTRATIONS CLOSED
        </span>
        <h2 className="registration-title">loopverse 3.0 Registrations Closed</h2>
        <p className="registration-subtitle">
          Registrations for Pakistan's premier campus tech gathering are officially closed. Stay tuned for live event coverage and updates.
        </p>
        <Link
          href="/loopverse/register"
          className="portal-button"
          style={{ opacity: 0.9, cursor: 'pointer' }}
        >
          <span>REGISTRATIONS CLOSED</span>
          <span>🔒</span>
        </Link>
      </div>
    </section>
  );
}
