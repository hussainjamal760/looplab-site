'use client';

import GlowingStars from './GlowingStars';

export default function UpcomingEventsHero() {
  return (
    <section className="events-hero-section">
      <GlowingStars />
      <div className="events-hero-content">
        <div className="events-pill-badge">
          <span>★</span> LOOPLAB EVENTS 2023 <span>★</span>
        </div>
        <h1 className="events-hero-title">UPCOMING EVENTS</h1>
        <p className="events-hero-subtitle">
          Discover interactive tech summits, buildathons, web design expos, and community meetups hosted across Pakistan.
        </p>
      </div>
    </section>
  );
}
