'use client';

export default function RegistrationChart() {
  const days = ['Sep 1', 'Sep 2', 'Sep 3', 'Sep 4', 'Sep 5', 'Sep 6', 'Sep 7'];
  const yTicks = [400, 300, 200, 100, 0];

  return (
    <div className="db-card">
      <div className="db-card__header">
        <span className="db-card__title">Registrations & Payments Overview</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.72rem', fontWeight: 800 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#9E00FE' }} />
            <span>Total Registrations</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#111111' }} />
            <span>Successful Payments</span>
          </div>
        </div>
      </div>

      <div className="db-card__body" style={{ height: '220px', position: 'relative', display: 'flex' }}>
        {/* Y Axis */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '0.5rem', fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>
          {yTicks.map((t) => <span key={t}>{t}</span>)}
        </div>

        {/* SVG Canvas */}
        <div style={{ flex: 1, position: 'relative' }}>
          <svg viewBox="0 0 500 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9E00FE" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#9E00FE" stopOpacity="0.01" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 45, 90, 135, 175].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="500" y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
            ))}

            {/* Total Registrations Area & Line */}
            <path
              d="M 10 100 Q 80 85 160 110 T 320 65 T 480 30 L 480 175 L 10 175 Z"
              fill="url(#purpleGrad)"
            />
            <path
              d="M 10 100 Q 80 85 160 110 T 320 65 T 480 30"
              fill="none"
              stroke="#9E00FE"
              strokeWidth="2.5"
            />
            {/* Purple Dots */}
            {[[10, 100], [90, 92], [170, 110], [250, 95], [330, 65], [410, 50], [480, 30]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3.5" fill="#9E00FE" stroke="#ffffff" strokeWidth="1.5" />
            ))}

            {/* Successful Payments Line */}
            <path
              d="M 10 130 Q 80 115 160 135 T 320 105 T 480 55"
              fill="none"
              stroke="#111111"
              strokeWidth="2.5"
            />
            {/* Black Dots */}
            {[[10, 130], [90, 115], [170, 135], [250, 120], [330, 105], [410, 115], [480, 55]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3.5" fill="#111111" stroke="#ffffff" strokeWidth="1.5" />
            ))}
          </svg>

          {/* X Axis */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', fontSize: '0.68rem', fontWeight: 700, color: '#71717a' }}>
            {days.map((d) => <span key={d}>{d}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
