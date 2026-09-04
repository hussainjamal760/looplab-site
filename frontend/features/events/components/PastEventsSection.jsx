'use client';

import PastEventBlock from './PastEventBlock';
import {
  loopverse1CubeFaces,
  loopverse2CubeFaces,
  skillupCubeFaces
} from '@/lib/eventsData';

export default function PastEventsSection() {
  return (
    <section className="past-events-section">
      <h2 className="past-events-script-header">Past Events</h2>

      {/* 1. Loopverse 1.0 Section */}
      <PastEventBlock
        title="loopverse 1.0"
        description="Loopverse 1.0 brought together passionate student developers, UI/UX designers, and technology founders for our inaugural campus revolution. Explore interactive project showcases and live keynotes."
        buttonLabel="View online events →"
        cubeFaces={loopverse1CubeFaces}
        defaultOpen={true}
      />

      {/* 2. Loopverse 2.0 Section */}
      <PastEventBlock
        title="loopverse 2.0"
        description="Loopverse 2.0 expanded across 10+ university campuses nationwide, bringing 1,000+ student builders together for live coding battles, design sprints, mentorship circles, and expanded campus participation."
        buttonLabel="View Loopverse 2.0 →"
        cubeFaces={loopverse2CubeFaces}
        defaultOpen={false}
      />

      {/* 3. Skillup Week One Section */}
      <PastEventBlock
        title="Skillup Week One"
        description="Skillup Week One upgraded participants' skills through hands-on developer workshops, industry mentor circles, interactive lab sessions, and practical skill-building across emerging technologies."
        buttonLabel="View Gallery →"
        cubeFaces={skillupCubeFaces}
        defaultOpen={false}
      />

      {/* Dash Pagination Bar */}
      <div className="dash-pagination-bar">
        <div className="dash-pill active" />
        <div className="dash-pill" />
        <div className="dash-pill" />
        <div className="dash-pill" />
        <div className="dash-pill" />
      </div>
    </section>
  );
}
