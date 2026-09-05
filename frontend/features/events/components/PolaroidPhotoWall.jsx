'use client';

import PolaroidCard from './PolaroidCard';

export default function PolaroidPhotoWall({ photos }) {
  return (
    <section className="polaroid-wall-section">
      <span className="section-header-tag">SNAPSHOT ARCHIVE</span>
      <h2 className="gallery-section-title">COMMUNITY PHOTO WALL</h2>
      <p className="gallery-section-sub">
        Hover over photos to un-tilt, lift up, and examine physical snapshots from loopverse 2.0, skillup bootcamps, and ambassador meetups.
      </p>

      <div className="polaroid-grid">
        {photos.map((photo) => (
          <PolaroidCard key={photo.id} photo={photo} />
        ))}
      </div>
    </section>
  );
}
