'use client';

import { useState, useEffect } from 'react';
import { Pause, Square, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import InteractiveSticker from './InteractiveSticker';

export default function TimeTrackerCard() {
  const [seconds, setSeconds] = useState(5048); // 01:24:08
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSec) => {
    const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSec % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        borderRadius: '20px',
        background: 'radial-gradient(circle at 100% 0%, #4c1d95 0%, #1e1136 100%)',
        color: '#ffffff',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'visible',
        minHeight: '210px',
        boxShadow: '0 4px 14px rgba(30, 17, 54, 0.3)',
      }}
    >
      <InteractiveSticker
        src="/assets/VimeoHero SVG/pink-star.svg"
        size={32}
        top="-14px"
        right="-8px"
        rotate={18}
        draggable
      />
      {/* Background animated wavy lines */}
      <svg
        viewBox="0 0 200 150"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18, pointerEvents: 'none' }}
      >
        <motion.path
          d="M -20 50 Q 50 120 120 40 T 220 90"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="2"
          animate={{ x: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        />
        <motion.path
          d="M -20 80 Q 60 20 140 100 T 220 50"
          fill="none"
          stroke="#c4b5fd"
          strokeWidth="2"
          animate={{ x: [10, -10, 10] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        />
      </svg>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.85 }}>Time Tracker</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.68rem', fontWeight: 700, color: '#a7f3d0' }}>
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block' }}
          />
          <span>LIVE</span>
        </div>
      </div>

      <div style={{ textAlign: 'center', zIndex: 2, margin: '1rem 0' }}>
        <div style={{ fontSize: '2.1rem', fontWeight: 800, letterSpacing: '1px', fontFamily: 'monospace' }}>
          {formatTime(seconds)}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', zIndex: 2 }}>
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsRunning(!isRunning)}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          title={isRunning ? 'Pause' : 'Resume'}
        >
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => { setIsRunning(false); setSeconds(0); }}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#ef4444',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          title="Reset"
        >
          <Square size={14} fill="#ffffff" />
        </motion.button>
      </div>
    </motion.div>
  );
}
