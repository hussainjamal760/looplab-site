'use client';

import { useState } from 'react';
import { Trophy, GitPullRequest, Sparkles, CheckCircle2, ArrowUpRight, Gift, Layers } from 'lucide-react';
import Bento11PhoneMockup from './Bento11PhoneMockup';

const DEFAULT_SELECTION = {
  id: 'grand',
  tag: 'GRAND CHAMPION',
  title: 'Grand Champion Trophy & Cash Bounty',
  meta: 'Overall 1st Place • All Tracks',
  status: 'POOLED',
  statusColor: '#9E00FE',
  accentBg: '#f0befa',
  perk: 'Incubator fast-track + exclusive bespoke hardware kit'
};

export default function Bento11Prizes() {
  const [selectedItem, setSelectedItem] = useState(DEFAULT_SELECTION);

  return (
    <section className="lv-bento11-section">
      <div className="lv-section-header">
        <span className="lv-section-tag" style={{ background: '#f0befa' }}>
          <Sparkles size={14} /> ReactBits Bento 11 Block
        </span>
        <h2 className="lv-section-title">Prize Vault &amp; Contributions</h2>
        <p className="lv-section-subtitle">
          Stream real-time bounties, trophies, open-source pull requests, and community grants
          designed to reward extraordinary execution across all tracks.
        </p>
      </div>

      <div className="lv-bento11-grid">
        {/* Bento Col 1: Phone Mockup with Streaming Deployments & Bounties */}
        <div className="lv-bento11-card lv-bento11-phone-card">
          <div className="lv-bento11-card-label">
            <span className="lv-live-indicator" /> Live Stream Deployment Feed
          </div>
          <Bento11PhoneMockup
            selectedId={selectedItem.id}
            onSelect={(item) => setSelectedItem(item)}
          />
        </div>

        {/* Bento Col 2: Side Cards */}
        <div className="lv-bento11-side-col">
          {/* Card A: Grand Trophy & Champion Honors */}
          <div className="lv-bento11-card lv-bento11-trophy-card">
            <div className="lv-trophy-card-badge">
              <Trophy size={16} /> GRAND HONORS
            </div>
            <h3 className="lv-trophy-title">12+ Total Champions Crowned</h3>
            <p className="lv-trophy-desc">
              1 Grand Champion across all tracks, 7 Onsite Module Champions in Lahore,
              and 5 Virtual Track Module Innovators worldwide.
            </p>
            <div className="lv-trophy-stats-row">
              <div className="lv-stat-chip">
                <span className="lv-stat-num">1</span>
                <span className="lv-stat-label">Grand Trophy</span>
              </div>
              <div className="lv-stat-chip">
                <span className="lv-stat-num">7</span>
                <span className="lv-stat-label">Onsite Cups</span>
              </div>
              <div className="lv-stat-chip">
                <span className="lv-stat-num">5</span>
                <span className="lv-stat-label">Virtual Awards</span>
              </div>
            </div>
          </div>

          {/* Card B: Open Source & Community Contribution Pool */}
          <div className="lv-bento11-card lv-bento11-os-card">
            <div className="lv-os-card-badge">
              <GitPullRequest size={16} /> ECOSYSTEM CONTRIBUTORS
            </div>
            <h3 className="lv-os-title">Open Source Grants &amp; Bounties</h3>
            <p className="lv-os-desc">
              Not building a full product? Contribute reusable libraries, smart integrations,
              or developer tooling to claim direct open-source micro-grants and Hall of Fame recognition.
            </p>
            <div className="lv-os-perks-list">
              <div className="lv-os-perk-item">
                <CheckCircle2 size={16} className="text-[#29725f] shrink-0" />
                <span>Verified Contributor Badge on LoopLab Registry</span>
              </div>
              <div className="lv-os-perk-item">
                <CheckCircle2 size={16} className="text-[#29725f] shrink-0" />
                <span>$2,500+ Cloud Infrastructure &amp; API Bounty Pool</span>
              </div>
              <div className="lv-os-perk-item">
                <CheckCircle2 size={16} className="text-[#29725f] shrink-0" />
                <span>Direct 1-on-1 fast-track interviews with partners</span>
              </div>
            </div>
          </div>

          {/* Card C: Dynamic Inspector of Selected Item */}
          <div className="lv-bento11-card lv-bento11-inspector-card">
            <div className="lv-inspector-top">
              <div className="lv-inspector-tag" style={{ background: selectedItem.accentBg }}>
                {selectedItem.tag}
              </div>
              <span className="lv-inspector-status">{selectedItem.status}</span>
            </div>
            <h4 className="lv-inspector-title">{selectedItem.title}</h4>
            <p className="lv-inspector-meta">{selectedItem.meta}</p>
            <div className="lv-inspector-perk-box">
              <Gift size={16} className="shrink-0 text-[#9E00FE]" />
              <span>{selectedItem.perk}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
