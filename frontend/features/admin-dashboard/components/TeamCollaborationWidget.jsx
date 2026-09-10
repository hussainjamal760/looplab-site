'use client';

import { Plus } from 'lucide-react';

const MEMBERS = [
  { name: 'Alexandra Deff', task: 'Working on Github Project Repository', status: 'Complete', bg: '#dcfce7', color: '#15803d', avBg: '#fbcfe8' },
  { name: 'Edwin Adenike', task: 'Working on User Authentication System', status: 'In Progress', bg: '#ffedd5', color: '#c2410c', avBg: '#fef08a' },
  { name: 'Isaac Oluwatamilore', task: 'Working on Candidate Research & Filter', status: 'Pending', bg: '#fee2e2', color: '#b91c1c', avBg: '#bfdbfe' },
  { name: 'David Owhodi', task: 'Working on Responsive Layout for Portal', status: 'In Progress', bg: '#ffedd5', color: '#c2410c', avBg: '#fed7aa' },
];

export default function TeamCollaborationWidget() {
  return (
    <div className="db-card">
      <div className="db-card__header">
        <span className="db-card__title">Team Collaboration</span>
        <button
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            background: '#ffffff',
            border: '1px solid var(--dz-border)',
            borderRadius: '9999px',
            padding: '2px 8px',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            color: 'var(--dz-text-primary)',
          }}
        >
          <Plus size={12} />
          <span>Add Member</span>
        </button>
      </div>

      <div className="db-card__body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {MEMBERS.map((m, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: m.avBg,
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {m.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--dz-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {m.name}
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--dz-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {m.task}
                </span>
              </div>
            </div>

            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '9999px',
                background: m.bg,
                color: m.color,
                whiteSpace: 'nowrap',
              }}
            >
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
