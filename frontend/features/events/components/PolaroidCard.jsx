'use client';

export default function PolaroidCard({ photo }) {
  const tiltStyle = {
    transform: `rotate(${photo.rotation}deg)`
  };

  return (
    <div className="polaroid-card" style={tiltStyle}>
      <div className="pushpin" aria-hidden="true" />
      <div className="polaroid-img-wrap">
        <span
          className="polaroid-badge"
          style={{ backgroundColor: photo.badgeColor }}
        >
          {photo.badgeText}
        </span>
        <img
          src={photo.image}
          alt={photo.caption}
          className="polaroid-img"
          loading="lazy"
        />
      </div>
      <div className="polaroid-caption">{photo.caption}</div>
    </div>
  );
}
