'use client';

import { useState } from 'react';

const CANDLES = [
  { date: 'Aug 10', o: 55, h: 72, l: 48, c: 68, vol: 180 },
  { date: 'Aug 13', o: 68, h: 88, l: 62, c: 84, vol: 240 },
  { date: 'Aug 16', o: 84, h: 96, l: 75, c: 78, vol: 190 },
  { date: 'Aug 19', o: 78, h: 110, l: 74, c: 105, vol: 310 },
  { date: 'Aug 22', o: 105, h: 125, l: 98, c: 120, vol: 340 },
  { date: 'Aug 25', o: 120, h: 132, l: 112, c: 115, vol: 210 },
  { date: 'Aug 28', o: 115, h: 148, l: 110, c: 142, vol: 420 },
  { date: 'Aug 31', o: 142, h: 165, l: 138, c: 158, vol: 490 },
  { date: 'Sep 3',  o: 158, h: 172, l: 148, c: 152, vol: 280 },
  { date: 'Sep 7',  o: 152, h: 195, l: 150, c: 188, vol: 560 },
];

const getY = (val) => 110 - (val / 200) * 100;

export default function CandidateGrowthChart() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const activeCandle = hoveredIdx !== null ? CANDLES[hoveredIdx] : CANDLES[CANDLES.length - 1];
  const isUp = activeCandle.c >= activeCandle.o;
  const pctChange = (((activeCandle.c - activeCandle.o) / activeCandle.o) * 100).toFixed(1);

  return (
    <div className="db-card">
      <div className="db-card__header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span className="db-card__title">Candidate Growth Overview</span>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '6px', background: 'var(--color-pink, #f0befa)', border: '1px solid var(--color-black-soft, #111111)' }}>
              Analytics 13 · OHLC
            </span>
          </div>
          <span className="db-card__subtitle">Candlestick & Volume Tracker (30 Days)</span>
        </div>

        {/* OHLC Mini Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', border: '1.5px solid var(--color-black-soft, #111111)', borderRadius: '8px', padding: '3px 8px', fontSize: '0.68rem', fontWeight: 800, boxShadow: '2px 2px 0px var(--color-black-soft, #111111)' }}>
          <span>{activeCandle.date}</span>
          <span style={{ color: '#64748b' }}>O:<strong style={{ color: '#111' }}>{activeCandle.o}</strong></span>
          <span style={{ color: '#64748b' }}>H:<strong style={{ color: '#111' }}>{activeCandle.h}</strong></span>
          <span style={{ color: '#64748b' }}>L:<strong style={{ color: '#111' }}>{activeCandle.l}</strong></span>
          <span style={{ color: '#64748b' }}>C:<strong style={{ color: isUp ? '#9E00FE' : '#f5693c' }}>{activeCandle.c}</strong></span>
          <span style={{ color: isUp ? '#16a34a' : '#dc2626' }}>{isUp ? `+${pctChange}%` : `${pctChange}%`}</span>
        </div>
      </div>

      <div className="db-card__body" style={{ height: '200px', display: 'flex', position: 'relative' }}>
        {/* Y Axis */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '0.5rem', fontSize: '0.65rem', color: '#64748b', fontWeight: 700, paddingBottom: '30px' }}>
          {[200, 150, 100, 50, 0].map((t) => <span key={t}>{t}</span>)}
        </div>

        {/* SVG Canvas */}
        <div style={{ flex: 1, position: 'relative' }}>
          <svg viewBox="0 0 500 155" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            {/* Gridlines */}
            {[10, 35, 60, 85, 110].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="500" y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="1" strokeDasharray="3 3" />
            ))}

            {/* Candlesticks & Volume Bars */}
            {CANDLES.map((c, i) => {
              const cx = 25 + i * 50;
              const candleUp = c.c >= c.o;
              const color = candleUp ? '#9E00FE' : '#f5693c';
              const highY = getY(c.h);
              const lowY = getY(c.l);
              const openY = getY(c.o);
              const closeY = getY(c.c);
              const topY = Math.min(openY, closeY);
              const bodyHeight = Math.max(Math.abs(closeY - openY), 3);
              const volHeight = (c.vol / 600) * 28;
              const isHovered = hoveredIdx === i;

              return (
                <g key={c.date} style={{ cursor: 'pointer' }} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                  {/* Hover Column Highlight */}
                  {isHovered && (
                    <rect x={cx - 18} y="5" width="36" height="145" fill="rgba(158, 0, 254, 0.08)" rx="4" />
                  )}

                  {/* Wick */}
                  <line x1={cx} y1={highY} x2={cx} y2={lowY} stroke={color} strokeWidth="1.75" />

                  {/* Candle Body */}
                  <rect
                    x={cx - 10}
                    y={topY}
                    width="20"
                    height={bodyHeight}
                    fill={color}
                    stroke="var(--color-black-soft, #111111)"
                    strokeWidth="1.5"
                    rx="2"
                  />

                  {/* Volume Histogram Bar */}
                  <rect
                    x={cx - 8}
                    y={148 - volHeight}
                    width="16"
                    height={volHeight}
                    fill={color}
                    opacity={isHovered ? 0.9 : 0.4}
                    stroke="var(--color-black-soft, #111111)"
                    strokeWidth="1"
                    rx="1.5"
                  />
                </g>
              );
            })}
          </svg>

          {/* X Axis */}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5px', paddingRight: '5px', fontSize: '0.62rem', color: '#64748b', fontWeight: 700 }}>
            {CANDLES.map((c) => <span key={c.date}>{c.date}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
