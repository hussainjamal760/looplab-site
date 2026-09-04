'use client';

const faceClasses = [
  'cube-face-front',
  'cube-face-right',
  'cube-face-back',
  'cube-face-left'
];

export default function CubeFace({ face, faceIndex }) {
  const positionClass = faceClasses[faceIndex] || 'cube-face-front';

  return (
    <div className={`cube-face ${positionClass}`}>
      <div className="face-image-wrap">
        <span
          className="face-badge"
          style={{ backgroundColor: face.bgColor, color: face.textColor }}
        >
          {face.badge}
        </span>
        <img
          src={face.image}
          alt={face.title}
          className="face-image"
          loading="lazy"
        />
      </div>
      <div className="face-info">
        <span className="face-subtitle">{face.subtitle} • {face.date}</span>
        <h4 className="face-title">{face.title}</h4>
      </div>
    </div>
  );
}
