'use client';

import { BarChart3 } from 'lucide-react';

export default function RegistrationStatusBarChart() {
  const bars = [
    { label: 'Approved', count: 721, color: '#7c3aed', height: '80%' },
    { label: 'Pending', count: 121, color: '#10b981', height: '35%' },
    { label: 'Declined', count: 60, color: '#f59e0b', height: '22%' },
    { label: 'Refunded', count: 45, color: '#ef4444', height: '16%' },
  ];

  return (
    <div className="db-card" style={{ marginBottom: '1rem' }}>
      <div className="db-card__header">
        <span className="db-card__title">
          <BarChart3 size={16} />
          <span>Registration Status</span>
        </span>
      </div>

      <div className="db-card__body" style={{ height: '150px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '0.5rem' }}>
        {bars.map((bar, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', width: '22%' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, marginBottom: '4px', color: '#141416' }}>
              {bar.count}
            </span>
            <div
              style={{
                width: '100%',
                height: bar.height,
                background: bar.color,
                borderRadius: '6px 6px 0 0',
                border: '1.5px solid #141416',
                boxShadow: '1.5px 1.5px 0px #141416',
              }}
            />
            <span style={{ fontSize: '0.68rem', fontWeight: 700, marginTop: '4px', color: '#71717a' }}>
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
