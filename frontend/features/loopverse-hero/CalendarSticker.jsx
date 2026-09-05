'use client';

import { useCallback, useState } from 'react';

const CALENDAR_DATES = Array.from({ length: 21 }, (_, i) => String(i + 1));
const FESTIVAL_DATES = new Set(['19', '20', '21']);

function CalendarGrid({ page }) {
  return (
    <span className={`loopverse-calendar__grid loopverse-calendar__grid--${page}`}>
      {CALENDAR_DATES.map((date) => (
        <span
          key={`${page}-${date}`}
          className={FESTIVAL_DATES.has(date) ? 'is-range' : undefined}
        >
          {date}
        </span>
      ))}
    </span>
  );
}

function RangeCircle() {
  return (
    <svg className="loopverse-calendar__range" viewBox="0 0 100 36" aria-hidden="true">
      <ellipse cx="74" cy="20" rx="24" ry="13" pathLength="1" />
    </svg>
  );
}

export function CalendarSticker({ onActivate }) {
  const [isZoomed, setIsZoomed] = useState(false);

  const triggerSequence = useCallback(() => {
    setIsZoomed((current) => {
      const next = !current;
      if (next) onActivate?.();
      return next;
    });
  }, [onActivate]);

  return (
    <button
      type="button"
      className={`loopverse-calendar${isZoomed ? ' is-zoomed' : ''}`}
      aria-label="Loopverse event calendar"
      aria-pressed={isZoomed}
      onClick={triggerSequence}
    >
      <span className="loopverse-calendar__ring ring-one" />
      <span className="loopverse-calendar__ring ring-two" />
      <span className="loopverse-calendar__body">
        <span className="loopverse-calendar__header">LOOPVERSE</span>
        <span className="loopverse-calendar__stack">
          <span className="loopverse-calendar__page loopverse-calendar__page--back">
            <CalendarGrid page="back" />
          </span>
          <span className="loopverse-calendar__page loopverse-calendar__page--flip">
            <CalendarGrid page="flip" />
          </span>
        </span>
        <RangeCircle />
      </span>
    </button>
  );
}
