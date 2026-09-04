'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroTiltedCards({ cards }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cardEls = containerRef.current.querySelectorAll('.hero-polaroid-card');

      cardEls.forEach((card, idx) => {
        const targetTilt = parseFloat(card.getAttribute('data-tilt') || '0');
        const startX = (idx - 2) * -45; // Start slightly bunched toward center

        gsap.fromTo(
          card,
          {
            y: -180,
            x: startX,
            rotation: 0,
            opacity: 0.6
          },
          {
            y: 0,
            x: 0,
            rotation: targetTilt,
            opacity: 1,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 90%',
              end: 'top 20%',
              scrub: 0.8
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="hero-tilted-row">
      {cards.map((card) => (
        <div
          key={card.id}
          className="hero-polaroid-card"
          data-tilt={card.tilt}
          style={{ transform: `rotate(${card.tilt})` }}
        >
          <div className="hero-card-img-wrap" style={{ background: card.bgGradient }}>
            <div className="hero-card-badge">w</div>
            <img src={card.image} alt={card.name} className="hero-card-img" loading="lazy" />
          </div>
          <div className="hero-card-title">{card.name}</div>
          <div className="hero-card-sub">{card.caption}</div>
        </div>
      ))}
    </div>
  );
}
