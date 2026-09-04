'use client';

import HeroGridFloor from './HeroGridFloor';
import HeroTiltedCards from './HeroTiltedCards';

export default function HeroHeadlineSection({ cards }) {
  return (
    <section className="loopverse-hero-section">
      <HeroGridFloor />
      
      {/* Tilted Polaroid Cards Fanned Out Above Headline */}
      <HeroTiltedCards cards={cards} />

      {/* Main Bold Headline */}
      <h1 className="hero-huge-headline">UPCOMING EVENTS</h1>

      {/* Scroll-Linked Registration Block */}
      <div className="hero-scroll-block">
        <div className="hero-script-heading">loopverse 3.0</div>
        <h2 className="hero-subheading">Registrations Open</h2>
        <button className="gradient-portal-btn" type="button">
          <span>Portal</span>
          <span>✨</span>
        </button>
      </div>
    </section>
  );
}
