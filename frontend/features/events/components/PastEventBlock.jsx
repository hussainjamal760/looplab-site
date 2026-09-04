'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollReveal from './ScrollReveal';

export default function PastEventBlock({
  title,
  description,
  buttonLabel = 'View online events →',
  cubeFaces = [],
  defaultOpen = false
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const cubeWrapperRef = useRef(null);

  useEffect(() => {
    if (!cubeWrapperRef.current) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.fromTo(
          cubeWrapperRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.4)'
          }
        );
      }
    }, cubeWrapperRef);

    return () => ctx.revert();
  }, [isOpen]);

  const handleToggleCube = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="past-event-block" style={{ marginBottom: '80px' }}>
      <div className="past-events-grid">
        {/* Left Column: Stacked Script Title & Toggle Button */}
        <div>
          <div className="double-heading-stack">
            <div className="script-stacked-title">{title}</div>
            <div className="script-stacked-title bold">{title}</div>
          </div>
          <button
            className="black-outlined-pill-btn"
            onClick={handleToggleCube}
            type="button"
          >
            {isOpen ? 'Close 3D View ✕' : buttonLabel}
          </button>
        </div>

        {/* Right Column: ScrollReveal Description Paragraph */}
        <div>
          <div className="past-events-body-p">
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
            >
              {description}
            </ScrollReveal>
          </div>
          <a href="#" className="read-more-link">Read More →</a>
        </div>
      </div>

      {/* 3D Revolving Cube Graphic (Animated when open) */}
      {isOpen && (
        <div ref={cubeWrapperRef} className="cube-mid-section">
          <div className="motion-streak-line" />
          <div className="past-3d-cube">
            {cubeFaces.slice(0, 4).map((face, idx) => (
              <div key={idx} className={`past-cube-face f${idx + 1}`}>
                <img src={face.image} alt={face.title} className="past-cube-img" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
