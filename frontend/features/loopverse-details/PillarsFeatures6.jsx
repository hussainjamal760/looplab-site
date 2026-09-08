'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Globe2, Scale, CheckCircle2, ArrowUpRight, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { ONSITE_PERKS, VIRTUAL_PERKS, RULES_LIST, JUDGING_CRITERIA, EXPANDED_DETAILS } from './pillarsData';

function FeatureList({ items }) {
  return (
    <ul className="lv-f6-card-list">
      {items.map((text, idx) => (
        <li key={idx}>
          <CheckCircle2 size={16} className="lv-f6-check-icon" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

function ExpandedSection({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="lv-f6-expanded-content"
    >
      <p className="lv-f6-expanded-desc">{data.desc}</p>
      <div className="lv-f6-detail-box">
        <div className="lv-f6-detail-box-title">⚡ {data.perkTitle}</div>
        <div className="lv-f6-detail-box-text">{data.perkText}</div>
      </div>
    </motion.div>
  );
}

export default function PillarsFeatures6() {
  const [expandedCard, setExpandedCard] = useState('onsite');

  const toggleCard = (cardKey) => {
    setExpandedCard((prev) => (prev === cardKey ? null : cardKey));
  };

  return (
    <section className="lv-features6-section" id="pillars">
      <div className="lv-section-header">
        <span className="lv-section-tag">Interactive Breakdown · Features 6</span>
        <h2 className="lv-section-title">Tracks, Rules & Criteria</h2>
        <p className="lv-section-sub">
          Click on any pillar below to reveal animated descriptions, logistical perks, and scoring dimensions.
        </p>
      </div>

      <div className="lv-f6-grid">
        {/* Card 1: Onsite Track */}
        <motion.div 
          layout
          className={`lv-f6-card ${expandedCard === 'onsite' ? 'lv-f6-card--expanded' : ''}`}
          onClick={() => toggleCard('onsite')}
        >
          <div className="lv-f6-blob lv-f6-blob--orange" />
          <div>
            <div className="lv-f6-card-header">
              <div className="lv-f6-icon-box"><Building2 size={26} color="#1a1a1a" /></div>
              <div className="lv-f6-hover-arrow">
                {expandedCard === 'onsite' ? <ChevronUp size={18} /> : <ArrowUpRight size={18} />}
              </div>
            </div>
            <div className="lv-f6-card-body">
              <span className="lv-f6-card-badge" style={{ background: 'var(--color-orange, #f5693c)', color: '#ffffff' }}>
                Event Day · 10 AM - 5 PM (~7 Hours)
              </span>
              <h3 className="lv-f6-card-title">Onsite Track · The Easy Way In</h3>
              <FeatureList items={ONSITE_PERKS} />

              <div className="lv-f6-expand-btn">
                <span>{expandedCard === 'onsite' ? 'Hide Details' : 'Click to View Animated Details'}</span>
                {expandedCard === 'onsite' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>

              <AnimatePresence>
                {expandedCard === 'onsite' && <ExpandedSection data={EXPANDED_DETAILS.onsite} />}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Virtual Track */}
        <motion.div 
          layout
          className={`lv-f6-card ${expandedCard === 'virtual' ? 'lv-f6-card--expanded' : ''}`}
          onClick={() => toggleCard('virtual')}
        >
          <div className="lv-f6-blob lv-f6-blob--purple" />
          <div>
            <div className="lv-f6-card-header">
              <div className="lv-f6-icon-box"><Globe2 size={26} color="#1a1a1a" /></div>
              <div className="lv-f6-hover-arrow">
                {expandedCard === 'virtual' ? <ChevronUp size={18} /> : <ArrowUpRight size={18} />}
              </div>
            </div>
            <div className="lv-f6-card-body">
              <span className="lv-f6-card-badge" style={{ background: 'var(--color-lightblue, #EAD2FF)', color: '#1a1a1a' }}>
                Day 1 (10 AM) to Day 2 (12 PM) (~26 Hours)
              </span>
              <h3 className="lv-f6-card-title">Virtual Track · The Tougher Grind</h3>
              <FeatureList items={VIRTUAL_PERKS} />

              <div className="lv-f6-expand-btn">
                <span>{expandedCard === 'virtual' ? 'Hide Details' : 'Click to View Animated Details'}</span>
                {expandedCard === 'virtual' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>

              <AnimatePresence>
                {expandedCard === 'virtual' && <ExpandedSection data={EXPANDED_DETAILS.virtual} />}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Rules & Guidelines */}
        <motion.div 
          layout
          className={`lv-f6-card ${expandedCard === 'rules' ? 'lv-f6-card--expanded' : ''}`}
          onClick={() => toggleCard('rules')}
        >
          <div className="lv-f6-blob lv-f6-blob--purple" />
          <div>
            <div className="lv-f6-card-header">
              <div className="lv-f6-icon-box"><BookOpen size={26} color="#1a1a1a" /></div>
              <div className="lv-f6-hover-arrow">
                {expandedCard === 'rules' ? <ChevronUp size={18} /> : <ArrowUpRight size={18} />}
              </div>
            </div>
            <div className="lv-f6-card-body">
              <span className="lv-f6-card-badge" style={{ background: 'var(--color-pink, #f0befa)', color: '#1a1a1a' }}>
                Before You Build
              </span>
              <h3 className="lv-f6-card-title">Rules & Guidelines</h3>
              <FeatureList items={RULES_LIST} />

              <div className="lv-f6-expand-btn">
                <span>{expandedCard === 'rules' ? 'Hide Details' : 'Click to View Animated Details'}</span>
                {expandedCard === 'rules' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>

              <AnimatePresence>
                {expandedCard === 'rules' && <ExpandedSection data={EXPANDED_DETAILS.rules} />}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Judging Criteria */}
        <motion.div 
          layout
          className={`lv-f6-card ${expandedCard === 'judging' ? 'lv-f6-card--expanded' : ''}`}
          onClick={() => toggleCard('judging')}
        >
          <div className="lv-f6-blob lv-f6-blob--cyan" />
          <div>
            <div className="lv-f6-card-header">
              <div className="lv-f6-icon-box"><Scale size={26} color="#1a1a1a" /></div>
              <div className="lv-f6-hover-arrow">
                {expandedCard === 'judging' ? <ChevronUp size={18} /> : <ArrowUpRight size={18} />}
              </div>
            </div>
            <div className="lv-f6-card-body">
              <span className="lv-f6-card-badge" style={{ background: 'var(--color-lightgreen, #e6fab9)', color: '#1a1a1a' }}>
                How Projects Are Scored
              </span>
              <h3 className="lv-f6-card-title">Judging Criteria</h3>
              <div className="lv-f6-criteria-grid">
                {JUDGING_CRITERIA.map((crit) => (
                  <div key={crit.name} className="lv-criteria-row">
                    <div className="lv-criteria-info">
                      <span>{crit.name}</span>
                      <span className="lv-criteria-pct">{crit.weight}</span>
                    </div>
                    <div className="lv-criteria-bar-bg">
                      <div className="lv-criteria-bar-val" style={{ width: `${crit.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="lv-f6-expand-btn">
                <span>{expandedCard === 'judging' ? 'Hide Details' : 'Click to View Animated Details'}</span>
                {expandedCard === 'judging' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>

              <AnimatePresence>
                {expandedCard === 'judging' && <ExpandedSection data={EXPANDED_DETAILS.judging} />}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
