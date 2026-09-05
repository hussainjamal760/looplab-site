"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";

import {
  executiveTeam,
  coreTeam,
  registrationTeam,
  creativeTeam,
} from "@/features/service-cards/components/teamData";

import "@/app/styles/team.css";
import HorizontalWords from "@/features/horizontal-words/components/HorizontalWords";
import PerspectiveCarousel from "./PerspectiveCarousel";
import TestimonialsCard from "./TestimonialsCard";

// =====================================================
// MAIN TEAM SECTION
// =====================================================

export default function ServiceCards() {
  return (
    <section className="team-section" id="ambassador">
      {/* =================================================
          INTRO
      ================================================= */}

      <HorizontalWords
        text="Meet the people behind the loop"
        topSubtitle="MEET THE PEOPLE BEHIND LOOPLAB"
        bottomText="The people working together to build, organize and grow the LoopLab community."
        highlightWord="loop"
      />

      {/* =================================================
          EXECUTIVE TEAM
      ================================================= */}

      <section className="executive-team">
        <div className="team-section-heading">
          <div>
            <p className="section-eyebrow">
              01 / Leadership
            </p>
            <h3>
              Executive Team
            </h3>
          </div>

          <span>
            Our core leadership
          </span>
        </div>

        {/* Perspective Executive 3D Carousel */}
        <PerspectiveCarousel items={executiveTeam} slideWidth={360} rotationStep={28} />
      </section>

      {/* =================================================
          OTHER TEAMS
      ================================================= */}

      <div className="member-groups flex flex-col gap-16 w-full max-w-[1200px] mx-auto">
        {/* Core Team */}
        <TestimonialsCard
          title="Core Team"
          eyebrow="02 / Operations"
          items={coreTeam}
          width={850}
        />

        {/* Registration Team */}
        <TestimonialsCard
          title="Registration Team"
          eyebrow="03 / Registration"
          items={registrationTeam}
          width={850}
        />

        {/* Creative Team */}
        <TestimonialsCard
          title="Marketing, Events, Graphics & Social Media"
          eyebrow="04 / Creative & Media"
          items={creativeTeam}
          width={850}
        />
      </div>
    </section>
  );
}