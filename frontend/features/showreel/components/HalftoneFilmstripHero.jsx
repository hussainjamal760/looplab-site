'use client';

import { useEffect, useRef, useState } from 'react';
import HalftonePanel from './HalftonePanel';
import CenterGlowBeam from './CenterGlowBeam';
import { CalendarSticker } from '@/features/loopverse-hero/CalendarSticker';
import '@/app/styles/halftone-hero.css';

const POSTER = { id: 'poster', title: 'LoopVerse 3.0', url: '/assets/filmstrip/loopverse-poster.jpg' };

const TRACK_IMAGES = [
  { id: 1, title: 'Web Development', url: '/assets/filmstrip/web-development.jpg' },
  { id: 2, title: 'AI/ML Applied & Research', url: '/assets/filmstrip/ai-ml.jpg' },
  { id: 3, title: 'Cybersecurity & Open Innovation', url: '/assets/filmstrip/cybersecurity.jpg' },
  { id: 4, title: 'Game Development', url: '/assets/filmstrip/game-development.jpg' },
  { id: 5, title: 'Pitching Competition', url: '/assets/filmstrip/pitching-competition.jpg' },
];

// Interleave poster after every track image: track → poster → track → poster …
const FILMSTRIP_IMAGES = TRACK_IMAGES.flatMap((img) => [img, POSTER]);

// Duplicate list to guarantee seamless infinite loop
const DUPLICATED_PANELS = [...FILMSTRIP_IMAGES, ...FILMSTRIP_IMAGES];

export default function HalftoneFilmstripHero() {
  const trackRef = useRef(null);
  const panelRefs = useRef([]);
  const animFrameRef = useRef(null);
  const scrollPosRef = useRef(0);
  const [clipPcts, setClipPcts] = useState(() => Array(DUPLICATED_PANELS.length).fill(100));

  useEffect(() => {
    let active = true;

    const updateFrame = () => {
      if (!active || !trackRef.current) return;

      scrollPosRef.current -= 1.2; // Continuous smooth scroll speed
      const trackWidth = trackRef.current.scrollWidth / 2;

      if (Math.abs(scrollPosRef.current) >= trackWidth) {
        scrollPosRef.current += trackWidth;
      }
      trackRef.current.style.transform = `translateX(${scrollPosRef.current}px)`;

      const beamX = window.innerWidth / 2;
      const nextClips = panelRefs.current.map((panelEl) => {
        if (!panelEl) return 100;
        const rect = panelEl.getBoundingClientRect();
        if (beamX <= rect.left) return 100;
        if (beamX >= rect.right) return 0;
        return ((rect.right - beamX) / rect.width) * 100;
      });

      setClipPcts(nextClips);
      animFrameRef.current = requestAnimationFrame(updateFrame);
    };

    animFrameRef.current = requestAnimationFrame(updateFrame);

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <section className="halftone-hero-section">
      {/* ─── Floating SVG Doodles ─── */}
      <svg className="hero-doodle hero-doodle--star1" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M20 2l2.8 10.6L34 8.6l-7.2 8.4L36 20l-10.6 2.8 3.4 11.4-8.8-7-8.8 7 3.4-11.4L4 20l10.2-3L7 8.6l11.2 4L20 2z" fill="#7C1FE0" opacity="0.85"/>
      </svg>
      <svg className="hero-doodle hero-doodle--star2" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 1l2 7.5L23 5l-4.5 6L24 14l-7.5 2 2.5 8-5-5.5L9 24.5l2.5-8L4 14l6.5-3L6 5l7 3.5L14 1z" fill="#E8492E" opacity="0.9"/>
      </svg>
      <svg className="hero-doodle hero-doodle--squiggle" viewBox="0 0 120 28" fill="none" aria-hidden="true">
        <path d="M4 14 C12 4, 20 24, 28 14 S44 4, 52 14 S68 24, 76 14 S92 4, 100 14 S116 24, 116 14" stroke="#5B6FE8" strokeWidth="3" strokeLinecap="round" fill="none"/>
      </svg>
      <svg className="hero-doodle hero-doodle--orbit" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <ellipse cx="40" cy="40" rx="36" ry="16" stroke="#E0338C" strokeWidth="2.5" strokeDasharray="6 4" fill="none"/>
        <circle cx="76" cy="40" r="5" fill="#E0338C"/>
      </svg>
      <svg className="hero-doodle hero-doodle--dots" viewBox="0 0 60 20" fill="none" aria-hidden="true">
        <circle cx="6"  cy="10" r="4" fill="#7C1FE0"/>
        <circle cx="22" cy="10" r="4" fill="#E8492E" opacity="0.7"/>
        <circle cx="38" cy="10" r="4" fill="#5B6FE8"/>
        <circle cx="54" cy="10" r="4" fill="#E0338C" opacity="0.8"/>
      </svg>
      <svg className="hero-doodle hero-doodle--bolt" viewBox="0 0 30 52" fill="none" aria-hidden="true">
        <path d="M18 2L4 28h12l-4 22 20-28H18L22 2z" fill="#E8492E" opacity="0.9"/>
      </svg>
      <svg className="hero-doodle hero-doodle--circle-scribble" viewBox="0 0 90 90" fill="none" aria-hidden="true">
        <path d="M45 8 C72 8, 84 22, 82 45 C80 68, 66 82, 45 82 C22 82, 8 68, 8 45 C8 22, 20 8, 45 8 Z" stroke="#7C1FE0" strokeWidth="2.5" strokeDasharray="5 3" fill="none"/>
      </svg>

      {/* ─── Centered Header Content ─── */}
      <div className="halftone-hero__header">
        <div className="halftone-hero__title-row">
          <h1 className="halftone-hero__headline">
            {'LOOPVERSE'.split('').map((ch, i) => (
              <span key={i} className="halftone-hero__letter" style={{ animationDelay: `${i * 0.07}s` }}>
                {ch}
              </span>
            ))}
            {' '}
            <span className="halftone-hero__headline-accent">3.0</span>
          </h1>
          <div className="halftone-hero__calendar-wrap">
            <CalendarSticker />
          </div>
        </div>
        <p className="halftone-hero__subheading">
          Pakistan&apos;s largest campus tech gathering. Explore interactive projects, live keynotes, and build tracks.
        </p>
        <div className="halftone-hero__button-group">
          <a href="/events" className="halftone-hero__cta-btn">
            <span>Explore Events</span>
            <span className="halftone-hero__cta-arrow">→</span>
          </a>
          <a href="/loopverse" className="halftone-hero__secondary-btn">
            <span>View Details</span>
            <span className="halftone-hero__cta-arrow">↗</span>
          </a>
        </div>
      </div>

      {/* ─── 3D Filmstrip Viewport with Center Glow Beam ─── */}
      <div className="filmstrip-viewport">
        <CenterGlowBeam />
        <div ref={trackRef} className="filmstrip-track">
          {DUPLICATED_PANELS.map((item, idx) => (
            <HalftonePanel
              key={`${item.id}-${idx}`}
              ref={(el) => { panelRefs.current[idx] = el; }}
              image={item.url}
              title={item.title}
              clipRightPct={clipPcts[idx]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
