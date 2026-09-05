'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryCollections } from '@/lib/eventsData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrapbookPolaroidGallery({ photos = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);
  const svgPathRef1 = useRef(null);
  const svgPathRef2 = useRef(null);

  const currentPhotos = (galleryCollections && galleryCollections[activeIdx])
    ? galleryCollections[activeIdx]
    : (photos.length > 0 ? photos : galleryCollections[0]);

  // Entrance & Scroll Parallax Animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current.querySelectorAll('.scrapbook-card');

      // Directional initial states
      const directions = [
        { y: -300, x: -50, rotation: -20 },
        { y: 50, x: -350, rotation: 25 },
        { y: -200, x: 300, rotation: -15 },
        { y: 350, x: 80, rotation: 18 },
        { y: -250, x: -200, rotation: -12 }
      ];

      cards.forEach((card, idx) => {
        const dir = directions[idx % directions.length];
        const targetRot = card.getAttribute('data-tilt') || '0';

        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.8,
            x: dir.x,
            y: dir.y,
            rotation: dir.rotation
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotation: parseFloat(targetRot),
            duration: 1.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            delay: idx * 0.12
          }
        );
      });

      // SVG Arrow Line-Drawing Animation
      [svgPathRef1, svgPathRef2].forEach((pathRef, idx) => {
        if (!pathRef.current) return;
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%'
          },
          delay: 0.5 + idx * 0.3
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeIdx]);

  return (
    <section ref={containerRef} className="scrapbook-gallery-section">
      <h2 className="galery-quirky-header">GALERY ✨</h2>

      {/* 5-Dot Collection Selector */}
      <div className="dash-pagination-bar" style={{ marginBottom: '40px' }}>
        {galleryCollections.map((_, idx) => (
          <div
            key={idx}
            className={`dash-pill ${activeIdx === idx ? 'active' : ''}`}
            onClick={() => setActiveIdx(idx)}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
          />
        ))}
      </div>

      <div className="scrapbook-stage">
        {/* Yellow Swoosh Trail */}
        <div className="yellow-glow-swoosh" aria-hidden="true" />

        {/* Hand-Drawn Animated SVG Connecting Arrows */}
        <svg className="scrapbook-svg-overlay" viewBox="0 0 1000 600" fill="none">
          <path
            ref={svgPathRef1}
            d="M 220 180 Q 380 90 520 220"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="8 8"
          />
          <path
            ref={svgPathRef2}
            d="M 580 260 Q 720 380 820 240"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Scattered Scrapbook Cards */}
        {currentPhotos.map((photo, idx) => (
          <div
            key={photo.id}
            className={`scrapbook-card pos-${idx + 1}`}
            data-tilt={photo.rotation ?? photo.tilt ?? 0}
            style={{
              zIndex: idx + 2,
              transform: `rotate(${photo.rotation ?? photo.tilt ?? 0}deg)`
            }}
          >
            <div className="scrapbook-polaroid-frame">
              <span className="scrapbook-tag">{photo.tag}</span>
              <img src={photo.image} alt={photo.caption || photo.tag} className="scrapbook-img" loading="lazy" />
            </div>
            <div className="scrapbook-caption-strip">
              {photo.caption || photo.tag}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
