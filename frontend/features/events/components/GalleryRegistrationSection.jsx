'use client';

import Link from 'next/link';

export default function GalleryRegistrationSection() {
  return (
    <section className="gallery-registration-section">
      <h2 className="gallery-title-black">Gallery</h2>

      <div className="gallery-sub-script-wrap">
        <span className="eye-doodle">👁️</span>
        <span className="script-sub-text">Registrations Open</span>
        <span className="puzzle-doodle">🧩</span>
      </div>

      <div className="large-outlined-card">
        <Link href="/gallery" className="black-pill-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
          View Gallery
        </Link>
      </div>

      <div className="gallery-bottom-row">
        <div>
          <a href="#" className="pantry-link">Pantry</a>
          <div style={{ fontSize: '12px', color: '#777777', marginTop: '2px' }}>
            Fake need calls theme
          </div>
        </div>

        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="next-link">
          <span>Next →</span>
          <span>📘</span>
        </a>
      </div>
    </section>
  );
}
