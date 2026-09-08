'use client';

export default function PrizeGraphicIcon({ type, accentColor, accentBg }) {
  switch (type) {
    case 'trophy':
      return <TrophyGraphic accentColor={accentColor} accentBg={accentBg} />;
    case 'globe':
      return <GlobeGraphic accentColor={accentColor} accentBg={accentBg} />;
    case 'crown':
      return <CrownGraphic accentColor={accentColor} accentBg={accentBg} />;
    case 'rocket':
      return <RocketGraphic accentColor={accentColor} accentBg={accentBg} />;
    case 'star':
      return <StarGraphic accentColor={accentColor} accentBg={accentBg} />;
    case 'gift':
    default:
      return <GiftGraphic accentColor={accentColor} accentBg={accentBg} />;
  }
}

function TrophyGraphic({ accentColor, accentBg }) {
  return (
    <div className="lv-prize-graphic lv-prize-graphic--trophy" style={{ background: accentBg }}>
      <div className="lv-prize-graphic-glow" style={{ background: accentColor }} />
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="lv-prize-svg">
        <path d="M14 6H34V18C34 23.5228 29.5228 28 24 28C18.4772 28 14 23.5228 14 18V6Z" fill="#ffd166" stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M14 10H8C6.89543 10 6 10.8954 6 12V14C6 17.3137 8.68629 20 12 20H14" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M34 10H40C41.1046 10 42 10.8954 42 12V14C42 17.3137 39.3137 20 36 20H34" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 28V36" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
        <path d="M16 40H32" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
        <circle cx="24" cy="16" r="3" fill="#ffffff" />
        <polygon points="38,8 40,3 42,8 45,10 42,12 40,17 38,12 33,10" fill="#f5693c" className="lv-sparkle-spin" />
      </svg>
    </div>
  );
}

function GlobeGraphic({ accentColor, accentBg }) {
  return (
    <div className="lv-prize-graphic lv-prize-graphic--globe" style={{ background: accentBg }}>
      <div className="lv-prize-graphic-glow" style={{ background: accentColor }} />
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="lv-prize-svg">
        <circle cx="24" cy="24" r="16" fill="#d4f4eb" stroke="#1a1a1a" strokeWidth="2.5" />
        <ellipse cx="24" cy="24" rx="7" ry="16" stroke="#29725f" strokeWidth="2" />
        <line x1="8" y1="24" x2="40" y2="24" stroke="#29725f" strokeWidth="2" />
        <path d="M10 16H38M10 32H38" stroke="#29725f" strokeWidth="1.5" strokeDasharray="2 2" />
        <circle cx="28" cy="18" r="2.5" fill="#f5693c" className="lv-ping-pulse" />
        <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#1a1a1a" strokeWidth="2" strokeDasharray="4 3" className="lv-ring-spin" />
      </svg>
    </div>
  );
}

function CrownGraphic({ accentColor, accentBg }) {
  return (
    <div className="lv-prize-graphic lv-prize-graphic--crown" style={{ background: accentBg }}>
      <div className="lv-prize-graphic-glow" style={{ background: accentColor }} />
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="lv-prize-svg">
        <path d="M8 36L6 14L16 22L24 10L32 22L42 14L40 36H8Z" fill="#f0befa" stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="6" cy="14" r="2.5" fill="#9E00FE" />
        <circle cx="24" cy="10" r="3" fill="#ffd166" />
        <circle cx="42" cy="14" r="2.5" fill="#9E00FE" />
        <line x1="8" y1="36" x2="40" y2="36" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
        <circle cx="24" cy="28" r="3" fill="#9E00FE" className="lv-gem-pulse" />
      </svg>
    </div>
  );
}

function RocketGraphic({ accentColor, accentBg }) {
  return (
    <div className="lv-prize-graphic lv-prize-graphic--rocket" style={{ background: accentBg }}>
      <div className="lv-prize-graphic-glow" style={{ background: accentColor }} />
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="lv-prize-svg lv-rocket-anim">
        <path d="M24 6C24 6 34 11 34 26L24 34L14 26C14 11 24 6 24 6Z" fill="#EAD2FF" stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="24" cy="18" r="3.5" fill="#805ad5" />
        <path d="M14 26L8 32V36L16 34" fill="#805ad5" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M34 26L40 32V36L32 34" fill="#805ad5" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M21 34L24 42L27 34" fill="#f5693c" className="lv-flame-flicker" />
      </svg>
    </div>
  );
}

function StarGraphic({ accentColor, accentBg }) {
  return (
    <div className="lv-prize-graphic lv-prize-graphic--star" style={{ background: accentBg }}>
      <div className="lv-prize-graphic-glow" style={{ background: accentColor }} />
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="lv-prize-svg lv-star-anim">
        <polygon points="24,4 29,18 44,19 32,29 36,44 24,34 12,44 16,29 4,19 19,18" fill="#ffd166" stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="24" cy="24" r="3" fill="#ffffff" />
        <circle cx="38" cy="10" r="1.5" fill="#f5693c" className="lv-star-twinkle" />
        <circle cx="10" cy="38" r="1.5" fill="#9E00FE" className="lv-star-twinkle-delay" />
      </svg>
    </div>
  );
}

function GiftGraphic({ accentColor, accentBg }) {
  return (
    <div className="lv-prize-graphic lv-prize-graphic--gift" style={{ background: accentBg }}>
      <div className="lv-prize-graphic-glow" style={{ background: accentColor }} />
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="lv-prize-svg lv-gift-anim">
        <rect x="8" y="18" width="32" height="22" rx="2" fill="#e6fab9" stroke="#1a1a1a" strokeWidth="2.5" />
        <rect x="6" y="12" width="36" height="6" rx="2" fill="#1a1a1a" />
        <line x1="24" y1="12" x2="24" y2="40" stroke="#1a1a1a" strokeWidth="3" />
        <path d="M24 12C21 7 15 7 15 10C15 13 24 12 24 12Z" fill="#f0befa" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M24 12C27 7 33 7 33 10C33 13 24 12 24 12Z" fill="#f0befa" stroke="#1a1a1a" strokeWidth="2" />
      </svg>
    </div>
  );
}
