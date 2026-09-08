'use client';

import { useState } from 'react';
import { Sparkles, Trophy, Table as TableIcon, LayoutGrid, Megaphone, Info } from 'lucide-react';
import { PRIZES_STRUCTURE_DATA, PRIZES_FOOTNOTE } from './prizesStructureData';
import PrizeCardItem from './PrizeCardItem';

export default function PrizesRecognitionSection() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  return (
    <section className="lv-prizes-recognition-section">
      {/* 1. Official Document Section Header */}
      <div className="lv-section-header">
        <div className="lv-doc-badge-row">
          <span className="lv-doc-number-badge">07 · PRIZES</span>
          <span className="lv-doc-org-tag">LOOPLAB · LOOPVERSE 3.0</span>
        </div>
        <p className="lv-doc-subheading">RECOGNITION FOR EVERY BUILDER</p>
        <h2 className="lv-section-title">Prizes &amp; Recognition</h2>
        <p className="lv-section-subtitle">
          Exact prize amounts are being finalized alongside our sponsor partnerships and will be
          announced ahead of registration closing. Here is how recognition is structured across LoopVerse 3.0.
        </p>

        {/* View Switcher Toggle */}
        <div className="lv-prizes-view-toggle">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`lv-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
          >
            <LayoutGrid size={15} /> Animated Graphics Cards
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`lv-view-btn ${viewMode === 'table' ? 'active' : ''}`}
          >
            <TableIcon size={15} /> Document Table View
          </button>
        </div>
      </div>

      {/* 2. Grid View: Creative Animated Winner Cards */}
      {viewMode === 'grid' ? (
        <div className="lv-prizes-cards-grid">
          {PRIZES_STRUCTURE_DATA.map((item) => (
            <PrizeCardItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        /* 3. Official Table View: Clean Structured Table */
        <div className="lv-prizes-table-wrapper">
          <table className="lv-prizes-official-table">
            <thead>
              <tr>
                <th className="lv-table-th-track">Track</th>
                <th className="lv-table-th-pool">Prize Pool</th>
              </tr>
            </thead>
            <tbody>
              {PRIZES_STRUCTURE_DATA.map((item) => (
                <tr key={item.id} className="lv-table-tr">
                  <td className="lv-table-td-track">
                    <div className="lv-table-track-cell">
                      <span className="lv-table-track-name">{item.title}</span>
                      <span
                        className="lv-table-track-chip"
                        style={{ backgroundColor: item.badgeBg, color: item.badgeColor }}
                      >
                        {item.badge}
                      </span>
                    </div>
                  </td>
                  <td className="lv-table-td-pool">
                    <span className={`lv-table-pool-pill ${item.poolStatus === 'To Be Confirmed' ? 'tbc' : 'confirmed'}`}>
                      {item.poolStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. Official Sponsor Partnership Notice Callout */}
      <div className="lv-prizes-notice-card">
        <div className="lv-notice-icon-box">
          <Megaphone size={22} className="text-[#9E00FE] lv-megaphone-anim" />
        </div>
        <div className="lv-notice-content">
          <h4 className="lv-notice-title">Sponsor Finalization &amp; Track Exclusivity Note</h4>
          <p className="lv-notice-p">{PRIZES_FOOTNOTE.onsiteExclusiveNote}</p>
          <p className="lv-notice-p lv-notice-p--highlight">
            <Info size={15} className="inline mr-1 shrink-0 text-[#f5693c]" />
            {PRIZES_FOOTNOTE.announcementNote}
          </p>
        </div>
      </div>
    </section>
  );
}
