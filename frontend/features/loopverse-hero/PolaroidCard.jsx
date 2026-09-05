"use client";

import { useRef } from "react";

export function PolaroidCard({ rot, image, title, subtitle }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const rx = (py * -14).toFixed(2);
    const ry = (px * 14).toFixed(2);
    el.style.transform = `rotate(${rot}deg) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.06)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = `rotate(${rot}deg)`;
  };

  return (
    <div
      ref={ref}
      className="polaroid"
      data-rot={rot}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="photo" style={{ backgroundImage: `url('${image}')` }}>
        <span className="badge">work</span>
      </div>
      <div className="cap">
        <b>{title}</b>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}
