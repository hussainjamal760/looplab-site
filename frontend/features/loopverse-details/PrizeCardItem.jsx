'use client';

import { CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import PrizeGraphicIcon from './PrizeGraphicIcon';

export default function PrizeCardItem({ item }) {
  const isConfirmed = item.poolStatus !== 'To Be Confirmed';

  return (
    <div
      className="lv-prize-card"
      style={{
        '--card-accent': item.accentColor,
        '--card-bg-accent': item.accentBg
      }}
    >
      {/* Top Header Row with Graphic and Badges */}
      <div className="lv-prize-card-top">
        <PrizeGraphicIcon
          type={item.iconType}
          accentColor={item.accentColor}
          accentBg={item.accentBg}
        />
        <div className="lv-prize-card-badges">
          <span
            className="lv-prize-badge"
            style={{ backgroundColor: item.badgeBg, color: item.badgeColor }}
          >
            {item.badge}
          </span>
          <span className="lv-prize-count-chip">{item.count}</span>
        </div>
      </div>

      {/* Title & Track Domain */}
      <div className="lv-prize-card-header">
        <span className="lv-prize-track-tag">{item.category}</span>
        <h3 className="lv-prize-title">{item.title}</h3>
      </div>

      {/* Prize Pool Status Box */}
      <div className={`lv-prize-status-box ${isConfirmed ? 'confirmed' : 'tbc'}`}>
        <div className="lv-prize-status-inner">
          <div className="lv-prize-status-header">
            {isConfirmed ? (
              <ShieldCheck size={16} className="text-[#10b981]" />
            ) : (
              <Clock size={16} className="text-[#9E00FE] lv-clock-pulse" />
            )}
            <span className="lv-prize-status-label">
              {isConfirmed ? 'GUARANTEED BENEFIT' : 'PRIZE POOL STATUS'}
            </span>
          </div>
          <p className="lv-prize-status-val">{item.poolStatus}</p>
        </div>
      </div>

      {/* Perks List */}
      <ul className="lv-prize-perks-list">
        {item.perks.map((perk, i) => (
          <li key={i} className="lv-prize-perk-item">
            <CheckCircle2 size={15} style={{ color: item.accentColor }} className="shrink-0" />
            <span>{perk}</span>
          </li>
        ))}
      </ul>

      {/* Footer Highlight */}
      <div className="lv-prize-card-footer">
        <span className="lv-prize-highlight-text">{item.highlight}</span>
      </div>
    </div>
  );
}
