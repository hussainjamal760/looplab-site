'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Award, CheckCircle2 } from 'lucide-react';
import { PRIZES_CONTRIBUTIONS_DATA } from './prizesData';

export default function Bento37CoverFlow({ activeIndex, onSelectIndex }) {
  const scrollRef = useRef(null);

  const scrollBy = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="lv-bento37-stage-card">
      <div className="lv-bento37-stage-header">
        <div>
          <span className="lv-section-tag" style={{ background: '#f0befa' }}>
            <Sparkles size={13} /> All Competition Tiers
          </span>
          <h3 className="lv-bento37-stage-title">Select a Tier to Inspect Details</h3>
        </div>
        <div className="lv-bento37-nav-btns">
          <button
            type="button"
            onClick={() => scrollBy(-340)}
            className="lv-bento-arrow-btn"
            aria-label="Scroll Left"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(340)}
            className="lv-bento-arrow-btn"
            aria-label="Scroll Right"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Flat Equal-Plane Horizontal Tier Grid / Carousel */}
      <div ref={scrollRef} className="lv-flat-tier-scroll-track">
        {PRIZES_CONTRIBUTIONS_DATA.map((item, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <div
              key={item.id}
              className={`lv-flat-tier-card ${isSelected ? 'lv-flat-tier-card--active' : ''}`}
              onClick={() => onSelectIndex(idx)}
              role="button"
              tabIndex={0}
            >
              <div
                className="lv-flat-tier-top"
                style={{ backgroundColor: item.accentBg }}
              >
                <span
                  className="lv-flat-tier-badge"
                  style={{ backgroundColor: item.accentColor, color: '#ffffff' }}
                >
                  {item.badge}
                </span>
                <Award size={22} color={item.accentColor} />
              </div>

              <div className="lv-flat-tier-body">
                <span className="lv-flat-tier-category">{item.category}</span>
                <h4 className="lv-flat-tier-name">{item.title}</h4>
                <p className="lv-flat-tier-reward">{item.rewardSummary}</p>
                <p className="lv-flat-tier-desc">{item.tagline}</p>
              </div>

              <div className="lv-flat-tier-footer">
                <div className="lv-flat-tier-status">
                  <CheckCircle2
                    size={16}
                    color={isSelected ? '#9E00FE' : '#666666'}
                    className="shrink-0"
                  />
                  <span>{isSelected ? 'Currently Viewing' : 'Click to View'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
