'use client';

import { useState } from 'react';
import { galleryCollections } from '@/lib/eventsData';

export default function GaleryPhotoGrid({ photos = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Use dynamic active collection if pagination is clicked, defaulting to photos prop or 1st collection
  const activePhotos = (galleryCollections && galleryCollections[activeIdx])
    ? galleryCollections[activeIdx]
    : (photos.length > 0 ? photos : []);

  return (
    <section className="galery-photo-section">
      <h2 className="galery-quirky-header">GALERY ✨</h2>

      {/* Pagination Dash Indicator (Clickable 5 tabs) */}
      <div className="dash-pagination-bar" style={{ marginTop: '4px' }}>
        {galleryCollections.map((_, idx) => (
          <div
            key={idx}
            className={`dash-pill ${activeIdx === idx ? 'active' : ''}`}
            onClick={() => setActiveIdx(idx)}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
          />
        ))}
      </div>

      {/* Scattered Tilted Polaroid Grid */}
      <div className="galery-photo-grid">
        {activePhotos.map((photo) => (
          <div
            key={photo.id}
            className="galery-polaroid"
            style={{ transform: `rotate(${photo.rotation ?? photo.tilt ?? 0}deg)` }}
          >
            <div className="galery-img-wrap">
              <span className="galery-tag-badge">{photo.tag}</span>
              <img src={photo.image} alt={photo.caption || photo.tag} className="galery-img" loading="lazy" />
            </div>
            <div className="galery-caption">{photo.caption || photo.tag}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
