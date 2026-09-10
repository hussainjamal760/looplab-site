'use client';

import { Plus, Code, Compass, Layout, Zap, CheckCircle2 } from 'lucide-react';

const PROJECTS = [
  { name: 'Develop API Endpoints', due: 'Nov 20, 2025', icon: Code, color: '#3b82f6' },
  { name: 'Onboarding Flow', due: 'Nov 26, 2025', icon: Compass, color: '#10b981' },
  { name: 'Build Dashboard', due: 'Nov 30, 2025', icon: Layout, color: '#7c3aed' },
  { name: 'Optimize Page Load', due: 'Dec 5, 2025', icon: Zap, color: '#f59e0b' },
  { name: 'Cross-Browser Testing', due: 'Dec 8, 2025', icon: CheckCircle2, color: '#ef4444' },
];

export default function ProjectListWidget() {
  return (
    <div className="db-card">
      <div className="db-card__header">
        <span className="db-card__title">Project</span>
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
          <span>New</span>
        </button>
      </div>

      <div className="db-card__body" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {PROJECTS.map((proj, idx) => {
          const Icon = proj.icon;
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: `${proj.color}15`,
                  color: proj.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={14} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--dz-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {proj.name}
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--dz-text-muted)' }}>
                  Due date: {proj.due}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
