"use client";

import { useRef, useState, useEffect } from "react";

const FACE_CLASSES = ["cf-front", "cf-back", "cf-right", "cf-left", "cf-top", "cf-bottom"];
const FACE_LABELS = ["FRONT", "BACK", "RIGHT", "LEFT", "TOP", "BOTTOM"];

export function Cube({ faces, title = "3D BLOCK" }) {
  const cubeRef = useRef(null);
  const [rotX, setRotX] = useState(-15);
  const [rotY, setRotY] = useState(25);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);
  const velocityRef = useRef({ x: 0.6, y: 0.3 }); // continuous revolving speed

  // Auto-revolve loop when not dragging
  useEffect(() => {
    let active = true;
    const loop = () => {
      if (!isDragging) {
        setRotY((prev) => (prev + velocityRef.current.x) % 360);
        setRotX((prev) => {
          const next = prev + velocityRef.current.y * 0.5;
          return Math.max(-60, Math.min(60, next));
        });
      }
      if (active) {
        animFrameRef.current = requestAnimationFrame(loop);
      }
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    setRotY((prev) => prev + deltaX * 0.8);
    setRotX((prev) => Math.max(-60, Math.min(60, prev - deltaY * 0.8)));

    // update inertia velocity
    velocityRef.current = { x: deltaX * 0.15, y: -deltaY * 0.15 };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // damp velocity
    if (Math.abs(velocityRef.current.x) < 0.2) velocityRef.current.x = 0.5;
    if (Math.abs(velocityRef.current.y) < 0.1) velocityRef.current.y = 0.2;
  };

  return (
    <div
      className="cube-stage-3d"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {/* Floating 3D Badge */}
      <div className="cube-drag-badge">
        <span className="sparkle-ic">✦</span> Drag or Hover to Spin 3D Block
      </div>

      <div className="cube-wrap-3d">
        <div
          ref={cubeRef}
          className="cube-3d"
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          }}
        >
          {faces.map((image, i) => (
            <div
              key={i}
              className={`cube-face-3d ${FACE_CLASSES[i]}`}
              style={{ backgroundImage: `url('${image}')` }}
            >
              <div className="face-overlay-glass" />
              <div className="face-border-bevel" />
              <span className="face-tag">{FACE_LABELS[i]}</span>
              <span className="face-bolt tl" />
              <span className="face-bolt tr" />
              <span className="face-bolt bl" />
              <span className="face-bolt br" />
            </div>
          ))}
        </div>
      </div>

      {/* 3D Floor Shadow */}
      <div
        className="cube-floor-shadow"
        style={{
          transform: `scale(${1 + Math.sin((rotY * Math.PI) / 180) * 0.15})`,
          opacity: 0.55 + Math.cos((rotY * Math.PI) / 180) * 0.15,
        }}
      />
    </div>
  );
}
