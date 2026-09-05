'use client';

const lights = [
  { top: '15%', left: '8%', colorClass: '', delay: '0s' },
  { top: '22%', left: '82%', colorClass: 'light-coral', delay: '1.2s' },
  { top: '60%', left: '10%', colorClass: 'light-mint', delay: '0.6s' },
  { top: '78%', left: '88%', colorClass: '', delay: '2s' },
  { top: '38%', left: '92%', colorClass: 'light-mint', delay: '1.8s' },
  { top: '12%', left: '68%', colorClass: 'light-coral', delay: '0.4s' },
  { top: '50%', left: '5%', colorClass: '', delay: '1.5s' }
];

export default function GlowingStars() {
  return (
    <div className="star-field">
      {lights.map((light, idx) => (
        <div
          key={idx}
          className={`sparkling-light ${light.colorClass}`}
          style={{
            top: light.top,
            left: light.left,
            animationDelay: light.delay
          }}
        />
      ))}
    </div>
  );
}
