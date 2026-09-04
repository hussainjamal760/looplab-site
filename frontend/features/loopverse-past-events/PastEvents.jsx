import { PAST_EVENTS } from "./data";
import { PastBlock } from "./PastBlock";

export function PastEvents() {
  return (
    <section className="light">
      {/* Header with Homepage Stickers */}
      <div className="past-events-header">
        <div className="header-sticker-left">
          <img src="/assets/Footer-Sticker SVG/footer-sticker-smiley.svg" width="48" height="48" alt="" />
        </div>
        <div className="nav-title" style={{ fontSize: 24 }}>
          loopverse 3.0
        </div>
        <h2>Past Events</h2>
        <div className="header-sticker-right">
          <img src="/assets/Footer-Sticker SVG/footer-sticker-heart.svg" width="46" height="46" alt="" />
        </div>
      </div>

      {PAST_EVENTS.map((event, index) => (
        <PastBlock key={event.name} event={event} index={index} />
      ))}

      <div className="dots">
        <div className="dot active" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </section>
  );
}
