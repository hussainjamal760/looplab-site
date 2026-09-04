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


// =====================================================
// EXECUTIVE CARD
// =====================================================

function ExecutiveCard({ member, index }) {
  return (
    <article className="executive-card">

      {/* Top row */}

      <div className="executive-card-top">

        <span className="executive-number">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="executive-level">
          {member.level}
        </span>

      </div>


      {/* Avatar */}

      <div className="executive-avatar">
        <img
          src={member.image}
          alt={`${member.name} avatar`}
        />
      </div>


      {/* Member information */}

      <div className="executive-card-content">

        <p className="executive-role">
          {member.role}
        </p>

        <h4>
          {member.name}
        </h4>

      </div>

    </article>
  );
}


// =====================================================
// SWIPE CARD
// =====================================================

function MemberSwipeCard({
  title,
  members,
  theme,
}) {

  const [activeIndex, setActiveIndex] = useState(0);

  const cardRef = useRef(null);

  const animatingRef = useRef(false);


  const member = members[activeIndex];


  // ---------------------------------------------------
  // CHANGE MEMBER
  // ---------------------------------------------------

  function changeMember(direction) {

    if (
      animatingRef.current ||
      !cardRef.current ||
      members.length === 0
    ) {
      return;
    }


    animatingRef.current = true;


    const nextIndex =
      direction === "next"
        ? (activeIndex + 1) % members.length
        : (activeIndex - 1 + members.length) %
          members.length;


    const exitX =
      direction === "next"
        ? -220
        : 220;


    const enterX =
      direction === "next"
        ? 220
        : -220;


    // Exit animation

    gsap.to(cardRef.current, {

      x: exitX,

      rotation:
        direction === "next"
          ? -5
          : 5,

      opacity: 0,

      scale: 0.96,

      duration: 0.28,

      ease: "power2.in",

      onComplete: () => {

        // Change member

        setActiveIndex(nextIndex);


        // Enter animation

        gsap.fromTo(

          cardRef.current,

          {
            x: enterX,

            rotation:
              direction === "next"
                ? 5
                : -5,

            opacity: 0,

            scale: 0.96,
          },

          {
            x: 0,

            rotation: 0,

            opacity: 1,

            scale: 1,

            duration: 0.45,

            ease: "back.out(1.3)",

            onComplete: () => {

              animatingRef.current = false;

            },
          }
        );
      },
    });
  }


  // ---------------------------------------------------
  // CARD
  // ---------------------------------------------------

  return (
    <section
      className={`member-section ${theme}`}
    >

      {/* Section heading */}

      <div className="member-section-heading">

        <div>

          <p className="section-eyebrow">
            Team members
          </p>

          <h3>
            {title}
          </h3>

        </div>


        <span className="member-counter">

          {String(activeIndex + 1).padStart(
            2,
            "0"
          )}

          {" / "}

          {String(members.length).padStart(
            2,
            "0"
          )}

        </span>

      </div>


      {/* Member card */}

      <div className="member-card-wrapper">

        <article
          ref={cardRef}
          className="member-card"

          onClick={() =>
            changeMember("next")
          }

          onKeyDown={(event) => {

            if (
              event.key === "Enter" ||
              event.key === " "
            ) {

              event.preventDefault();

              changeMember("next");

            }

          }}

          role="button"
          tabIndex={0}
        >

          {/* Header */}

          <div className="member-card-header">

            <span className="member-card-index">

              {String(activeIndex + 1).padStart(
                2,
                "0"
              )}

            </span>


            <span className="member-card-hint">
              Click for next →
            </span>

          </div>


          {/* Content */}

          <div className="member-card-content">

            {/* Avatar */}

            <div className="member-avatar">

              <img
                src={member.image}
                alt={`${member.name} avatar`}
              />

            </div>


            {/* Role */}

            <p className="member-card-role">
              {member.role}
            </p>


            {/* Name */}

            <h4>
              {member.name}
            </h4>


            {/* Level */}

            <span className="member-card-level">
              {member.level}
            </span>

          </div>


          {/* Footer */}

          <div className="member-card-footer">

            <span>
              LoopLab Community
            </span>

            <span>
              {title}
            </span>

          </div>

        </article>

      </div>


      {/* Controls */}

      <div className="member-controls">

        <button
          type="button"
          className="member-arrow"

          onClick={() =>
            changeMember("previous")
          }

          aria-label="Previous member"
        >
          ←
        </button>


        <span>
          Swipe or tap to explore
        </span>


        <button
          type="button"
          className="member-arrow"

          onClick={() =>
            changeMember("next")
          }

          aria-label="Next member"
        >
          →
        </button>

      </div>

    </section>
  );
}


// =====================================================
// MAIN TEAM SECTION
// =====================================================

export default function ServiceCards() {

  return (

    <section
  className="team-section"
  id="ambassador"
>


      {/* =================================================
          INTRO
      ================================================= */}

      <div className="team-intro">

        <p className="section-eyebrow">
          Meet the people behind LoopLab
        </p>


        <h2>

          Meet the people
          <br />

          behind the{" "}

          <span>
            loop
          </span>

        </h2>


        <p>

          The people working together to
          build, organize and grow the
          LoopLab community.

        </p>

      </div>


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


        {/* Executive cards */}

        <div className="executive-grid">

          {executiveTeam.map(
            (member, index) => (

              <ExecutiveCard
                key={`${member.name}-${index}`}
                member={member}
                index={index}
              />

            )
          )}

        </div>

      </section>


      {/* =================================================
          OTHER TEAMS
      ================================================= */}

      <div className="member-groups">


        {/* Core Team */}

        <MemberSwipeCard
          title="Core Team"
          members={coreTeam}
          theme="theme-purple"
        />


        {/* Registration Team */}

        <MemberSwipeCard
          title="Registration Team"
          members={registrationTeam}
          theme="theme-orange"
        />


        {/* Creative Team */}

        <MemberSwipeCard
          title="Marketing, Events, Graphics & Social Media"
          members={creativeTeam}
          theme="theme-green"
        />

      </div>

    </section>
  );
}