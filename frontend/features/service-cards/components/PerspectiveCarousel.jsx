'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ExecutiveTeamCard from './ExecutiveTeamCard';

const DEFAULT_TRANSITION = {
  type: 'spring',
  bounce: 0.12,
  duration: 0.85,
};

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

function CarouselControls({ currentIndex, items, loop, onSelect }) {
  const isPrevDisabled = !loop && currentIndex === 0;
  const isNextDisabled = !loop && currentIndex === items.length - 1;

  return (
    <div className="perspective-controls-wrapper">
      <button
        type="button"
        aria-label="Previous member"
        disabled={isPrevDisabled}
        className="perspective-nav-btn"
        onClick={() => onSelect(currentIndex - 1)}
      >
        <ChevronLeft size={20} />
      </button>

      <div className="perspective-dots">
        {items.map((item, idx) => (
          <button
            key={item.id || idx}
            type="button"
            aria-label={`Go to ${item.name}`}
            className={cn('perspective-dot', currentIndex === idx ? 'active' : '')}
            onClick={() => onSelect(idx)}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label="Next member"
        disabled={isNextDisabled}
        className="perspective-nav-btn"
        onClick={() => onSelect(currentIndex + 1)}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default function PerspectiveCarousel({
  items = [],
  defaultActiveIndex = 0,
  loop = true,
  slideWidth = 360,
  rotationStep = 28,
  inactiveScale = 0.86,
}) {
  const maxIndex = Math.max(0, items.length - 1);
  const [currentIndex, setCurrentIndex] = useState(() => clamp(defaultActiveIndex, 0, maxIndex));

  const selectSlide = useCallback(
    (nextIdx) => {
      if (!items.length) return;
      const resolved = loop ? (nextIdx + items.length) % items.length : clamp(nextIdx, 0, maxIndex);
      setCurrentIndex(resolved);
    },
    [items.length, loop, maxIndex]
  );

  if (!items.length) return null;

  return (
    <div className="perspective-carousel-container">
      <div className="perspective-viewport">
        <motion.div
          className="perspective-track"
          animate={{ x: -(currentIndex * slideWidth + slideWidth / 2) }}
          transition={DEFAULT_TRANSITION}
        >
          {items.map((member, index) => {
            const isActive = currentIndex === index;
            const rotateY = (currentIndex - index) * rotationStep;

            return (
              <div key={member.id || index} className="perspective-slide-wrap" style={{ width: slideWidth }}>
                <motion.div
                  className="perspective-slide-inner"
                  animate={{
                    rotateY,
                    scale: isActive ? 1 : inactiveScale,
                    opacity: Math.abs(currentIndex - index) > 2 ? 0.25 : 1,
                  }}
                  transition={DEFAULT_TRANSITION}
                >
                  <div
                    className={cn('perspective-card-button', isActive ? 'is-active' : '')}
                    onClick={() => selectSlide(index)}
                  >
                    <ExecutiveTeamCard member={member} index={index} />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <CarouselControls currentIndex={currentIndex} items={items} loop={loop} onSelect={selectSlide} />
    </div>
  );
}
