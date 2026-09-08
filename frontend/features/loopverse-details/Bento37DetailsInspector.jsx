'use client';

import { Trophy, CheckCircle2, Sparkles, ExternalLink, Mail, Phone, User } from 'lucide-react';
import { PRIZES_CONTRIBUTIONS_DATA } from './prizesData';

export default function Bento37DetailsInspector({ activeIndex }) {
  const current = PRIZES_CONTRIBUTIONS_DATA[activeIndex] || PRIZES_CONTRIBUTIONS_DATA[0];

  return (
    <div className="lv-bento37-bottom-grid">
      <div 
        className="lv-bento37-detail-card"
        style={{ borderTop: `6px solid ${current.accentColor}` }}
      >
        <div className="lv-bento37-detail-header">
          <div>
            <span className="lv-bento37-detail-badge" style={{ backgroundColor: current.accentColor }}>
              {current.badge}
            </span>
            <h3 className="lv-bento37-detail-title">{current.title}</h3>
            <p className="lv-bento37-detail-sub">{current.category}</p>
          </div>
          <div className="lv-bento37-detail-iconbox" style={{ background: current.accentBg }}>
            <Trophy size={32} color={current.accentColor} />
          </div>
        </div>

        <div className="lv-bento37-criteria-box" style={{ borderLeftColor: current.accentColor }}>
          <span className="lv-bento37-crit-label">Evaluation Focus:</span>
          <span className="lv-bento37-crit-val">{current.criteria}</span>
        </div>

        <div className="lv-bento37-perks-list">
          <h4 className="lv-bento37-perks-title">What Winners & Contributors Receive:</h4>
          <ul>
            {current.perks.map((perk, i) => (
              <li key={i}>
                <CheckCircle2 
                  size={18} 
                  color={current.accentColor === '#1a1a1a' ? '#e6fab9' : current.accentColor} 
                  className="shrink-0" 
                />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lv-bento37-action-card">
        <div>
          <span className="lv-section-tag" style={{ background: '#e6fab9' }}>
            Getting Involved
          </span>
          <h3 className="lv-bento37-action-title">Registration & Inquiries</h3>
          
          <div className="lv-contact-item">
            <div className="lv-contact-lbl">Eligibility & Squads</div>
            <div className="lv-contact-val" style={{ fontSize: '0.92rem', fontWeight: 500 }}>
              Open to students, researchers, and professional builders. Teams of 2-4 or solo hackers.
            </div>
          </div>

          <div className="lv-contact-item">
            <div className="lv-contact-lbl">LoopLab President</div>
            <div className="lv-contact-val" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <User size={15} color="#9E00FE" />
              <span>Muhammad Qasim Ali Tareen</span>
            </div>
          </div>

          <div className="lv-contact-item">
            <div className="lv-contact-lbl">Official Inquiries & Phone</div>
            <div className="lv-contact-val" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a href="mailto:qk04504@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#1a1a1a', textDecoration: 'none', fontWeight: 700 }}>
                <Mail size={14} /> qk04504@gmail.com
              </a>
              <a href="tel:03334093999" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#1a1a1a', textDecoration: 'none', fontWeight: 700 }}>
                <Phone size={14} /> 0333 4093999
              </a>
            </div>
          </div>
        </div>

        <a
          href="https://forms.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="lv-register-btn"
          style={{ marginTop: 16 }}
        >
          <Sparkles size={18} />
          <span>Register Team for LoopVerse 3.0</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
