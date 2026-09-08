'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Globe2 } from 'lucide-react';

const TRACK_PHASES = [
  {
    id: 'onsite',
    title: 'Onsite Track · The 7-Hour Sprint',
    badge: '10:00 AM – 05:00 PM (Lahore Venue)',
    desc: 'The focused, high-energy in-person sprint. Teams build shoulder-to-shoulder with mentors on the floor, fast beginner-friendly briefs, and same-evening results.',
    hubLabel: 'ONSITE',
    hubSub: '7 Hours',
    hubColor: 'var(--color-orange, #f5693c)',
    nodes: [
      { label: 'Kick-off', time: '10:00 AM', top: '10%', left: '20%' },
      { label: 'Briefs Release', time: '10:30 AM', top: '18%', left: '72%' },
      { label: 'Building Begins', time: '11:00 AM', top: '48%', left: '80%' },
      { label: 'Mentor Lunch', time: '01:00 PM', top: '74%', left: '72%' },
      { label: 'Mid-Point Check', time: '03:00 PM', top: '84%', left: '24%' },
      { label: 'Live Pitches', time: '04:30 PM', top: '64%', left: '8%' },
      { label: 'Winners Crowned', time: '05:00 PM', top: '34%', left: '8%' },
    ],
    steps: [
      { time: '10:00 AM', title: 'Registration & Kick-off at Lahore venue' },
      { time: '10:30 AM', title: 'Team huddle + approachable problem statements release' },
      { time: '01:00 PM', title: 'Lunch + in-person floor mentor circulation' },
      { time: '04:30 PM', title: 'Live onstage pitches to judges & VC partners' },
      { time: '05:00 PM', title: 'Onsite winners announced with trophies & swag' },
    ]
  },
  {
    id: 'virtual',
    title: 'Virtual Track · The ~26-Hour Marathon',
    badge: 'Day 1 (10 AM) – Day 2 (12 PM) (Worldwide)',
    desc: 'The deeper, tougher grind for remote squads. Tackle production-grade problem briefs across time zones with async mentor calls and a 26-hour building window.',
    hubLabel: 'VIRTUAL',
    hubSub: '~26 Hours',
    hubColor: 'var(--color-darkblue, #9E00FE)',
    nodes: [
      { label: 'Opening Stream', time: 'Day 1 10:00 AM', top: '10%', left: '18%' },
      { label: 'Advanced Briefs', time: 'Day 1 10:30 AM', top: '18%', left: '72%' },
      { label: 'Async Mentors', time: 'Day 1 01:00 PM', top: '48%', left: '80%' },
      { label: 'Progress Check', time: 'Day 1 05:00 PM', top: '74%', left: '72%' },
      { label: 'Overnight Build', time: 'Day 1 10:00 PM', top: '84%', left: '24%' },
      { label: 'Final Touches', time: 'Day 2 09:00 AM', top: '64%', left: '8%' },
      { label: 'Submissions Close', time: 'Day 2 12:00 PM', top: '34%', left: '8%' },
    ],
    steps: [
      { time: 'Day 1 · 10:00 AM', title: 'Livestream opening ceremony & advanced briefs release' },
      { time: 'Day 1 · 01:00 PM', title: 'Async video call mentor office hours' },
      { time: 'Day 1 · 10:00 PM', title: 'Overnight self-paced squad development' },
      { time: 'Day 2 · 09:00 AM', title: 'Submission prep: repo link + 3-min demo video' },
      { time: 'Day 2 · 12:00 PM', title: 'Portal closes & virtual champions crowned' },
    ]
  }
];

export default function Features10CirclePhases() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIdx((curr) => (curr + 1) % TRACK_PHASES.length);
          return 0;
        }
        return prev + 2;
      });
    }, 140);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = TRACK_PHASES[activeIdx];

  return (
    <section className="lv-f10-section" id="journey">
      <div className="lv-section-header">
        <span className="lv-section-tag">Orbital Timeline · Features 10</span>
        <h2 className="lv-section-title">Onsite & Virtual Orbital Journeys</h2>
        <p className="lv-section-sub">
          Explore the exact hour-by-hour milestones for both the 7-hour Lahore sprint and the ~26-hour global marathon.
        </p>
      </div>

      <div 
        className="lv-f10-grid"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left: Orbital Circular Animation Stage */}
        <div className="lv-f10-orbital-stage">
          <div className="lv-f10-ring lv-f10-ring--outer" />
          <div className="lv-f10-ring lv-f10-ring--middle" />
          <div className="lv-f10-ring lv-f10-ring--inner" />

          {/* Central Hub */}
          <div 
            className="lv-f10-hub" 
            onClick={() => setActiveIdx((prev) => (prev + 1) % TRACK_PHASES.length)}
          >
            <div className="lv-f10-hub-pulse" style={{ background: `radial-gradient(circle, ${current.hubColor} 0%, transparent 70%)` }} />
            <span className="lv-f10-hub-logo" style={{ fontSize: 26, lineHeight: 1 }}>{current.hubLabel}</span>
            <span className="lv-f10-hub-text">{current.hubSub}</span>
          </div>

          {/* Orbiting Floating Nodes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.82 }}
              transition={{ duration: 0.32 }}
              style={{ position: 'absolute', inset: 0 }}
            >
              {current.nodes.map((node, i) => (
                <div 
                  key={node.label}
                  className="lv-f10-node lv-f10-node--highlight"
                  style={{ top: node.top, left: node.left }}
                >
                  <span className="lv-f10-node-icon">{i + 1}</span>
                  <span>{node.label}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Track Details Card */}
        <div className="lv-f10-phase-card">
          <div>
            <div className="lv-f10-tabs-row">
              {TRACK_PHASES.map((track, idx) => (
                <button
                  key={track.id}
                  type="button"
                  className={`lv-f10-tab-btn ${idx === activeIdx ? 'lv-f10-tab-btn--active' : ''}`}
                  onClick={() => {
                    setActiveIdx(idx);
                    setProgress(0);
                  }}
                >
                  {track.id === 'onsite' ? <Building2 size={16} /> : <Globe2 size={16} />}
                  <span>{track.id === 'onsite' ? '⚡ Onsite (7h)' : '🌐 Virtual (~26h)'}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
              >
                <span className="lv-f10-phase-badge" style={{ background: current.id === 'onsite' ? 'var(--color-orange, #f5693c)' : 'var(--color-lightblue, #EAD2FF)', color: current.id === 'onsite' ? '#ffffff' : '#1a1a1a' }}>
                  {current.badge}
                </span>
                <h3 className="lv-f10-phase-title">{current.title}</h3>
                <p className="lv-f10-phase-desc">{current.desc}</p>

                <div className="lv-f10-steps-list">
                  {current.steps.map((step, idx) => (
                    <div key={idx} className="lv-f10-step-item flex items-center gap-3">
                      <span className="w-32 h-10 shrink-0 flex items-center justify-center border-2 border-black rounded-xl bg-purple-100 font-bold text-xs sm:text-sm text-black shadow-[2px_2px_0px_#1a1a1a]">
                        {step.time}
                      </span>
                      <span className="font-semibold text-neutral-800 text-sm leading-snug">
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <div className="lv-f10-cycle-bar">
              <div className="lv-f10-cycle-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
