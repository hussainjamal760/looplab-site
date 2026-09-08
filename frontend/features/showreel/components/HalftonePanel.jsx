'use client';

import { forwardRef } from 'react';

const HalftonePanel = forwardRef(function HalftonePanel(
  { image, title, clipRightPct = 100 },
  ref
) {
  const colorLayerStyle = {
    clipPath: `inset(0 ${clipRightPct}% 0 0)`,
  };

  return (
    <div ref={ref} className="halftone-panel">
      {/* Base Layer: Dot-Matrix / Halftone Monochrome Pass */}
      <div className="halftone-panel__halftone-layer">
        <img
          src={image}
          alt={title || 'Creative showcase'}
          className="halftone-panel__mono-img"
          loading="lazy"
        />
        <div className="halftone-panel__dot-overlay" />
        <div className="halftone-panel__violet-tint" />
      </div>

      {/* Top Layer: Crisp Full-Color Photo (Clipped dynamically by rAF) */}
      <div
        className="halftone-panel__color-layer"
        style={colorLayerStyle}
      >
        <img
          src={image}
          alt={title || 'Creative showcase'}
          className="halftone-panel__color-img"
          loading="lazy"
        />
      </div>
    </div>
  );
});

export default HalftonePanel;
