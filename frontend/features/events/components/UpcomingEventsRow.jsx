'use client';

import EventCard from './EventCard';

export default function UpcomingEventsRow({ events, onSelectPass }) {
  return (
    <div className="upcoming-row-container">
      <div className="horizontal-events-track">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onSelectPass={onSelectPass}
          />
        ))}
      </div>
    </div>
  );
}
