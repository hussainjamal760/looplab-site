'use client';

import { motion } from 'framer-motion';
import { Layers, Radio, MapPin, Box, Disc, RotateCw, Menu, Star } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="lv-screen-setup-wrapper">
      {/* 1. Curved Ultrawide Monitor */}
      <div className="lv-monitor-frame">
        <div className="lv-monitor-bezel">
          {/* Top In-Screen UI: '★ work' & Menu */}
          <div className="lv-screen-chrome-top">
            <div className="lv-screen-work-badge">
              <Star size={13} fill="#ffffff" strokeWidth={0} />
              <span>work</span>
            </div>
            <div className="lv-screen-menu-icon">
              <Menu size={20} color="#ffffff" />
            </div>
          </div>

          {/* Screen Content Viewport */}
          <div className="lv-screen-viewport">
            <CosmicBackground />

            <div className="lv-cosmic-content">
              {/* Floating 3D Holographic Looplab Box */}
              <motion.div
                className="lv-hologram-box"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: [0, -5, 0] }}
                transition={{
                  opacity: { duration: 0.8 },
                  y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' }
                }}
              >
                <span className="lv-hologram-text">LOOPLAB</span>
              </motion.div>

              {/* Metallic 3D Title with Neon Purple Glow */}
              <motion.h1
                className="lv-cosmic-title"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <span className="lv-chrome-text">LOOPVERSE</span>
                <span className="lv-neon-version"> 3.0</span>
              </motion.h1>

              {/* Subtitle */}
              <p className="lv-cosmic-desc">
                A hybrid national hackathon uniting onsite ad virtual builders across seven
                competition modules, from Web and App Development to AI/ML, Pitching, UI/UX,
                Game Development, and Cybersecurity, all under one loop.
              </p>

              {/* 3 Pills */}
              <div className="lv-cosmic-pills">
                <div className="lv-cosmic-pill">
                  <Layers size={16} className="text-purple-400 shrink-0" />
                  <span>7 Competition Modules</span>
                </div>
                <div className="lv-cosmic-pill">
                  <Radio size={16} className="text-pink-400 shrink-0" />
                  <span>Onsite + Virtual</span>
                </div>
                <div className="lv-cosmic-pill">
                  <MapPin size={16} className="text-teal-400 shrink-0" />
                  <span>Lahore, Pakistan</span>
                </div>
              </div>

              {/* Glassmorphic Dock */}
              <div className="lv-cosmic-dock">
                <DockItem icon={<Box size={24} color="#B026FF" />} number="7" label="MODULES" glow="#9E00FE" />
                <div className="lv-dock-divider" />
                <DockItem icon={<Disc size={24} color="#f0befa" />} number="2" label="TRACKS" glow="#f0befa" />
                <div className="lv-dock-divider" />
                <DockItem icon={<RotateCw size={24} color="#B026FF" />} number="1" label="LOOP" glow="#B026FF" />
              </div>
            </div>

            {/* Bottom Bezel Power Indicator */}
            <div className="lv-screen-power-indicator">
              <span className="lv-power-led" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Monitor Stand & Desk Base */}
      <div className="lv-monitor-stand">
        <div className="lv-stand-neck" />
        <div className="lv-stand-base" />
      </div>

      {/* 3. Desk Surface with Keyboard & Mouse Peripherals */}
      <div className="lv-desk-peripherals">
        <div className="lv-desk-keyboard">
          <div className="lv-keyboard-top-row" />
          <div className="lv-keyboard-key-grid" />
        </div>
        <div className="lv-desk-mouse">
          <div className="lv-mouse-wheel" />
        </div>
      </div>
    </div>
  );
}

function DockItem({ icon, number, label, glow }) {
  return (
    <div className="lv-dock-item">
      <div className="lv-dock-hologram-cube" style={{ boxShadow: `0 0 20px ${glow}55` }}>
        {icon}
      </div>
      <div className="lv-dock-text-wrap">
        <span className="lv-dock-num">{number}</span>
        <span className="lv-dock-lbl">{label}</span>
      </div>
    </div>
  );
}

function CosmicBackground() {
  return (
    <div className="lv-cosmic-bg">
      <div className="lv-cosmic-nebula lv-nebula-purple" />
      <div className="lv-cosmic-nebula lv-nebula-amber" />
      <div className="lv-cosmic-nebula lv-nebula-cyan" />
      <div className="lv-cosmic-grid-overlay" />
      <svg className="lv-constellations-svg" viewBox="0 0 1440 600" fill="none">
        <g opacity="0.6">
          <circle cx="140" cy="180" r="3" fill="#ffffff" />
          <circle cx="240" cy="260" r="2.5" fill="#ffffff" />
          <circle cx="200" cy="380" r="2.5" fill="#ffffff" />
          <line x1="140" y1="180" x2="240" y2="260" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <line x1="240" y1="260" x2="200" y2="380" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        </g>
        <g opacity="0.6">
          <circle cx="1240" cy="160" r="3" fill="#ffffff" />
          <circle cx="1160" cy="240" r="2.5" fill="#ffffff" />
          <circle cx="1280" cy="340" r="3" fill="#ffffff" />
          <line x1="1240" y1="160" x2="1160" y2="240" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <line x1="1160" y1="240" x2="1280" y2="340" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
