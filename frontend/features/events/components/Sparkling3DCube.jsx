'use client';

import { useState } from 'react';

const faceClasses = [
  'cube-face-front',
  'cube-face-right',
  'cube-face-back',
  'cube-face-left'
];

export default function Sparkling3DCube({ faces }) {
  const [activeFaceIdx, setActiveFaceIdx] = useState(0);

  const handleNext = () => {
    setActiveFaceIdx((prev) => (prev + 1) % faces.length);
  };

  const handlePrev = () => {
    setActiveFaceIdx((prev) => (prev - 1 + faces.length) % faces.length);
  };

  const rotationAngle = activeFaceIdx * -90;

  return (
    <div className="sparkling-cube-area">
      {/* Floating Light Particles Around 3D Cube */}
      <div className="cube-particle-field" aria-hidden="true">
        <div className="sparkle-particle" style={{ top: '10%', left: '15%', animationDelay: '0s' }} />
        <div className="sparkle-particle p-coral" style={{ top: '70%', left: '85%', animationDelay: '1.2s' }} />
        <div className="sparkle-particle p-mint" style={{ top: '80%', left: '20%', animationDelay: '0.7s' }} />
        <div className="sparkle-particle" style={{ top: '25%', left: '80%', animationDelay: '2.1s' }} />
      </div>

      {/* 3D Scene */}
      <div className="cube-scene">
        <div
          className="cube-container"
          style={{ transform: `rotateY(${rotationAngle}deg)` }}
        >
          {faces.map((face, idx) => (
            <div
              key={idx}
              className={`cube-face ${faceClasses[idx] || 'cube-face-front'}`}
            >
              <div className="face-image-wrap">
                <span className="face-badge">{face.tag}</span>
                <img src={face.image} alt={face.title} className="face-image" loading="lazy" />
              </div>
              <div className="face-info">
                <h4 className="face-title">{face.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cube Navigation */}
      <div className="cube-controls">
        <button className="cube-nav-btn" onClick={handlePrev} type="button">←</button>
        <div className="cube-dots">
          {faces.map((_, idx) => (
            <div
              key={idx}
              className={`cube-dot ${activeFaceIdx === idx ? 'active-dot' : ''}`}
              onClick={() => setActiveFaceIdx(idx)}
              role="button"
              tabIndex={0}
            />
          ))}
        </div>
        <button className="cube-nav-btn" onClick={handleNext} type="button">→</button>
      </div>
    </div>
  );
}
