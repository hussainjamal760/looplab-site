'use client';

const sparkles = [
  { top: '15%', left: '8%', class: 'gold', delay: '0s' },
  { top: '25%', left: '88%', class: 'lavender', delay: '1.2s' },
  { top: '65%', left: '12%', class: '', delay: '0.6s' },
  { top: '75%', left: '90%', class: 'gold', delay: '2s' },
  { top: '40%', left: '92%', class: 'lavender', delay: '1.8s' }
];

export default function HeroGridFloor() {
  return (
    <>
      <div className="perspective-grid-floor" aria-hidden="true" />
      <div className="hero-sparkle-field" aria-hidden="true">
        {sparkles.map((sp, idx) => (
          <svg
            key={idx}
            className={`sparkle-doodle ${sp.class}`}
            style={{ top: sp.top, left: sp.left, animationDelay: sp.delay }}
            viewBox="0 0 24 24"
          >
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        ))}
      </div>
    </>
  );
}
