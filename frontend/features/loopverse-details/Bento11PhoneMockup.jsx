'use client';

import { useState } from 'react';
import { 
  Trophy, GitPullRequest, Sparkles, Award, 
  Coins, Terminal, ShieldCheck, CheckCircle2 
} from 'lucide-react';

const STREAM_ITEMS = [
  {
    id: 'grand',
    category: 'prizes',
    tag: 'GRAND CHAMPION',
    title: 'Grand Champion Trophy & Cash Bounty',
    meta: 'Overall 1st Place • All Tracks',
    status: 'POOLED',
    statusColor: '#9E00FE',
    accentBg: '#f0befa',
    icon: Trophy,
    perk: 'Incubator fast-track + exclusive bespoke hardware kit'
  },
  {
    id: 'onsite-mods',
    category: 'prizes',
    tag: '7x MODULE WINNERS',
    title: '7 Onsite Division Trophies + Cash',
    meta: 'Lahore Onsite • Web, App, AI, Cyber, Game, Cloud, IoT',
    status: 'ACTIVE',
    statusColor: '#f5693c',
    accentBg: '#ffe3d9',
    icon: Award,
    perk: '1st place trophy per module + direct hiring interviews'
  },
  {
    id: 'os-pr-1',
    category: 'opensource',
    tag: 'OPEN SOURCE PR #142',
    title: 'Verified Core Library Contribution',
    meta: 'Merged into @looplab/sdk • By @hacker_dev',
    status: 'VERIFIED',
    statusColor: '#29725f',
    accentBg: '#d4f4eb',
    icon: GitPullRequest,
    perk: 'Micro-grant allocation + Hall of Fame spotlight'
  },
  {
    id: 'virtual-mod',
    category: 'prizes',
    tag: '5x VIRTUAL TRACK',
    title: 'Remote Innovation Trophies & Grants',
    meta: 'Global Remote Track • 5 Divisions',
    status: 'ACTIVE',
    statusColor: '#29725f',
    accentBg: '#d4f4eb',
    icon: Sparkles,
    perk: 'Worldwide swag pack shipped + digital credentials'
  },
  {
    id: 'cloud-bounty',
    category: 'bounties',
    tag: 'SPONSOR CHALLENGE',
    title: '$2,500 Cloud API & Infra Bounty',
    meta: 'Best integration of sponsor microservices',
    status: 'CLAIMABLE',
    statusColor: '#9E00FE',
    accentBg: '#EAD2FF',
    icon: Coins,
    perk: 'Direct partner review + cloud infrastructure credits'
  },
  {
    id: 'rising-star',
    category: 'prizes',
    tag: 'NEW BUILDERS',
    title: 'Rising Star 1-on-1 Mentorship',
    meta: 'Dedicated to freshman and junior builders',
    status: 'UNLOCKED',
    statusColor: '#a0325a',
    accentBg: '#fce7f0',
    icon: Terminal,
    perk: '3 months senior engineering guidance + dev tool bundle'
  },
  {
    id: 'all-certs',
    category: 'contributions',
    tag: 'ALL BUILDERS',
    title: 'Cryptographic Certificate & Collector Swag',
    meta: 'Awarded to every verified finalist squad',
    status: 'GUARANTEED',
    statusColor: '#1a1a1a',
    accentBg: '#f0ebe6',
    icon: ShieldCheck,
    perk: 'Lifetime private builder Discord pass + sticker sheet'
  }
];

export default function Bento11PhoneMockup({ selectedId, onSelect }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = STREAM_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="lv-phone-mockup">
      {/* Phone Bezel Top & Dynamic Island */}
      <div className="lv-phone-speaker-notch">
        <div className="lv-phone-camera-dot" />
        <div className="lv-phone-dynamic-pill">
          <span className="lv-live-pulse-dot" />
          <span className="lv-pill-text">LIVE REWARDS STREAM</span>
        </div>
      </div>

      {/* Internal Phone Viewport */}
      <div className="lv-phone-screen">
        <div className="lv-phone-header">
          <div className="lv-phone-header-titles">
            <span className="lv-phone-sub">DEPLOYMENTS & BOUNTIES</span>
            <h4 className="lv-phone-title">Prizes & Contributions</h4>
          </div>
          <span className="lv-phone-count-pill">{filteredItems.length} Live</span>
        </div>

        {/* Filter Pills inside Mockup */}
        <div className="lv-phone-filters">
          {['all', 'prizes', 'bounties', 'opensource'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={`lv-phone-filter-btn ${activeFilter === f ? 'active' : ''}`}
            >
              {f === 'all' ? 'All' : f === 'opensource' ? 'Open Source' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Streaming List with Hover Highlighted Rows */}
        <div className="lv-phone-stream-list">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className={`lv-phone-stream-row ${isSelected ? 'lv-phone-stream-row--active' : ''}`}
              >
                <div
                  className="lv-phone-row-icon"
                  style={{ backgroundColor: item.accentBg, color: item.statusColor }}
                >
                  <Icon size={16} />
                </div>
                <div className="lv-phone-row-content">
                  <div className="lv-phone-row-meta">
                    <span className="lv-phone-row-tag">{item.tag}</span>
                    <span
                      className="lv-phone-row-badge"
                      style={{ color: item.statusColor, borderColor: item.statusColor }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h5 className="lv-phone-row-title">{item.title}</h5>
                  <p className="lv-phone-row-desc">{item.meta}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Phone Bottom Home Bar */}
        <div className="lv-phone-bottom-bar">
          <div className="lv-phone-home-indicator" />
        </div>
      </div>
    </div>
  );
}
