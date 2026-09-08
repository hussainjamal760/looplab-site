'use client';

import { Trophy, Mail, Phone, User, ExternalLink, Sparkles } from 'lucide-react';

const PRIZES_LIST = [
  { track: 'Onsite Champion, per module (×7)', reward: 'Trophy + Cash Prize + Swag' },
  { track: 'Virtual Champion, per module (×5)', reward: 'Award + Cash Prize + Swag' },
  { track: 'Best Overall, Onsite Track', reward: 'Grand Trophy + Winner Pool' },
  { track: 'Best Overall, Virtual Track', reward: 'Virtual Grand Champion Prize' },
  { track: 'Best Beginner Team', reward: 'Rising Star Award + Goodies' },
  { track: 'All Finalists', reward: 'Official LoopLab Certificates & Swag' },
];

export default function PrizesAndContact() {
  return (
    <section className="lv-prizes-contact-section" id="prizes">
      <div className="lv-section-header">
        <span className="lv-section-tag">Recognition For Every Builder</span>
        <h2 className="lv-section-title">Prizes & Registration</h2>
        <p className="lv-section-sub">
          Celebrate your hard work with track-specific prizes, certificates, and community recognition.
        </p>
      </div>

      <div className="lv-prizes-grid">
        {/* Left: Prize Breakdown */}
        <div className="lv-prize-table-card">
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1a1a1a', marginBottom: 20, fontFamily: 'Epilogue, sans-serif' }}>
            Recognition Pool
          </h3>
          <table className="lv-timeline-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Recognition</th>
              </tr>
            </thead>
            <tbody>
              {PRIZES_LIST.map((item, idx) => (
                <tr key={idx}>
                  <td className="lv-time-cell">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <Trophy size={16} color="#9E00FE" />
                      {item.track}
                    </span>
                  </td>
                  <td className="lv-activity-cell" style={{ color: '#1a1a1a', fontWeight: 700 }}>
                    {item.reward}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: 18, fontSize: '0.88rem', color: '#666666', lineHeight: 1.5, fontWeight: 500 }}>
            * Final cash prize values are being finalized alongside sponsor partnerships and will be revealed ahead of registration closing.
          </p>
        </div>

        {/* Right: Registration & Contact */}
        <div className="lv-contact-card">
          <div>
            <span className="lv-section-tag">Getting In</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1a1a1a', margin: '8px 0 16px', fontFamily: 'Epilogue, sans-serif' }}>
              Registration & Contact
            </h3>
            
            <div className="lv-contact-item">
              <div className="lv-contact-lbl">Eligibility</div>
              <div className="lv-contact-val" style={{ fontSize: '0.96rem', fontWeight: 500, color: '#333333' }}>
                Open to students and early-career developers, designers, and product builders. Teams of 2–4 or solo.
              </div>
            </div>

            <div className="lv-contact-item">
              <div className="lv-contact-lbl">Email Inquiries</div>
              <div className="lv-contact-val">
                <a href="mailto:qk04504@gmail.com" style={{ color: '#1a1a1a', textDecoration: 'none' }}>
                  qk04504@gmail.com
                </a>
              </div>
            </div>

            <div className="lv-contact-item">
              <div className="lv-contact-lbl">President, LoopLab</div>
              <div className="lv-contact-val">
                Muhammad Qasim Ali Tareen
              </div>
            </div>

            <div className="lv-contact-item">
              <div className="lv-contact-lbl">Direct Phone</div>
              <div className="lv-contact-val">
                <a href="tel:03334093999" style={{ color: '#1a1a1a', textDecoration: 'none' }}>
                  0333 4093999
                </a>
              </div>
            </div>
          </div>

          <a 
            href="https://forms.google.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="lv-register-btn"
          >
            <Sparkles size={18} />
            <span>Register Now for LoopVerse 3.0</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
