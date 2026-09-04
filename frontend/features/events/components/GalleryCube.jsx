'use client';

import { useState } from 'react';
import CubeFace from './CubeFace';

export default function GalleryCube({ faces }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % faces.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + faces.length) % faces.length);
  };

  const handleDotClick = (index) => {
    setActiveIdx(index);
  };

  const rotationAngle = activeIdx * -90;

  return (
    <section className="gallery-cube-section">
      <span className="section-header-tag">INTERACTIVE 3D EXHIBIT</span>
      <h2 className="gallery-section-title">GALLERY</h2>
      <p className="gallery-section-sub">
        Explore highlighted event archives in 3D space. Use arrows or pagination controls to rotate between exhibition stages.
      </p>

      {/* 3D Scene Viewport */}
      <div className="cube-scene">
        <div
          className="cube-container"
          style={{ transform: `rotateY(${rotationAngle}deg)` }}
        >
          {faces.map((face, idx) => (
            <CubeFace key={face.id} face={face} faceIndex={idx} />
          ))}
        </div>
      </div>

      {/* Controls & Pagination */}
      <div className="cube-controls">
        <button
          className="cube-nav-btn"
          onClick={handlePrev}
          aria-label="Previous face"
          type="button"
        >
          ←
        </button>

        <div className="cube-dots">
          {faces.map((_, idx) => (
            <div
              key={idx}
              className={`cube-dot ${activeIdx === idx ? 'active-dot' : ''}`}
              onClick={() => handleDotClick(idx)}
              role="button"
              tabIndex={0}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          className="cube-nav-btn"
          onClick={handleNext}
          aria-label="Next face"
          type="button"
        >
          →
        </button>
      </div>
    </section>
  );
}
