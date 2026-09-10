'use client';

import { motion } from 'framer-motion';
import { Calendar, Users, TrendingUp } from 'lucide-react';
import InteractiveSticker from './InteractiveSticker';

const COHORTS = [
  { name: 'DevFest 2025', seats: '185/200', pct: 92, revenue: 'PKR 277.5k', color: '#6d28d9' },
  { name: 'AI Hackathon', seats: '140/150', pct: 93, revenue: 'PKR 210.0k', color: '#10b981' },
  { name: 'Design Sprint', seats: '68/100', pct: 68, revenue: 'PKR 102.0k', color: '#3b82f6' },
  { name: 'Web3 Summit', seats: '45/100', pct: 45, revenue: 'PKR 67.5k', color: '#f59e0b' },
];

export default function EventCohortsWidget() {
  return (
    <div className="db-card" style={{ position: 'relative', overflow: 'visible' }}>
      <InteractiveSticker
        src="/assets/Footer-Sticker SVG/footer-sticker-hands.svg"
        size={40}
        top="-16px"
        right="80px"
        rotate={-8}
        draggable
      />
      <div className="db-card__header">
        <div>
          <span className="db-card__title">Top Event Cohorts</span>
          <span className="db-card__subtitle">Seat Fill Rate & Revenue</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--dz-purple-primary)' }}>
          <TrendingUp size={13} />
          <span>Active</span>
        </div>
      </div>

      <div className="db-card__body" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {COHORTS.map((cohort, idx) => (
          <motion.div
            key={cohort.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08, type: 'spring', stiffness: 240, damping: 18 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
              <span style={{ fontWeight: 800, color: 'var(--dz-text-primary)' }}>{cohort.name}</span>
              <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.72rem' }}>
                <span style={{ color: 'var(--dz-text-muted)' }}>{cohort.seats}</span>
                <strong style={{ color: cohort.color }}>{cohort.revenue}</strong>
              </div>
            </div>

            {/* Animated Progress Track */}
            <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${cohort.pct}%` }}
                transition={{ duration: 0.9, delay: 0.1 + idx * 0.1, ease: 'easeOut' }}
                style={{ height: '100%', background: cohort.color, borderRadius: '9999px' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
