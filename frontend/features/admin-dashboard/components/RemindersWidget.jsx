'use client';

import { Video } from 'lucide-react';

export default function RemindersWidget() {
  return (
    <div className="db-card" style={{ justifyContent: 'space-between' }}>
      <div className="db-card__header">
        <span className="db-card__title">Reminders</span>
      </div>

      <div className="db-card__body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dz-text-primary)', margin: '0.25rem 0' }}>
            Meeting with Looplab Leads
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--dz-text-muted)', margin: 0, fontWeight: 600 }}>
            Time : 02.00 pm - 04.00 pm
          </p>
        </div>

        <button
          type="button"
          className="db-btn-purple-pill"
          style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', padding: '0.75rem 1rem' }}
        >
          <Video size={16} />
          <span>Start Meeting</span>
        </button>
      </div>
    </div>
  );
}
