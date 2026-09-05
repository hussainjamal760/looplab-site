'use client';

import React, { useRef, useState } from 'react';

const BADGE_COLORS = [
  { bg: '#9E00FE', text: '#ffffff', pillBg: '#ead2ff', pillText: '#3b2452' },
  { bg: '#f5693c', text: '#ffffff', pillBg: '#ffe0d5', pillText: '#5b3027' },
  { bg: '#29725f', text: '#ffffff', pillBg: '#e6fab9', pillText: '#244c42' },
  { bg: '#a0325a', text: '#ffffff', pillBg: '#f0befa', pillText: '#3b2452' },
];

export default function ExecutiveTeamCard({ member, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const colors = BADGE_COLORS[index % BADGE_COLORS.length];
  const initials = member.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -12;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.35 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      className={`exec-editorial-card ${isHovered ? 'hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.03 : 1})`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
      }}
    >
      <div
        className="exec-card-glare"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
          opacity: glare.opacity,
        }}
      />

      <div className="exec-portrait-container">
        {!imgError ? (
          <img
            src={member.image}
            alt={member.name}
            className="exec-portrait-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="exec-portrait-fallback" style={{ background: colors.bg }}>
            {initials}
          </div>
        )}
        <div className="exec-portrait-overlay" />
      </div>

      <div className="exec-card-top-bar">
        <span className="exec-index-tag">{String(index + 1).padStart(2, '0')}</span>
        <span className="exec-level-tag" style={{ background: colors.pillBg, color: colors.pillText }}>
          {member.level || 'Executive'}
        </span>
      </div>

      <div className="exec-card-bottom-info">
        <span className="exec-role-pill" style={{ background: colors.bg, color: colors.text }}>
          {member.role}
        </span>
        <h4 className="exec-member-name">{member.name}</h4>
      </div>
    </div>
  );
}
