"use client";


import { executiveTeam } from "@/features/service-cards/components/teamData";
import PerspectiveCarousel from "@/features/service-cards/components/PerspectiveCarousel";

import "@/app/styles/team.css";

export default function ServiceCards() {
  return (
    <section className="team-section" id="team">
      {/* Team introduction */}

      <div className="team-intro">
        <p className="section-eyebrow">
          The people powering our community
        </p>

        <h2>
          Meet the people
          <br />
          behind the <span>loop</span>
        </h2>

        <p>
          Meet the leaders working together to build, organize and grow
          the LoopLab community.
        </p>
      </div>

      {/* Executive team */}

      <section className="executive-team">
        <div className="team-section-heading">
          <div>
            <p className="section-eyebrow">
              01 / Leadership
            </p>

            <h3>Executive Team</h3>
          </div>

          <span>Our core leadership</span>
        </div>

        <PerspectiveCarousel
          items={executiveTeam}
          defaultActiveIndex={0}
          loop={true}
          slideWidth={360}
        />
      </section>

      {/* Full team button */}

      <div className="explore-team-wrapper">
        <p>
          Leadership is only the beginning. Meet everyone helping LoopLab
          move forward.
        </p>
<a href="/teams" className="explore-team-button">
  <span>Explore Our Full Team</span>
  <span className="explore-team-arrow">↗</span>
</a>
      </div>
    </section>
  );
}