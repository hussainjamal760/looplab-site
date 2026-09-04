"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";

/**
 * Wraps the app in Lenis smooth scrolling and keeps GSAP's ticker in sync.
 */
export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    const gsapTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(gsapTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafId);
      gsap.ticker.remove(gsapTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
