'use client';

import { motion } from 'framer-motion';
import { UserCheck, ShieldAlert, Clock } from 'lucide-react';
import InteractiveSticker from './InteractiveSticker';

const CANDIDATES = [
  { name: 'Daniyal Arqam Talha', uni: 'UMT', event: 'LoopLearn Hackathon', amount: 'PKR 750 (50% OFF)', status: 'Approved', bg: '#dcfce7', color: '#15803d' },
  { name: 'Azeem Sarwar', uni: 'Team Member', event: 'LoopLearn Hackathon', amount: 'PKR 1,050 (30% OFF)', status: 'Approved', bg: '#dcfce7', color: '#15803d' },
  { name: 'Yar Muhammad Awaim', uni: 'Team Member', event: 'LoopLearn Hackathon', amount: 'PKR 1,050 (30% OFF)', status: 'Under Review', bg: '#fef3c7', color: '#b45309' },
  { name: 'Umer Mujahid', uni: 'FAST NUCES', event: 'LoopLearn Hackathon', amount: 'PKR 1,200 (20% OFF)', status: 'Proof Submitted', bg: '#ede9fe', color: '#6d28d9' },
];

export default function CandidateQueueWidget() {
  return (
    <div className="db-card" style={{ position: 'relative', overflow: 'visible' }}>
      <InteractiveSticker
        src="/assets/Card-Sticker SVG/sticker-hand.svg"
        size={36}
        top="-14px"
        right="80px"
        rotate={10}
        draggable
      />
      <div className="db-card__header">
        <div>
          <span className="db-card__title">Candidate Verification Queue</span>
          <span className="db-card__subtitle">Recent Admissions & Slips</span>
        </div>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '2px 8px', borderRadius: 9999, background: 'var(--dz-purple-soft)', color: 'var(--dz-purple-primary)' }}>
          Live Stream
        </span>
      </div>

      <div className="db-card__body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {CANDIDATES.map((c, idx) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ x: 4 }}
            transition={{ delay: idx * 0.07, type: 'spring', stiffness: 220, damping: 16 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--dz-purple-soft)',
                  color: 'var(--dz-purple-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {c.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--dz-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {c.name}
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--dz-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {c.uni} · {c.event}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--dz-text-primary)' }}>
                {c.amount}
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  background: c.bg,
                  color: c.color,
                  whiteSpace: 'nowrap',
                }}
              >
                {c.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
