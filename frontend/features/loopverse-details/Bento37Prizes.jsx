'use client';

import { useState } from 'react';
import Bento37CoverFlow from './Bento37CoverFlow';
import Bento37DetailsInspector from './Bento37DetailsInspector';

export default function Bento37Prizes() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="lv-bento37-section" id="prizes">
      <div className="lv-section-header">
        <span className="lv-section-tag" style={{ background: '#f0befa' }}>
          Recognition & Community Pool
        </span>
        <h2 className="lv-section-title">Prizes & Contributions</h2>
        <p className="lv-section-sub">
          Cover flow perspective showcase of our competitive prize pool, sponsor bounties, and open-source contributions. Scrub the gallery or let it drift.
        </p>
      </div>

      <div className="lv-bento37-wrapper">
        <Bento37CoverFlow 
          activeIndex={activeIndex} 
          onSelectIndex={setActiveIndex} 
        />

        <Bento37DetailsInspector 
          activeIndex={activeIndex} 
        />
      </div>
    </section>
  );
}
