"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SPARKLE_POSITIONS } from "./data";

export function Sparkles() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const tweens = [];

    wrap.querySelectorAll(".sparkle").forEach((el, i) => {
      tweens.push(
        gsap.to(el, { y: "+=14", duration: 2.4 + i * 0.3, repeat: -1, yoyo: true, ease: "sine.inOut" }),
        gsap.to(el, { opacity: 0.35, duration: 1.8 + i * 0.2, repeat: -1, yoyo: true, ease: "sine.inOut" }),
      );
    });

    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <div id="sparkles" ref={wrapRef}>
      {SPARKLE_POSITIONS.map((p, i) => (
        <div key={i} className="sparkle" style={{ top: p.top, left: p.left }}>
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color}>
            <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
