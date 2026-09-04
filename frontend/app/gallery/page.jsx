'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import LoopverseNavbar from '@/features/events/components/LoopverseNavbar';
import Footer from '@/features/footer/components/Footer';
import { galleryCollections } from '@/lib/eventsData';

export default function DedicatedGalleryPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const photos = galleryCollections[activeIdx] || galleryCollections[0];
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current.querySelectorAll('.dedicated-polaroid');
      gsap.fromTo(
        cards,
        { scale: 0.85, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [activeIdx]);

  return (
    <div className="events-page-wrapper" style={{ backgroundColor: '#e8e6e2' }}>
      <LoopverseNavbar />

      <main className="dedicated-gallery-main">
        {/* Back Link */}
        <div style={{ maxWidth: '1200px', margin: '100px auto 0 auto', padding: '0 24px' }}>
          <Link href="/events" className="back-arrow-link">
            ← Back to Events
          </Link>
        </div>

        {/* Header with Floating Sparkles */}
        <div className="gallery-header-wrap">
          <h1 className="gallery-signature-header">GALERY ✨</h1>
          
          <div className="header-sparkles-field" aria-hidden="true">
            <span className="h-sparkle s1">✨</span>
            <span className="h-sparkle s2">⭐</span>
            <span className="h-sparkle s3">✨</span>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="dash-pagination-bar" style={{ marginBottom: '50px' }}>
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

        {/* Scattered Polaroid Collage */}
        <div ref={gridRef} className="dedicated-polaroid-stage">
          {/* Yellow Glowing Swoosh Background Trail */}
          <div className="yellow-glow-swoosh" aria-hidden="true" />

          {/* Doodle Accents */}
          <div className="doodle-puzzle-piece" aria-hidden="true">🧩</div>
          <div className="doodle-curved-arrow" aria-hidden="true">⤵</div>

          {photos.map((item) => (
            <div
              key={item.id}
              className="dedicated-polaroid"
              style={{
                transform: `rotate(${item.tilt}deg) translateY(${item.offsetY}px)`
              }}
            >
              <div className="dedicated-polaroid-frame">
                <span className="dedicated-tag-badge">{item.tag}</span>
                <img
                  src={item.image}
                  alt={item.tag}
                  className="dedicated-polaroid-img"
                  loading="lazy"
                />
              </div>
              <div className="dedicated-caption-strip" />
            </div>
          ))}
        </div>
      </main>

      <footer className="main-footer">
        <Footer />
      </footer>
    </div>
  );
}
