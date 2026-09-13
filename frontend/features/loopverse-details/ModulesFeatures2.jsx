'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { MODULES_DATA } from './modulesData';

export default function ModulesFeatures2() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIdx((curr) => (curr + 1) % MODULES_DATA.length);
          return 0;
        }
        return prev + 2;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isPaused]);

  const activeModule = MODULES_DATA[activeIdx];
  const IconComp = activeModule.icon;

  return (
    <section className="lv-features2-section" id="modules">
      <div className="lv-section-header">
        <span className="lv-section-tag">Seven Tracks · One Event</span>
        <h2 className="lv-section-title">Competition Modules</h2>
        <p className="lv-section-sub">
          Five modules run across both onsite and virtual tracks. Two modules run exclusively onsite.
          The brief and difficulty you receive is calibrated for your chosen path.
        </p>
      </div>

      <div 
        className="lv-f2-grid"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Column: Interactive Module Selector */}
        <div className="lv-f2-list">
          {MODULES_DATA.map((item, idx) => {
            const ItemIcon = item.icon;
            const isSelected = idx === activeIdx;
            return (
              <button
                key={item.id}
                type="button"
                className={`lv-f2-item ${isSelected ? 'lv-f2-item--active' : ''}`}
                onClick={() => {
                  setActiveIdx(idx);
                  setProgress(0);
                }}
              >
                <div className="lv-f2-icon-wrap">
                  <ItemIcon size={20} />
                </div>
                <div className="lv-f2-item-info">
                  <div className="lv-f2-item-title-row">
                    <span className="lv-f2-item-title">{item.title}</span>
                    {item.isOnsiteOnly ? (
                      <span className="lv-onsite-badge">Onsite Only</span>
                    ) : (
                      <span className="lv-dual-badge">Dual Track</span>
                    )}
                  </div>
                  <div className="lv-f2-item-sub">{item.tag}</div>
                </div>
                <ArrowRight size={18} opacity={isSelected ? 1 : 0.3} />
              </button>
            );
          })}
        </div>

        {/* Right Column: ReactBits Features-2 Display Card with Dynamic Respective Picture */}
        <div className="lv-f2-glass-display">
          <AnimatePresence mode="wait">
            <motion.img 
              key={activeModule.id}
              src={activeModule.image || '/assets/loopverse/loopverse-city-bg.jpg'} 
              alt={activeModule.title} 
              className="lv-f2-static-bg-img"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            />
          </AnimatePresence>
          <div className="lv-f2-img-overlay" />
          <div className="lv-f2-glass-glow" />

          <div className="lv-f2-content-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <div className="lv-f2-display-top">
                  <div 
                    className="lv-f2-icon-wrap" 
                    style={{ width: 56, height: 56, background: 'var(--color-darkblue, #9E00FE)' }}
                  >
                    <IconComp size={28} color="#FFFFFF" />
                  </div>
                  <span className="lv-f2-display-number">0{activeModule.id}</span>
                </div>

                <h3 className="lv-f2-display-title">{activeModule.title}</h3>
                <p className="lv-f2-display-desc">{activeModule.desc}</p>

                <div className="lv-f2-track-breakdown">
                  <div className="lv-f2-track-box">
                    <div className="lv-f2-track-title">⚡ Onsite Track Brief</div>
                    <div className="lv-f2-track-desc">{activeModule.onsiteBrief}</div>
                  </div>
                  <div className="lv-f2-track-box">
                    <div className="lv-f2-track-title">🌐 Virtual Track Brief</div>
                    <div className="lv-f2-track-desc">{activeModule.virtualBrief}</div>
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <Link
                    href="/loopverse/register"
                    className="lv-action-button lv-action-button--primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '0.9rem' }}
                  >
                    Register for {activeModule.title} <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            <div>
              <div className="lv-f2-progress-bar-wrap">
                <div 
                  className="lv-f2-progress-bar-fill" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
