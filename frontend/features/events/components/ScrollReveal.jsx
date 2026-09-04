'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollReveal({
  children,
  baseOpacity = 0.1,
  enableBlur = true,
  baseRotation = 3,
  blurStrength = 4,
  className = ''
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const wordEls = container.querySelectorAll('.scroll-reveal-word');

      // Initial un-rotation animation on scroll
      if (baseRotation !== 0) {
        gsap.fromTo(
          container,
          { rotation: baseRotation },
          {
            rotation: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              end: 'bottom 60%',
              scrub: 0.5
            }
          }
        );
      }

      // Word opacity and optional blur reveal animation
      wordEls.forEach((word) => {
        const toProps = {
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: word,
            start: 'top 88%',
            end: 'top 65%',
            scrub: 0.3
          }
        };

        if (enableBlur) {
          gsap.fromTo(
            word,
            { opacity: baseOpacity, filter: `blur(${blurStrength}px)` },
            {
              ...toProps,
              filter: 'blur(0px)'
            }
          );
        } else {
          gsap.fromTo(
            word,
            { opacity: baseOpacity },
            toProps
          );
        }
      });
    }, containerRef);

    // Scoped cleanup - only kills this instance's GSAP context & triggers
    return () => ctx.revert();
  }, [baseOpacity, enableBlur, baseRotation, blurStrength]);

  const words = typeof children === 'string' ? children.split(' ') : [];

  return (
    <div ref={containerRef} className={`scroll-reveal-container ${className}`}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className="scroll-reveal-word"
          style={{
            opacity: baseOpacity,
            filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
            display: 'inline-block',
            marginRight: '0.28em'
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
