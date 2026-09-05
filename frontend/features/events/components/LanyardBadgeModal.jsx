'use client';

import { useEffect } from 'react';

export default function LanyardBadgeModal({ event, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  return (
    <div
      className="lanyard-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="lanyard-badge-stage lanyard-swing-animation"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Long Black Vertical Lanyard Strap with Small White Infinity Symbols */}
        <div className="infinity-lanyard-strap">
          <span className="infinity-symbol">∞</span>
          <span className="infinity-symbol">∞</span>
          <span className="infinity-symbol">∞</span>
          <span className="infinity-symbol">∞</span>
          <span className="infinity-symbol">∞</span>
          <div className="lanyard-metal-clip" />
        </div>

        {/* Lanyard Event Pass Card */}
        <div className="lanyard-card-content">
          <span className="lanyard-header-chip">{event.passId}</span>
          <h2 className="lanyard-modal-title">{event.modalTitle}</h2>
          <div className="lanyard-modal-date">📅 {event.modalDate}</div>

          <div className="lanyard-modal-details">
            <div className="lanyard-detail-row">
              <span className="lanyard-detail-label">Location</span>
              <span className="lanyard-detail-val">{event.location}</span>
            </div>
            <div className="lanyard-detail-row">
              <span className="lanyard-detail-label">Time</span>
              <span className="lanyard-detail-val">{event.time}</span>
            </div>
            <div className="lanyard-detail-row">
              <span className="lanyard-detail-label">Category</span>
              <span className="lanyard-detail-val">{event.tag}</span>
            </div>
          </div>

          <div className="sponsors-container">
            <div className="sponsors-title">Official Event Partners</div>
            <div className="sponsors-chips">
              {event.sponsors.map((sponsor, idx) => (
                <span key={idx} className="sponsor-chip">
                  {sponsor}
                </span>
              ))}
            </div>
          </div>

          <button
            className="lanyard-close-btn"
            onClick={onClose}
            type="button"
          >
            CLOSE PASS [X]
          </button>
        </div>
      </div>
    </div>
  );
}
