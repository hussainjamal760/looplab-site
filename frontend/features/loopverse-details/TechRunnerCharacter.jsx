'use client';

export default function TechRunnerCharacter({ phase }) {
  // phase: 'running' | 'grabbing' | 'victory'
  const isVictory = phase === 'victory';
  const isGrabbing = phase === 'grabbing';

  return (
    <div className={`lv-tech-runner ${phase}`}>
      {/* Victory Confetti Burst */}
      {isVictory && (
        <div className="lv-runner-confetti">
          <span className="lv-particle p1">★</span>
          <span className="lv-particle p2">✦</span>
          <span className="lv-particle p3">●</span>
          <span className="lv-particle p4">★</span>
          <span className="lv-particle p5">✦</span>
        </div>
      )}

      {/* Held Trophy in Victory */}
      {isVictory && (
        <div className="lv-runner-trophy-held">
          <svg width="64" height="64" viewBox="0 0 48 48" fill="none" className="lv-held-trophy-svg">
            <path d="M14 6H34V18C34 23.5228 29.5228 28 24 28C18.4772 28 14 23.5228 14 18V6Z" fill="#ffd166" stroke="#1a1a1a" strokeWidth="2.5" />
            <path d="M14 10H8C6.89 10 6 10.9 6 12V14C6 17.3 8.7 20 12 20H14" stroke="#1a1a1a" strokeWidth="2.5" />
            <path d="M34 10H40C41.1 10 42 10.9 42 12V14C42 17.3 39.3 20 36 20H34" stroke="#1a1a1a" strokeWidth="2.5" />
            <path d="M24 28V36M16 40H32" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
            <polygon points="38,8 40,3 42,8 45,10 42,12 40,17 38,12 33,10" fill="#f5693c" className="lv-trophy-sparkle" />
          </svg>
        </div>
      )}

      {/* Cyber Robot Mascot SVG */}
      <svg width="135" height="165" viewBox="0 0 90 110" fill="none" className="lv-bot-svg">
        {/* Antenna */}
        <line x1="45" y1="12" x2="45" y2="2" stroke="#1a1a1a" strokeWidth="3" />
        <circle cx="45" cy="2" r="4" fill="#9E00FE" className="lv-antenna-beacon" />

        {/* Head */}
        <rect x="25" y="12" width="40" height="30" rx="10" fill="#ffffff" stroke="#1a1a1a" strokeWidth="3" />
        <rect x="21" y="22" width="4" height="10" rx="2" fill="#9E00FE" />
        <rect x="65" y="22" width="4" height="10" rx="2" fill="#9E00FE" />

        {/* Cyber Visor Screen */}
        <rect x="30" y="18" width="30" height="16" rx="6" fill="#18181b" />
        {isVictory ? (
          // Happy Joy Eyes ^ _ ^
          <g stroke="#10b981" strokeWidth="2.5" strokeLinecap="round">
            <path d="M34 27L38 23L42 27" />
            <path d="M48 27L52 23L56 27" />
          </g>
        ) : (
          // Focused Running Visor / Laser Scan
          <g>
            <circle cx="37" cy="26" r="3" fill="#10b981" />
            <circle cx="53" cy="26" r="3" fill="#10b981" />
            <line x1="33" y1="26" x2="57" y2="26" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" className="lv-visor-scan" />
          </g>
        )}

        {/* Torso */}
        <rect x="30" y="44" width="30" height="28" rx="8" fill="#f0befa" stroke="#1a1a1a" strokeWidth="3" />
        {/* Glowing Energy Core */}
        <circle cx="45" cy="58" r="6" fill="#9E00FE" stroke="#1a1a1a" strokeWidth="2" className="lv-core-glow" />

        {/* Left Arm */}
        <g className={isVictory ? 'lv-arm-up' : isGrabbing ? 'lv-arm-reach' : 'lv-arm-run-left'}>
          <path d="M28 48C20 48 14 55 14 62" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
          <circle cx="14" cy="62" r="4" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2" />
        </g>

        {/* Right Arm */}
        <g className={isVictory ? 'lv-arm-victory' : isGrabbing ? 'lv-arm-grab' : 'lv-arm-run-right'}>
          <path d="M62 48C70 48 76 55 76 62" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
          <circle cx="76" cy="62" r="4" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2" />
        </g>

        {/* Left Leg */}
        <g className={isVictory ? 'lv-leg-stand-left' : 'lv-leg-run-left'}>
          <path d="M37 72V92H31" stroke="#1a1a1a" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="26" y="90" width="12" height="6" rx="3" fill="#1a1a1a" />
        </g>

        {/* Right Leg */}
        <g className={isVictory ? 'lv-leg-stand-right' : 'lv-leg-run-right'}>
          <path d="M53 72V92H59" stroke="#1a1a1a" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="52" y="90" width="12" height="6" rx="3" fill="#1a1a1a" />
        </g>
      </svg>
    </div>
  );
}
