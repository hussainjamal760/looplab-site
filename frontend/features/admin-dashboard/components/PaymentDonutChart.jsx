'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const SLICES = [
  { label: 'Successful', count: 721, pct: 72, color: '#9E00FE', offset: 0, dash: 72 },
  { label: 'Pending', count: 121, pct: 12, color: '#f5693c', offset: -72, dash: 12 },
  { label: 'Failed', count: 60, pct: 6, color: '#64748b', offset: -84, dash: 6 },
  { label: 'Refunded', count: 45, pct: 5, color: '#f0befa', offset: -90, dash: 5 },
];

const TOTAL_COUNT = 947;

export default function PaymentDonutChart() {
  const [activeIdx, setActiveIdx] = useState(null);

  const activeItem = activeIdx !== null ? SLICES[activeIdx] : null;
  const displayVal = activeItem ? `${activeItem.count}` : '72%';
  const displayLabel = activeItem ? `${activeItem.label} (${activeItem.pct}%)` : 'Successful Rate';

  return (
    <div className="db-card">
      <div className="db-card__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span className="db-card__title">Payment Status</span>
          <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '6px', background: 'var(--color-lightgreen, #e6fab9)', border: '1px solid var(--color-black-soft, #111111)' }}>
            Analytics 5
          </span>
        </div>
        <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>Total: {TOTAL_COUNT}</span>
      </div>

      <div className="db-card__body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '220px', gap: '0.85rem' }}>
        {/* SVG Donut */}
        <div style={{ position: 'relative', width: '135px', height: '135px', flexShrink: 0 }}>
          <svg viewBox="0 0 42 42" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)', overflow: 'visible' }}>
            <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(0,0,0,0.06)" strokeWidth="6" />
            {SLICES.map((s, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <motion.circle
                  key={s.label}
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke={s.color}
                  strokeWidth={isSelected ? 8.5 : 6}
                  strokeDasharray={`${s.dash} ${100 - s.dash}`}
                  strokeDashoffset={s.offset}
                  initial={{ strokeDashoffset: 100, opacity: 0 }}
                  animate={{ strokeDashoffset: s.offset, opacity: activeIdx === null || isSelected ? 1 : 0.45 }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onMouseLeave={() => setActiveIdx(null)}
                />
              );
            })}
          </svg>

          {/* Hover-following Centre Total */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-black-deep, #0a0a0a)', lineHeight: 1 }}>
              {displayVal}
            </div>
            <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#64748b', marginTop: '2px', maxWidth: '85px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {displayLabel}
            </div>
          </div>
        </div>

        {/* Bound Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
          {SLICES.map((s, idx) => {
            const isHovered = activeIdx === idx;
            return (
              <button
                key={s.label}
                type="button"
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px 6px',
                  borderRadius: '8px',
                  background: isHovered ? 'rgba(0,0,0,0.06)' : 'transparent',
                  border: isHovered ? '1px solid var(--color-black-soft, #111111)' : '1px solid transparent',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                  <span style={{ fontSize: '0.725rem', fontWeight: isHovered ? 800 : 700, color: 'var(--color-black-deep, #0a0a0a)' }}>
                    {s.label}
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#52525b' }}>
                  {s.count} ({s.pct}%)
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
