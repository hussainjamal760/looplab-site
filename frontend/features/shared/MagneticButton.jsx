"use client";

import { useRef } from "react";

const STRENGTH = 0.35;

export function MagneticButton({
  as: Component = "button",
  className = "",
  children,
  shine = true,
  ...rest
}) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * STRENGTH;
    const y = (e.clientY - r.top - r.height / 2) * STRENGTH;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  return (
    <Component
      ref={ref}
      className={`magnetic ${shine ? "shine-btn" : ""} ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </Component>
  );
}
