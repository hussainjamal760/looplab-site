"use client";

import { useEffect, useRef } from "react";

export function ParticleText({
  text = "UPCOMING EVENTS",
  particleSize = 2.2,
  density = 4,
  color = "#f8fafc",
  highlightColor = "#8b5cf6",
  scatter = 190,
  gatherDuration = 1600,
  stagger = 420,
  pointerRepel = 42,
  repelRadius = 120,
  idleDrift = 0.8,
  trigger = "mount",
  fontSize = "clamp(3.5rem, 13vw, 9rem)",
  fontWeight = 800,
  fontFamily = "inherit",
  glow = true,
  textStroke = true,
  strokeWidth = 3,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const mouse = { x: -9999, y: -9999, radius: repelRadius };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const init = () => {
      const width = (canvas.width = Math.min(window.innerWidth * 0.9, 1100));
      const height = (canvas.height = 170);

      // Offscreen canvas for sampling text pixel coordinates
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      const resolvedFamily = fontFamily === "inherit" ? "Epilogue, sans-serif" : fontFamily;
      let resolvedFontSize = Math.min(width / 9, 110);
      offCtx.font = `${fontWeight} ${resolvedFontSize}px ${resolvedFamily}`;
      const measuredWidth = offCtx.measureText(text).width;
      resolvedFontSize *= Math.min(1, (width - 24) / measuredWidth);
      offCtx.font = `${fontWeight} ${resolvedFontSize}px ${resolvedFamily}`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      if (textStroke) {
        offCtx.strokeStyle = color;
        offCtx.lineWidth = strokeWidth;
        offCtx.lineJoin = "round";
        offCtx.strokeText(text, width / 2, height / 2);
      } else {
        offCtx.fillStyle = color;
        offCtx.fillText(text, width / 2, height / 2);
      }

      const imgData = offCtx.getImageData(0, 0, width, height);
      particles = [];

      const step = Math.max(2, density);
      const colors = [color, color, highlightColor];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = imgData.data[index + 3];

          if (alpha > 128) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push({
              x: x + (Math.random() - 0.5) * scatter / 12,
              y: y + (Math.random() - 0.5) * scatter / 24,
              originX: x,
              originY: y,
              color: color,
              size: Math.random() * 0.8 + particleSize,
              vx: 0,
              vy: 0,
              ease: 1000 / Math.max(800, gatherDuration) + Math.random() * 0.03,
              friction: 0.88,
            });
          }
        }
      }
    };

    const initialDelay = trigger === "mount" ? 0 : stagger;
    const initTimer = window.setTimeout(init, initialDelay);

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion physics
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * pointerRepel / 10;
          p.vy -= Math.sin(angle) * force * pointerRepel / 10;
        }

        // Return to origin spring physics
        p.vx += (p.originX - p.x) * p.ease;
        p.vy += (p.originY - p.y) * p.ease;

        p.vx *= p.friction;
        p.vy *= p.friction;

        p.x += p.vx + (Math.sin(i + performance.now() / 1000) * idleDrift) / 20;
        p.y += p.vy;

        // Render particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(initTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, density, fontFamily, fontWeight, gatherDuration, highlightColor, idleDrift, particleSize, pointerRepel, repelRadius, scatter, stagger, strokeWidth, text, textStroke, trigger]);

  return (
    <div className={`particle-text-wrapper${glow ? " particle-text-wrapper--glow" : ""}`} style={{ fontSize }}>
      <canvas ref={canvasRef} className="particle-text-canvas" />
    </div>
  );
}

export default ParticleText;
