"use client";

import { useRef } from "react";

export function SpotlightCard({ className = "", children }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} className={`spotlight-card ${className}`.trim()} onMouseMove={handleMouseMove}>
      {children}
    </div>
  );
}
