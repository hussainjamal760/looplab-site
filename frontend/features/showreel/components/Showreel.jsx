import { ExploreEventsLink } from './ExploreEventsLink';
import { ShowreelDoodles } from './ShowreelDoodles';
import { CalendarSticker } from '@/features/loopverse-hero/CalendarSticker';
import DriftWall from './DriftWall';
import ParticleText from '@/features/loopverse-hero/ParticleText';

export default function Showreel() {
  return (
    <section className="showreel-section" id="showreel-section">
      <div className="showreel__drift-wall-wrap">
        <DriftWall />
      </div>
      <div className="showreel__content">
        <div className="showreel__title-row is-lit">
          <ShowreelDoodles visible />
          <ParticleText
            text="UPCOMING EVENTS"
            particleSize={2.2}
            density={4}
            color="#8b5cf6"
            highlightColor="#ffffff"
            scatter={190}
            gatherDuration={1600}
            stagger={420}
            pointerRepel={42}
            repelRadius={120}
            idleDrift={0.8}
            trigger="mount"
            fontSize="clamp(3.5rem, 13vw, 9rem)"
            fontWeight={800}
            fontFamily="inherit"
            glow
            textStroke
            strokeWidth={3}
          />
          <CalendarSticker />
        </div>
        <p className="showreel__subtitle">
          Discover meetups, buildathons, and community moments from LoopLab.
        </p>
        <ExploreEventsLink />
      </div>
    </section>
  );
}
