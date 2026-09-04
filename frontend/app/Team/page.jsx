"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "@/features/navigation/components/Navbar";
import Footer from "@/features/footer/components/Footer";
import SmoothScroll from "@/features/effects-and-cursor/components/SmoothScroll";
import CursorBubble from "@/features/effects-and-cursor/components/CursorBubble";
import TransitionScribble from "@/features/effects-and-cursor/components/TransitionScribble";
import HorizontalWords from "@/features/horizontal-words/components/HorizontalWords";
import ExecutiveTeamCard from "@/features/service-cards/components/ExecutiveTeamCard";
import PerspectiveCarousel from "@/features/service-cards/components/PerspectiveCarousel";

import {
    executiveTeam,
    coreTeam,
    registrationTeam,
    creativeTeam,
} from "@/features/service-cards/components/teamData";

gsap.registerPlugin(ScrollTrigger);


/* =========================================
   AVATAR
========================================= */

function Avatar({ name }) {
    const initials = name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="team-avatar">
            {initials}
        </div>
    );
}


/* =========================================
   EXECUTIVE CARD
========================================= */

function ExecutiveCard({ member, index }) {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;

        if (!card) return;

        const animation = gsap.fromTo(
            card,
            {
                opacity: 0,
                y: 120,
                scale: 0.94,
                rotate: index % 2 === 0 ? -2 : 2,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 82%",
                    end: "top 45%",
                    scrub: 1,
                },
            }
        );

        return () => {
            animation.kill();
        };
    }, [index]);

    return (
        <article
            ref={cardRef}
            className="team-executive-card"
        >
            <div className="team-card-glow"></div>

            <div className="team-card-number">
                {String(index + 1).padStart(2, "0")}
            </div>

            <div className="team-member-image">
                <Avatar name={member.name} />
            </div>

            <div className="team-member-content">

                <p className="team-member-role">
                    {member.role}
                </p>

                <h3>
                    {member.name}
                </h3>

                <span className="team-member-level">
                    {member.level}
                </span>

            </div>
        </article>
    );
}


/* =========================================
   CORE TEAM CARD
========================================= */

function CoreCard({ member, index }) {
    return (
        <article className="core-team-card">

            <div className="core-card-number">
                {String(index + 1).padStart(2, "0")}
            </div>

            <div className="core-card-image">
                <Avatar name={member.name} />
            </div>

            <div className="core-card-info">

                <span>
                    {member.level}
                </span>

                <h3>
                    {member.name}
                </h3>

                <p>
                    {member.role}
                </p>

            </div>

        </article>
    );
}


/* =========================================
   TEAM PAGE
========================================= */

export default function TeamPage() {

    return (
        <>
            {/* Existing LoopLab effects */}

            <SmoothScroll />

            <CursorBubble />

            <TransitionScribble />


            {/* NAVBAR */}

            <header className="team-header">
                <Navbar />
            </header>


            {/* PAGE */}

            <main className="team-page">


                {/* =================================
                    HERO
                ================================= */}

                <HorizontalWords
                    text="Meet the people behind the loop"
                    topSubtitle="MEET THE PEOPLE BEHIND LOOPLAB"
                    bottomText="The people working together to build, organize and grow the LoopLab community."
                    highlightWord="loop"
                />


                {/* =================================
                    EXECUTIVE TEAM
                ================================= */}

                <section className="executive-section">

                    <div className="team-section-title">

                        <span>
                            01 — EXECUTIVE TEAM
                        </span>

                        <h2>
                            THE
                            <br />
                            LEADERS.
                        </h2>

                    </div>


                    <PerspectiveCarousel items={executiveTeam} slideWidth={360} rotationStep={28} />

                </section>


                {/* =================================
                    CORE TEAM
                ================================= */}

                <section className="core-section">

                    <div className="team-section-title core-title">

                        <span>
                            02 — CORE TEAM
                        </span>

                        <h2>
                            THE
                            <br />
                            CORE.
                        </h2>

                        <p>
                            Meet the people keeping
                            LoopLab moving forward.
                        </p>

                    </div>


                    <div className="core-card-stack">

                        {coreTeam.map(
                            (member, index) => (

                                <CoreCard
                                    key={member.id}
                                    member={member}
                                    index={index}
                                />

                            )
                        )}

                    </div>

                </section>


                {/* =================================
                    OTHER TEAMS
                ================================= */}

                <section className="other-teams">

                    <div className="team-section-title">

                        <span>
                            03 — THE TEAMS
                        </span>

                        <h2>
                            MORE
                            <br />
                            PEOPLE.
                        </h2>

                    </div>


                    <div className="team-groups">


                        {/* REGISTRATION */}

                        <div className="team-group">

                            <span>
                                REGISTRATION TEAM
                            </span>

                            {registrationTeam.map(
                                (member) => (

                                    <div
                                        className="team-list-item"
                                        key={member.id}
                                    >

                                        <strong>
                                            {member.name}
                                        </strong>

                                        <small>
                                            {member.role}
                                        </small>

                                    </div>

                                )
                            )}

                        </div>


                        {/* MARKETING / EVENTS */}

                        <div className="team-group">

                            <span>
                                MARKETING · EVENTS ·
                                GRAPHICS · SOCIAL MEDIA
                            </span>

                            {creativeTeam.map(
                                (member) => (

                                    <div
                                        className="team-list-item"
                                        key={member.id}
                                    >

                                        <strong>
                                            {member.name}
                                        </strong>

                                        <small>
                                            {member.role}
                                        </small>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                </section>

            </main>


            {/* FOOTER */}

            <footer className="main-footer">
                <Footer />
            </footer>

        </>
    );
}