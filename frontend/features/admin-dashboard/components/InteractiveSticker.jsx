'use client';

import { motion } from 'framer-motion';

/**
 * InteractiveSticker component
 * Renders an authentic Looplab SVG sticker with Donezo/Looplab playfulness:
 * - Spring entrance animation
 * - Interactive hover wiggle/scale
 * - Optional draggable inertia physics
 */
export default function InteractiveSticker({
  src,
  alt = 'Looplab sticker',
  size = 48,
  rotate = 0,
  top,
  bottom,
  left,
  right,
  badgeText,
  badgeBg = 'var(--color-pink)',
  badgeColor = '#000000',
  className = '',
  draggable = false,
}) {
  return (
    <motion.div
      drag={draggable}
      dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.15, zIndex: 50 }}
      initial={{ scale: 0, rotate: rotate - 15, opacity: 0 }}
      animate={{ scale: 1, rotate: rotate, opacity: 1 }}
      whileHover={{
        scale: 1.12,
        rotate: [rotate, rotate - 6, rotate + 6, rotate],
        transition: { duration: 0.35, ease: 'easeInOut' },
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 18,
      }}
      className={`db-sticker-wrap ${className}`}
      style={{
        position: 'absolute',
        top,
        bottom,
        left,
        right,
        width: size,
        height: size,
        zIndex: 12,
        cursor: draggable ? 'grab' : 'pointer',
        filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.08))',
        userSelect: 'none',
      }}
    >
      {badgeText ? (
        <span
          className="admin-badge-sticker"
          style={{
            background: badgeBg,
            color: badgeColor,
            fontSize: '0.65rem',
            padding: '2px 8px',
            whiteSpace: 'nowrap',
            boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)',
          }}
        >
          {badgeText}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
}
