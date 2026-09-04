const ITEMS = [
  "🔴 CURRENTLY LIVE — REGISTRATIONS OPEN NOW!",
  "✦ LOOPVERSE 3.0",
  "⚡ BUILT BY STUDENTS FOR BUILDERS",
  "✦ LAHORE & KARACHI",
];

export function MarqueeStrip() {
  const track = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
