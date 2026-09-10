'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import InteractiveSticker from './InteractiveSticker';

const DAYS = [
  { day: 'S', height: 70, type: 'hatched', val: '42' },
  { day: 'M', height: 85, type: 'solid-light', val: '58' },
  { day: 'T', height: 60, type: 'solid-mid', val: '39' },
  { day: 'W', height: 100, type: 'solid-dark', badge: '+18%', val: '74' },
  { day: 'T', height: 75, type: 'hatched', val: '48' },
  { day: 'F', height: 65, type: 'hatched', val: '40' },
  { day: 'S', height: 50, type: 'hatched', val: '28' },
];

export default function CapsuleAnalyticsChart() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="db-card" style={{ position: 'relative', overflow: 'visible' }}>
      <InteractiveSticker
        src="/assets/Footer-Sticker SVG/footer-sticker-boom.svg"
        size={36}
        top="-14px"
        right="80px"
        rotate={-12}
        draggable
      />
      <div className="db-card__header">
        <div>
          <span className="db-card__title">Project Analytics</span>
        </div>
        <span style={{ fontSize: '0.72rem', color: 'var(--dz-text-muted)', fontWeight: 600 }}>Weekly Volume</span>
      </div>

      <div className="db-card__body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '210px' }}>
        <svg viewBox="0 0 350 160" style={{ width: '100%', height: '140px', overflow: 'visible' }}>
          <defs>
            <pattern id="stripedHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#cbd5e1" strokeWidth="2.5" />
            </pattern>
          </defs>

          {DAYS.map((item, idx) => {
            const x = 20 + idx * 45;
            const barH = (item.height / 100) * 115;
            const y = 135 - barH;
            const isHovered = hoveredIdx === idx;

            let fill = 'url(#stripedHatch)';
            let stroke = '#cbd5e1';
            if (item.type === 'solid-dark') {
              fill = '#6d28d9';
              stroke = '#5b21b6';
            } else if (item.type === 'solid-mid') {
              fill = '#8b5cf6';
              stroke = '#7c3aed';
            } else if (item.type === 'solid-light') {
              fill = '#a78bfa';
              stroke = '#8b5cf6';
            }

            return (
              <g key={idx} onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)} style={{ cursor: 'pointer' }}>
                {/* Floating animated badge for peak bar */}
                {item.badge && (
                  <motion.g
                    transform={`translate(${x + 13}, ${y - 18})`}
                    initial={{ opacity: 0, scale: 0.5, y: y }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [y - 18, y - 22, y - 18],
                    }}
                    transition={{
                      opacity: { delay: 0.5, duration: 0.4 },
                      scale: { delay: 0.5, type: 'spring', stiffness: 300 },
                      y: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' },
                    }}
                  >
                    <rect x="-18" y="-10" width="36" height="18" rx="9" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1" />
                    <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="800" fill="#6d28d9">
                      {item.badge}
                    </text>
                  </motion.g>
                )}

                {/* Animated Spring Capsule Bar */}
                <motion.rect
                  x={x}
                  y={y}
                  width="26"
                  height={barH}
                  rx="13"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="1.5"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  whileHover={{ scaleY: 1.05, filter: 'drop-shadow(0 4px 10px rgba(109, 40, 217, 0.35))' }}
                  transition={{
                    scaleY: { delay: idx * 0.07, type: 'spring', stiffness: 220, damping: 16 },
                    opacity: { delay: idx * 0.05, duration: 0.3 },
                  }}
                  style={{ transformOrigin: `${x + 13}px 135px` }}
                />

                {/* Hover value indicator */}
                {isHovered && !item.badge && (
                  <text x={x + 13} y={y - 8} textAnchor="middle" fontSize="10" fontWeight="800" fill="#6d28d9">
                    {item.val}
                  </text>
                )}

                {/* Day label */}
                <text x={x + 13} y="155" textAnchor="middle" fontSize="11" fontWeight="700" fill={isHovered ? '#6d28d9' : '#9ca3af'}>
                  {item.day}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
