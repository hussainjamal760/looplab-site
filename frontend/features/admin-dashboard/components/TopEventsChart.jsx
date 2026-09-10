'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const EVENTS_DATA = [
  { name: 'DevFest 25', revenue: 3200, regs: 480, revHeight: '88%', regHeight: '75%' },
  { name: 'AI Hackathon', revenue: 2450, regs: 390, revHeight: '68%', regHeight: '60%' },
  { name: 'Design Loop', revenue: 1800, regs: 270, revHeight: '50%', regHeight: '44%' },
  { name: 'Web3 Summit', revenue: 1200, regs: 185, revHeight: '34%', regHeight: '30%' },
];

export default function TopEventsChart() {
  const [showRevenue, setShowRevenue] = useState(true);
  const [showRegs, setShowRegs] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const toggleSeries = (type) => {
    if (type === 'rev') {
      if (showRevenue && !showRegs) return;
      setShowRevenue(!showRevenue);
    } else {
      if (showRegs && !showRevenue) return;
      setShowRegs(!showRegs);
    }
  };

  const hoveredItem = hoveredIdx !== null ? EVENTS_DATA[hoveredIdx] : null;

  return (
    <div className="db-card">
      <div className="db-card__header" style={{ alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span className="db-card__title">Top Events Performance</span>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '6px', background: 'var(--color-lightgreen, #e6fab9)', border: '1px solid var(--color-black-soft, #111111)' }}>
              Analytics 3 · Grouped Bars
            </span>
          </div>
          <span className="db-card__subtitle">Revenue & Attendance by Event</span>
        </div>

        {/* Series Toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {[
            { id: 'rev', label: 'Revenue', active: showRevenue, bg: 'var(--color-darkblue, #9E00FE)' },
            { id: 'reg', label: 'Registrations', active: showRegs, bg: 'var(--color-orange, #f5693c)' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleSeries(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '0.68rem',
                fontWeight: 800,
                cursor: 'pointer',
                border: '1.5px solid var(--color-black-soft, #111111)',
                background: item.active ? item.bg : '#f4f4f5',
                color: item.active ? '#ffffff' : '#71717a',
                boxShadow: item.active ? '2px 2px 0px var(--color-black-soft, #111111)' : 'none',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: item.active ? '#ffffff' : '#a1a1aa' }} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="db-card__body" style={{ height: '200px', display: 'flex', position: 'relative' }}>
        {/* Y Axis */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '0.5rem', fontSize: '0.65rem', color: '#64748b', fontWeight: 700, paddingBottom: '26px' }}>
          {['3.5k', '2.5k', '1.5k', '0.5k', '0'].map((t) => <span key={t}>{t}</span>)}
        </div>

        {/* Grouped Bars Area */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
          {/* Grid lines */}
          <div style={{ position: 'absolute', inset: 0, bottom: '26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ borderBottom: '1px dashed rgba(0,0,0,0.06)', width: '100%' }} />
            ))}
          </div>

          {/* Bars Row */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '4px', zIndex: 2 }}>
            {EVENTS_DATA.map((event, i) => {
              const isHovered = hoveredIdx === i;
              return (
                <div
                  key={event.name}
                  style={{ width: '20%', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '5px', cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Revenue Bar */}
                  {showRevenue && (
                    <motion.div
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: isHovered ? 1.05 : 1, opacity: 1 }}
                      transition={{ scaleY: { delay: i * 0.08, type: 'spring', stiffness: 220, damping: 16 } }}
                      style={{
                        width: showRegs ? '45%' : '75%',
                        height: event.revHeight,
                        background: 'var(--color-darkblue, #9E00FE)',
                        borderRadius: '5px 5px 0 0',
                        border: '1.5px solid var(--color-black-soft, #111111)',
                        boxShadow: isHovered ? '2px 2px 0px var(--color-black-soft, #111111)' : 'none',
                        transformOrigin: 'bottom',
                      }}
                    />
                  )}

                  {/* Registrations Bar */}
                  {showRegs && (
                    <motion.div
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: isHovered ? 1.05 : 1, opacity: 1 }}
                      transition={{ scaleY: { delay: i * 0.08 + 0.04, type: 'spring', stiffness: 220, damping: 16 } }}
                      style={{
                        width: showRevenue ? '45%' : '75%',
                        height: event.regHeight,
                        background: 'var(--color-orange, #f5693c)',
                        borderRadius: '5px 5px 0 0',
                        border: '1.5px solid var(--color-black-soft, #111111)',
                        boxShadow: isHovered ? '2px 2px 0px var(--color-black-soft, #111111)' : 'none',
                        transformOrigin: 'bottom',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Value-Following Tooltip */}
          {hoveredItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              style={{
                position: 'absolute',
                top: 0,
                left: `${15 + hoveredIdx * 24}%`,
                transform: 'translateX(-50%)',
                background: '#ffffff',
                border: '1.5px solid var(--color-black-soft, #111111)',
                borderRadius: '8px',
                padding: '4px 8px',
                boxShadow: '3px 3px 0px var(--color-black-soft, #111111)',
                zIndex: 10,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--color-black-deep, #0a0a0a)' }}>
                {hoveredItem.name}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.65rem', fontWeight: 700, marginTop: '2px' }}>
                {showRevenue && <span style={{ color: '#9E00FE' }}>PKR {hoveredItem.revenue}k</span>}
                {showRegs && <span style={{ color: '#f5693c' }}>{hoveredItem.regs} Regs</span>}
              </div>
            </motion.div>
          )}

          {/* X Axis */}
          <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '2px solid var(--color-black-soft, #111111)', paddingTop: '4px' }}>
            {EVENTS_DATA.map((e, idx) => (
              <span key={e.name} style={{ fontSize: '0.68rem', fontWeight: hoveredIdx === idx ? 800 : 700, color: hoveredIdx === idx ? 'var(--color-black-deep, #0a0a0a)' : '#64748b' }}>
                {e.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
