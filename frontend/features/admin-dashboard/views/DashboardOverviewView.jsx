'use client';

import { motion } from 'framer-motion';
import { Plus, ArrowUpRight, UploadCloud, Sparkles } from 'lucide-react';
import CapsuleAnalyticsChart from '../components/CapsuleAnalyticsChart';
import QuickNotesActivityWidget from '../components/QuickNotesActivityWidget';
import EventCohortsWidget from '../components/EventCohortsWidget';
import CandidateQueueWidget from '../components/CandidateQueueWidget';
import ProjectProgressGauge from '../components/ProjectProgressGauge';
import TimeTrackerCard from '../components/TimeTrackerCard';
import InteractiveSticker from '../components/InteractiveSticker';

const KPIS = [
  { title: 'Total Members', val: '1,420', badge: '↑ 12% vs last month', featured: true, sticker: '/assets/Footer-Sticker SVG/footer-sticker-100.svg', rotate: 12 },
  { title: 'Selected Candidates', val: '348', badge: '↑ 8% vs last month', featured: false, sticker: '/assets/HorizontalWords SVG/horizontal-words-sticker-thumps-up.svg', rotate: -8 },
  { title: 'Payment Successful', val: '295', badge: '↑ 15% vs last month', featured: false, sticker: '/assets/Card-Sticker SVG/sticker-heart.svg', rotate: 10 },
  { title: 'Payment Pending', val: '53', badge: '⏳ Awaiting verification', featured: false, badgeLabel: 'needs review' },
];

export default function DashboardOverviewView() {
  return (
    <div style={{ position: 'relative' }}>
      {/* ── Header Row ── */}
      <div className="db-header-row" style={{ position: 'relative' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <h1 className="db-header-title">Dashboard Overview</h1>
            <span
              className="admin-badge-sticker"
              style={{
                background: 'var(--color-lightgreen)',
                color: '#1a1a1a',
                fontSize: '0.62rem',
                padding: '2px 8px',
                transform: 'rotate(3deg)',
                margin: 0,
              }}
            >
              live operations
            </span>
          </div>
          <p className="db-header-subtitle">Plan, prioritize, and manage registrations and payments with ease.</p>
        </div>

        <div className="db-header-actions" style={{ position: 'relative' }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} type="button" className="db-btn-purple-pill">
            <Plus size={16} />
            <span>Add Event</span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} type="button" className="db-btn-white-pill">
            <UploadCloud size={15} />
            <span>Export Data</span>
          </motion.button>
        </div>
      </div>

      {/* ── 4 Animated KPI Cards (Core Metrics) ── */}
      <div className="db-kpis-4grid">
        {KPIS.map((k, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            transition={{ delay: idx * 0.06, type: 'spring', stiffness: 220, damping: 18 }}
            style={{ position: 'relative', overflow: 'visible' }}
            className={`db-kpi-card ${k.featured ? 'db-kpi-card--featured' : ''}`}
          >
            {k.sticker && (
              <InteractiveSticker
                src={k.sticker}
                size={34}
                rotate={k.rotate || 0}
                top="-12px"
                right="-8px"
                draggable
              />
            )}
            {k.badgeLabel && (
              <InteractiveSticker
                badgeText={k.badgeLabel}
                badgeBg="var(--color-pink)"
                badgeColor="#000"
                top="-12px"
                right="-6px"
                rotate={-6}
              />
            )}
            <div className="db-kpi-card__top">
              <span className="db-kpi-card__title">{k.title}</span>
              <div className="db-kpi-card__arrow">
                <ArrowUpRight size={15} />
              </div>
            </div>

            <div className="db-kpi-card__val">{k.val}</div>

            <div className="db-kpi-card__footer">
              <span>{k.badge}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Middle Row (Capsule Chart + Quick Notes + Event Cohorts) ── */}
      <div className="db-middle-3grid">
        <CapsuleAnalyticsChart />
        <QuickNotesActivityWidget />
        <EventCohortsWidget />
      </div>

      {/* ── Bottom Row (Candidate Queue + Payment Progress Gauge + Time Tracker) ── */}
      <div className="db-bottom-3grid">
        <CandidateQueueWidget />
        <ProjectProgressGauge />
        <TimeTrackerCard />
      </div>
    </div>
  );
}
