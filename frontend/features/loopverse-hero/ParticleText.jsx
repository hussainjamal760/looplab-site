"use client";

import { useEffect, useRef } from "react";

export function ParticleText({ text = "UPCOMING EVENTS" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const mouse = { x: -9999, y: -9999, radius: 85 };

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
      const height = (canvas.height = 140);

      // Offscreen canvas for sampling text pixel coordinates
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      const fontSize = Math.min(width / 9, 88);
      offCtx.font = `900 ${fontSize}px 'Archivo Black', sans-serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillStyle = "#ffffff";
      offCtx.fillText(text, width / 2, height / 2);

      const imgData = offCtx.getImageData(0, 0, width, height);
      particles = [];

      const step = 4; // Gap between sampled particle pixels
      // Light and Dark purple palette with crisp white highlights
      const colors = ["#c9a6ff", "#8e1fef", "#b48cff", "#6f1ab6", "#d4b3ff", "#ffffff"];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = imgData.data[index + 3];

          if (alpha > 128) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push({
              x: x + (Math.random() - 0.5) * 4,
              y: y + (Math.random() - 0.5) * 4,
              originX: x,
              originY: y,
              color: color,
              size: Math.random() * 2.2 + 1.2,
              vx: 0,
              vy: 0,
              ease: 0.08 + Math.random() * 0.04,
              friction: 0.88,
            });
          }
        }
      }
    };

    init();

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
          p.vx -= Math.cos(angle) * force * 4.5;
          p.vy -= Math.sin(angle) * force * 4.5;
        }

        // Return to origin spring physics
        p.vx += (p.originX - p.x) * p.ease;
        p.vy += (p.originY - p.y) * p.ease;

        p.vx *= p.friction;
        p.vy *= p.friction;

        p.x += p.vx;
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
      cancelAnimationFrame(animationFrameId);
    };
  }, [text]);

  return (
    <div className="particle-text-wrapper">
      <canvas ref={canvasRef} className="particle-text-canvas" />
    </div>
  );
}
