'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function TestimonialsCard({
  items = [],
  title = '',
  eyebrow = '02 / Community Team',
  width = 850,
  showNavigation = true,
  showCounter = true,
  autoPlay = false,
  autoPlayInterval = 4000,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeItem = items[activeIndex] || {};

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      setDirection(1);
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(activeIndex - 1);
    }
  };

  const rotations = useMemo(() => [4, -3, -7, 5], []);

  if (!items || items.length === 0) return null;

  return (
    <div className="team-stacked-card-wrapper w-full my-12 flex flex-col items-center">
      {/* Header Row */}
      <div className="w-full max-w-[850px] flex items-end justify-between mb-5 px-2">
        <div>
          <p className="text-[11px] font-bold tracking-widest text-[#9E00FE] uppercase font-sans mb-1">
            {eyebrow}
          </p>
          <h3 className="text-2xl md:text-4xl font-extrabold text-[#3b2452] font-serif tracking-tight">
            {title}
          </h3>
        </div>
        {showCounter && (
          <span className="inline-flex items-center justify-center font-mono text-xs md:text-sm font-extrabold text-[#3b2452] bg-[#ffffff] border-2 border-[#0a0a0a] px-6 py-2 rounded-full leading-none shadow-[2.5px_2.5px_0px_#0a0a0a]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Main Stack Container */}
      <div
        className="w-full relative grid grid-cols-1 md:grid-cols-[340px_1fr] gap-8 p-6 md:p-8 bg-[#ffffff] border-3 border-[#0a0a0a] rounded-[28px] shadow-[8px_8px_0px_#0a0a0a]"
        style={{ perspective: '1400px', maxWidth: `${width}px` }}
      >
        {/* Image Card Stack */}
        <div className="relative w-full aspect-[4/4] min-h-[320px]">
          <AnimatePresence custom={direction}>
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;

              return (
                <motion.div
                  key={item.id || index}
                  className="absolute inset-0 w-full h-full overflow-hidden border-3 border-[#0a0a0a] bg-[#0a0a0a] shadow-xl rounded-[22px] cursor-pointer"
                  initial={{
                    x: offset * 18,
                    y: Math.abs(offset) * 8,
                    z: -140 * Math.abs(offset),
                    scale: 0.86 - Math.abs(offset) * 0.05,
                    rotateZ: rotations[index % 4],
                    opacity: isActive ? 1 : 0.5,
                    zIndex: 10 - Math.abs(offset),
                  }}
                  animate={
                    isActive
                      ? {
                          x: [offset * 18, direction === 1 ? -180 : 180, 0],
                          y: [Math.abs(offset) * 8, 0, 0],
                          z: [-180, 120, 220],
                          scale: [0.86, 1.04, 1],
                          rotateZ: [rotations[index % 4], -4, 0],
                          opacity: 1,
                          zIndex: 100,
                        }
                      : {
                          x: offset * 18,
                          y: Math.abs(offset) * 8,
                          z: -140 * Math.abs(offset),
                          rotateZ: rotations[index % 4],
                          scale: 0.86 - Math.abs(offset) * 0.05,
                          opacity: 0.5,
                          zIndex: 10 - Math.abs(offset),
                        }
                  }
                  exit={{
                    x: direction === 1 ? -240 : 240,
                    z: -240,
                    scale: 0.75,
                    rotateZ: direction === 1 ? -10 : 10,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={handleNext}
                >
                  <img
                    src={item.image}
                    alt={item.name || item.title}
                    className="w-full h-full object-cover object-top filter contrast-[105%]"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="w-8 h-8 rounded-full bg-white/95 border-1.5 border-[#0a0a0a] flex items-center justify-center font-mono text-xs font-extrabold text-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#ead2ff] text-[#3b2452] border border-[#0a0a0a] leading-none shadow-[1.5px_1.5px_0px_#0a0a0a]">
                      {item.level || 'Member'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Info & Text Area */}
        <div className="flex flex-col justify-between py-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id || activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-center flex-1"
            >
              <div className="mb-3">
                <span className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-xs font-extrabold tracking-wider uppercase bg-[#9E00FE] text-white border-2 border-[#0a0a0a] leading-none shadow-[2.5px_2.5px_0px_#0a0a0a] -rotate-1">
                  {activeItem.role || activeItem.title}
                </span>
              </div>
              <h3 className="text-2xl md:text-3.5xl font-black text-[#0a0a0a] font-serif tracking-tight leading-tight">
                {activeItem.name || activeItem.title}
              </h3>
              <p className="text-sm font-sans font-medium text-[#5a4866] mt-3 leading-relaxed">
                {activeItem.description ||
                  `Key team member actively leading and driving operations for ${title} at LoopLab.`}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {showNavigation && items.length > 1 && (
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#0a0a0a]/10">
              <button
                disabled={activeIndex === 0}
                onClick={handlePrev}
                className={cn(
                  'flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#0a0a0a] bg-white text-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] transition-all',
                  activeIndex === 0
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-[#9E00FE] hover:text-white hover:-translate-y-0.5'
                )}
                aria-label="Previous member"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                disabled={activeIndex === items.length - 1}
                onClick={handleNext}
                className={cn(
                  'flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#0a0a0a] bg-white text-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] transition-all',
                  activeIndex === items.length - 1
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-[#9E00FE] hover:text-white hover:-translate-y-0.5'
                )}
                aria-label="Next member"
              >
                <ArrowRight className="w-5 h-5" />
              </button>

              <span className="ml-auto text-xs font-bold text-[#765f83] font-sans">
                Click card or arrows to explore →
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
