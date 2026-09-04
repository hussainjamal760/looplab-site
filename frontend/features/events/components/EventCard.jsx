'use client';

export default function EventCard({ event, onSelectPass }) {
  const handlePassClick = (e) => {
    e.stopPropagation();
    if (onSelectPass) onSelectPass(event);
  };

  return (
    <div className="event-brutalist-card">
      <div className="event-card-media">
        <span
          className="event-card-tag"
          style={{ backgroundColor: event.bgColor }}
        >
          {event.tag}
        </span>
        <img
          src={event.thumbnail}
          alt={event.title}
          className="event-card-img"
          loading="lazy"
        />
      </div>
      <div className="event-card-body">
        <div>
          <span className="event-card-date-badge">{event.date}</span>
          <h3 className="event-card-title">{event.title}</h3>
        </div>
        <button
          className="view-pass-btn"
          onClick={handlePassClick}
          type="button"
        >
          VIEW PASS <span>→</span>
        </button>
      </div>
    </div>
  );
}
