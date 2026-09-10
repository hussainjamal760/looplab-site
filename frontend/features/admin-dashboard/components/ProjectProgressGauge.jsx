'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InteractiveSticker from './InteractiveSticker';

export default function ProjectProgressGauge() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= 41) {
        setPercent(41);
        clearInterval(interval);
      } else {
        setPercent(current);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="db-card" style={{ position: 'relative', overflow: 'visible' }}>
      <InteractiveSticker
        src="/assets/HorizontalWords SVG/horizontal-words-sticker-cursor.svg"
        size={34}
        top="-14px"
        right="80px"
        rotate={14}
        draggable
      />
      <div className="db-card__header">
        <span className="db-card__title">Project Progress</span>
        <span style={{ fontSize: '0.72rem', color: 'var(--dz-purple-primary)', fontWeight: 700, background: 'var(--dz-purple-soft)', padding: '2px 8px', borderRadius: 9999 }}>
          Live Rate
        </span>
      </div>

      <div className="db-card__body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '210px' }}>
        {/* Semi-Circle SVG Gauge */}
        <div style={{ position: 'relative', width: '200px', height: '110px', marginTop: '10px' }}>
          <svg viewBox="0 0 200 110" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <pattern id="gaugeStripes" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="6" stroke="#cbd5e1" strokeWidth="2" />
              </pattern>
            </defs>

            {/* Background Arc (Gray Base) */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="20"
              strokeLinecap="round"
            />

            {/* Pending Arc (Hatched Stripes) */}
            <motion.path
              d="M 180 100 A 80 80 0 0 0 135 34"
              fill="none"
              stroke="url(#gaugeStripes)"
              strokeWidth="20"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            />

            {/* In Progress Arc (Light Purple) */}
            <motion.path
              d="M 135 34 A 80 80 0 0 0 95 20"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="20"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            />

            {/* Completed Arc (Solid Deep Purple) */}
            <motion.path
              d="M 20 100 A 80 80 0 0 1 95 20"
              fill="none"
              stroke="#6d28d9"
              strokeWidth="20"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
            />
          </svg>

          {/* Center Readout with Counting Number */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.3 }}
            style={{ position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}
          >
            <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--dz-text-primary)', lineHeight: 1 }}>
              {percent}%
            </div>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--dz-text-muted)', marginTop: '2px' }}>
              Project Ended
            </div>
          </motion.div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.72rem', fontWeight: 700, paddingBottom: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6d28d9' }} />
            <span style={{ color: 'var(--dz-text-secondary)' }}>Completed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#a78bfa' }} />
            <span style={{ color: 'var(--dz-text-secondary)' }}>In Progress</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '2px', border: '1px solid #94a3b8', background: '#e2e8f0' }} />
            <span style={{ color: 'var(--dz-text-secondary)' }}>Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
}
