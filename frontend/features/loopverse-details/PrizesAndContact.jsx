'use client';

import { Trophy, Mail, Phone, User, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const PRIZES_LIST = [
  { category: 'Onsite Champion, per module (×7)', reward: 'To Be Confirmed + Official Trophy & Swag', badge: 'Onsite', color: 'orange' },
  { category: 'Virtual Champion, per module (×5)', reward: 'To Be Confirmed + Official Trophy & Swag', badge: 'Virtual', color: 'purple' },
  { category: 'Best Overall, Onsite Track', reward: 'To Be Confirmed + Grand Champion Award', badge: 'Grand', color: 'orange' },
  { category: 'Best Overall, Virtual Track', reward: 'To Be Confirmed + Grand Champion Award', badge: 'Grand', color: 'purple' },
  { category: 'Best Beginner Team', reward: 'To Be Confirmed + Rising Star Recognition', badge: 'Special', color: 'green' },
  { category: 'All Finalists', reward: 'Official LoopLab Certificates & Swag Pack', badge: 'Finalists', color: 'pink' },
];

export default function PrizesAndContact() {
  return (
    <section className="lv-prizes-contact-section" id="prizes">
      {/* Section Header */}
      <div className="lv-section-header">
        <span className="lv-section-tag">Honors &amp; Inquiries</span>
        <h2 className="lv-section-title">Prizes &amp; Official Contact</h2>
        <p className="lv-section-sub">
          Track-specific awards, sponsor prize pools, finalist certificates, and direct leadership support.
        </p>
      </div>

      <div className="lv-prizes-grid">
        {/* Left: Prize Table */}
        <div className="lv-prize-table-card">
          <div className="lv-prize-table-header">
            <div className="lv-prize-icon-box">
              <Trophy size={22} />
            </div>
            <div>
              <h3 className="lv-prize-table-title">Prizes &amp; Recognition Pool</h3>
              <p className="lv-prize-table-sub">Awarded separately for Onsite and Virtual tracks</p>
            </div>
          </div>

          <div className="lv-prize-rows">
            {PRIZES_LIST.map((item, idx) => (
              <div key={idx} className="lv-prize-row">
                <div className="lv-prize-row-left">
                  <span className={`lv-prize-row-badge lv-prize-row-badge--${item.color}`}>{item.badge}</span>
                  <span className="lv-prize-row-category">{item.category}</span>
                </div>
                <span className="lv-prize-row-reward">{item.reward}</span>
              </div>
            ))}
          </div>

          <div className="lv-prize-notice">
            💡 <strong>Prize Announcement:</strong> Exact prize amounts are being finalized alongside sponsor partnerships and will be revealed ahead of registration closing.
          </div>
        </div>

        {/* Right: Contact Card */}
        <div className="lv-contact-card">
          <div>
            <div className="lv-contact-date-badge">
              <Calendar size={13} />
              <span>Event Date: Friday, 9 October 2026</span>
            </div>
            <h3 className="lv-contact-card-title">Registration &amp; Questions</h3>
            <p className="lv-contact-card-sub">
              Open to students and early-career developers, designers, and product builders — no prior experience needed.
            </p>

            <div className="lv-contact-items">
              <div className="lv-contact-row">
                <div className="lv-contact-row-icon lv-contact-row-icon--amber">
                  <User size={18} />
                </div>
                <div>
                  <div className="lv-contact-lbl">President, LoopLab</div>
                  <div className="lv-contact-val">Muhammad Qasim Ali Tareen</div>
                </div>
              </div>

              <div className="lv-contact-row">
                <div className="lv-contact-row-icon lv-contact-row-icon--orange">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="lv-contact-lbl">Direct Phone</div>
                  <a href="tel:03334093999" className="lv-contact-val lv-contact-val--link">0333 4093999</a>
                </div>
              </div>

              <div className="lv-contact-row">
                <div className="lv-contact-row-icon lv-contact-row-icon--purple">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="lv-contact-lbl">Official Inquiries Email</div>
                  <a href="mailto:qk04504@gmail.com" className="lv-contact-val lv-contact-val--link">qk04504@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="lv-contact-cta-wrap">
            <Link href="/loopverse/register" className="lv-register-btn">
              <Sparkles size={18} />
              <span>Register Now for LoopVerse 3.0</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
