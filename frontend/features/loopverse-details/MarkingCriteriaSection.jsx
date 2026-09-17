'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, FileText, Zap, Globe, Tag } from 'lucide-react';
import { MODULES_DATA } from './modulesData';

export default function MarkingCriteriaSection() {
  const [activeModuleId, setActiveModuleId] = useState(1);

  const activeModule =
    MODULES_DATA.find((m) => m.id === activeModuleId) || MODULES_DATA[0];

  return (
    <section className="lv-marking-section" id="criteria">
      {/* Section Header */}
      <div className="lv-section-header">
        <span className="lv-section-tag">Evaluation Framework</span>
        <h2 className="lv-section-title">Module Criteria &amp; Deliverables</h2>
        <p className="lv-section-sub">
          Every module is calibrated with approachable briefs. Review the criteria weightings and official submission format below.
        </p>
      </div>

      {/* Module Tab Selector */}
      <div className="lv-criteria-tabs">
        {MODULES_DATA.map((m) => {
          const IconComp = m.icon;
          const isActive = m.id === activeModuleId;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveModuleId(m.id)}
              className={`lv-criteria-tab${isActive ? ' lv-criteria-tab--active' : ''}`}
            >
              <IconComp size={15} />
              <span className="lv-criteria-tab-name">{m.title}</span>
              <span className={`lv-criteria-tab-fee${isActive ? ' lv-criteria-tab-fee--active' : ''}`}>
                {m.feeFormatted}
              </span>
            </button>
          );
        })}
      </div>

      {/* Module Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModule.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="lv-criteria-card"
        >
          {/* Card Header */}
          <div className="lv-criteria-card-header">
            <div className="lv-criteria-card-badges">
              <span className="lv-criteria-module-num">Module 0{activeModule.id}</span>
              <span className="lv-criteria-fee-badge">
                <Tag size={12} /> Fee: {activeModule.feeFormatted}
              </span>
              {activeModule.isOnsiteOnly ? (
                <span className="lv-criteria-track-badge lv-criteria-track-badge--onsite">
                  <Zap size={12} /> Onsite Exclusive
                </span>
              ) : (
                <span className="lv-criteria-track-badge lv-criteria-track-badge--dual">
                  <Globe size={12} /> Dual Track (Onsite &amp; Virtual)
                </span>
              )}
            </div>
            <h3 className="lv-criteria-card-title">{activeModule.title}</h3>
            <p className="lv-criteria-card-desc">{activeModule.desc}</p>
          </div>

          {/* Criteria + Deliverables Grid */}
          <div className="lv-criteria-body-grid">
            {/* Left: Weighted Criteria */}
            <div className="lv-criteria-meter-box">
              <div className="lv-criteria-meter-header">
                <span className="lv-criteria-meter-label">
                  <Award size={17} /> Weighted Criteria Breakdown
                </span>
                <span className="lv-criteria-total-badge">100% Total</span>
              </div>

              <div className="lv-criteria-meter-list">
                {activeModule.criteria.map((c, idx) => (
                  <div key={idx} className="lv-criteria-meter-row">
                    <div className="lv-criteria-meter-info">
                      <span className="lv-criteria-row-info">
                        <span className="lv-criteria-row-num">{idx + 1}</span>
                        {c.name}
                      </span>
                      <span className="lv-criteria-weight-pill">{c.weight}%</span>
                    </div>
                    <div className="lv-criteria-bar-bg">
                      <motion.div
                        className="lv-criteria-bar-val"
                        initial={{ width: 0 }}
                        animate={{ width: `${c.weight * 3.8}%` }}
                        transition={{ duration: 0.5, delay: idx * 0.07 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Submission + Track Briefs */}
            <div className="lv-criteria-info-col">
              <div className="lv-criteria-info-box lv-criteria-info-box--submission">
                <div className="lv-criteria-info-label">
                  <FileText size={15} /> Official Submission Format
                </div>
                <p className="lv-criteria-info-text">{activeModule.submissionFormat}</p>
              </div>

              <div className="lv-criteria-info-box lv-criteria-info-box--onsite">
                <div className="lv-criteria-info-label">
                  <Zap size={14} /> Onsite Track Brief
                </div>
                <p className="lv-criteria-info-text">{activeModule.onsiteBrief}</p>
              </div>

              <div className="lv-criteria-info-box lv-criteria-info-box--virtual">
                <div className="lv-criteria-info-label">
                  <Globe size={14} /> Virtual Track Brief
                </div>
                <p className="lv-criteria-info-text">{activeModule.virtualBrief}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
