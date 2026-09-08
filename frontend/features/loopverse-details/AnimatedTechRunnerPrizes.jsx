'use client';

import { useState, useEffect } from 'react';
import { RotateCcw, Sparkles, Trophy, Flag, ShieldCheck } from 'lucide-react';
import TechRunnerCharacter from './TechRunnerCharacter';

export default function AnimatedTechRunnerPrizes() {
  // sequence: 'running' -> 'grabbing' -> 'victory'
  const [phase, setPhase] = useState('running');
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    setPhase('running');
    const grabTimer = setTimeout(() => {
      setPhase('grabbing');
    }, 2400);

    const victoryTimer = setTimeout(() => {
      setPhase('victory');
    }, 3100);

    return () => {
      clearTimeout(grabTimer);
      clearTimeout(victoryTimer);
    };
  }, [runKey]);

  const handleReplay = () => {
    setRunKey((prev) => prev + 1);
  };

  return (
    <section className="lv-tech-runner-section">
      {/* Cyber Track Stage */}
      <div className="lv-runner-stage">
        {/* Stage Top Bar */}
        <div className="lv-stage-top-bar">
          <div />
          <button
            type="button"
            onClick={handleReplay}
            className="lv-replay-btn"
            title="Replay Animation"
          >
            <RotateCcw size={14} /> Replay Run
          </button>
        </div>

        {/* Dynamic Speech Bubble (Pops up when trophy is grabbed!) */}
        <div className={`lv-speech-bubble ${phase === 'victory' ? 'visible' : ''}`}>
          <div className="lv-speech-bubble-tail" />
          <div className="lv-speech-tag">
            <Sparkles size={13} className="text-[#ffd166]" /> OFFICIAL UPDATE
          </div>
          <h3 className="lv-speech-title">&ldquo;Prizes are on the way!&rdquo;</h3>
          <p className="lv-speech-desc">
            Sponsor prize pools and category bounties are being locked in. Whether you&apos;re competing
            onsite in Lahore or building virtually across the globe, huge honors await!
          </p>
          <div className="lv-speech-pills">
            <span className="lv-speech-pill"><Trophy size={13} /> 7x Onsite Trophies</span>
            <span className="lv-speech-pill"><Flag size={13} /> 5x Virtual Awards</span>
            <span className="lv-speech-pill"><ShieldCheck size={13} /> Certificates &amp; Swag for All</span>
          </div>
        </div>

        {/* Track Environment */}
        <div className="lv-track-area">
          {/* Background Speed Lines (active during run) */}
          {phase === 'running' && (
            <div className="lv-speed-lines">
              <span className="lv-speed-line sl1" />
              <span className="lv-speed-line sl2" />
              <span className="lv-speed-line sl3" />
              <span className="lv-speed-line sl4" />
            </div>
          )}

          {/* Pedestal with Trophy (disappears when grabbed) */}
          <div className={`lv-trophy-pedestal ${phase === 'victory' ? 'empty' : ''}`}>
            {phase !== 'victory' && (
              <div className="lv-pedestal-trophy">
                <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
                  <path d="M14 6H34V18C34 23.5 29.5 28 24 28C18.5 28 14 23.5 14 18V6Z" fill="#ffd166" stroke="#1a1a1a" strokeWidth="2.5" />
                  <path d="M14 10H8C6.9 10 6 10.9 6 12V14C6 17.3 8.7 20 12 20H14" stroke="#1a1a1a" strokeWidth="2.5" />
                  <path d="M34 10H40C41.1 10 42 10.9 42 12V14C42 17.3 39.3 20 36 20H34" stroke="#1a1a1a" strokeWidth="2.5" />
                  <path d="M24 28V36M16 40H32" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="24" cy="16" r="3" fill="#ffffff" />
                </svg>
                <div className="lv-trophy-pedestal-glow" />
              </div>
            )}
            <div className="lv-pedestal-block">
              <span className="lv-pedestal-text">1st</span>
            </div>
          </div>

          {/* Animated Tech Runner Mascot */}
          <div className={`lv-runner-wrapper phase-${phase}`}>
            <TechRunnerCharacter phase={phase} />
            {phase === 'running' && <div className="lv-runner-dust" />}
          </div>

          {/* Track Surface & Neon Grid Lines */}
          <div className="lv-track-ground">
            <div className="lv-track-finish-line" />
            <div className="lv-track-dash-stream" />
          </div>
        </div>
      </div>
    </section>
  );
}
