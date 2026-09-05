'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { heroTiltedCards } from '@/lib/eventsData';

const DEFAULT_ITEMS = heroTiltedCards.map(({ image, name }) => ({
  image,
  title: name,
  href: '/events',
}));

function getTiles(items, columns) {
  const total = columns * 4;
  return Array.from({ length: total }, (_, index) => items[index % items.length]);
}

function DriftTile({ item, index, active, onFocus, onBlur }) {
  return (
    <a
      className={`drift-wall__tile${active === index ? ' is-active' : ''}`}
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={item.title}
      onMouseEnter={() => onFocus(index)}
      onMouseLeave={onBlur}
      onFocus={() => onFocus(index)}
      onBlur={onBlur}
    >
      <span className="drift-wall__inner">
        <img src={item.image} alt="" />
        <span className="drift-wall__overlay" />
      </span>
    </a>
  );
}

export default function DriftWall({
  items = DEFAULT_ITEMS,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  tilt = 16,
  turn = -14,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = 'up',
  lift = 64,
  dim = 0.55,
  overlayColor = '#060010',
  radius = 14,
  pauseOnHover = false,
}) {
  const wallRef = useRef(null);
  const planeRef = useRef(null);
  const [active, setActive] = useState(null);
  const safeItems = useMemo(() => items.filter((item) => item?.image), [items]);
  const tiles = useMemo(() => getTiles(safeItems, columns), [safeItems, columns]);

  useEffect(() => {
    let frame;
    let position = 0;
    let previous = performance.now();
    const step = (time) => {
      const delta = Math.min(time - previous, 40);
      previous = time;
      if (!(pauseOnHover && active !== null) && planeRef.current) {
        const isDownward = direction === 'down';
        position += (isDownward ? 1 : -1) * delta * speed / 1000;
        const offset = position % ((tileHeight + gap) * 4);
        planeRef.current.style.transform = `translate(-50%, -50%) rotateX(${tilt}deg) rotateZ(${turn}deg) translate3d(0, ${offset}px, ${depth}px)`;
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, direction, depth, gap, pauseOnHover, speed, tilt, tileHeight, turn]);

  const style = {
    '--dw-perspective': `${perspective}px`,
    '--dw-tile-w': `${tileWidth}px`,
    '--dw-tile-h': `${tileHeight}px`,
    '--dw-gap': `${gap}px`,
    '--dw-radius': `${radius}px`,
    '--dw-lift': `${lift}px`,
    '--dw-dim': dim,
    '--dw-overlay': overlayColor,
    '--dw-columns': columns,
  };

  return (
    <div ref={wallRef} className="drift-wall" style={style} aria-label="Event highlights">
      <div ref={planeRef} className="drift-wall__plane">
        {Array.from({ length: columns }, (_, column) => (
          <div className="drift-wall__col" key={column}>
            <div className="drift-wall__track">
              {tiles.slice(column * 4, column * 4 + 4).map((item, index) => (
                <DriftTile key={`${column}-${index}-${item.title}`} item={item} index={`${column}-${index}`} active={active} onFocus={setActive} onBlur={() => setActive(null)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
