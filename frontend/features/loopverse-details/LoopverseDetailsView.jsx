'use client';

import HeroBanner from './HeroBanner';
import ModulesFeatures2 from './ModulesFeatures2';
import Features10CirclePhases from './Features10CirclePhases';
import AnimatedTechRunnerPrizes from './AnimatedTechRunnerPrizes';
import '@/app/styles/loopverse-details.css';

export default function LoopverseDetailsView() {
  return (
    <div className="lv-details-page">
      <div className="lv-container">
        {/* 1. Ultrawide Curved Screen Hero */}
        <HeroBanner />

        {/* 2. Page 4: Competition Modules (ReactBits Features-2 with dynamic respective artworks) */}
        <ModulesFeatures2 />

        {/* 3. ReactBits Features-10: Circular Orbital Journey (Onsite 7h vs Virtual ~26h) */}
        <Features10CirclePhases />

        {/* 4. Animated Tech Runner & Trophy Teaser */}
        <AnimatedTechRunnerPrizes />

        {/* 5. Page 9: Closing Philosophy */}
        <div className="lv-philosophy-box">
          <div className="lv-infinity-tag">∞</div>
          <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--color-darkblue, #9E00FE)', fontWeight: 800, marginBottom: 12 }}>
            See You In The Loop
          </p>
          <h2 style={{ fontFamily: 'Epilogue, sans-serif', fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 900, color: '#1a1a1a', marginBottom: 18 }}>
            &ldquo;Idea. Build. Ship. Repeat.&rdquo;
          </h2>
          <p style={{ maxWidth: 680, margin: '0 auto', color: '#555555', fontSize: '1.12rem', lineHeight: 1.65, fontWeight: 500 }}>
            Seven modules, two tracks, one loop. Whether you&apos;re building shoulder to shoulder onsite in Lahore
            or coding through the night with a remote squad, LoopVerse 3.0 is waiting for you to bring your idea to life.
          </p>
        </div>
      </div>
    </div>
  );
}
