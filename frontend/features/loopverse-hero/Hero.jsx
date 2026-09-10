"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { WIGGLE_CONFIG } from "@/lib/data";
import { PolaroidCard } from "./PolaroidCard";
import { HERO_POLAROIDS } from "./data";
import { HeroDecorations } from "./HeroDecorations";

function initWiggle(element, intensity = 3) {
  if (!element) return () => {};
  gsap.set(element, { transformOrigin: "center center" });
  const onEnter = () => gsap.to(element, {
    rotation: intensity,
    duration: 0.16,
    repeat: -1,
    yoyo: true,
    ease: "steps(1)",
  });
  const onLeave = () => gsap.to(element, { rotation: 0, duration: 0.3, ease: "power2.out" });
  element.addEventListener("mouseenter", onEnter);
  element.addEventListener("mouseleave", onLeave);
  return () => {
    element.removeEventListener("mouseenter", onEnter);
    element.removeEventListener("mouseleave", onLeave);
  };
}

export function Hero() {
  const rowRef = useRef(null);
  const badgeRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    return initWiggle(badgeRef.current, WIGGLE_CONFIG.logoLooplab || 3);
  }, []);

  useEffect(() => {
    const cards = gsap.utils.toArray(rowRef.current?.querySelectorAll(".polaroid"));
    if (!cards.length || !contentRef.current) return undefined;

    const timeline = gsap.timeline();
    timeline.set(cards, { y: -700, opacity: 0, rotate: 0 });
    timeline.set(contentRef.current, { y: -38, opacity: 0 });
    timeline.to(cards, {
      y: 0,
      opacity: 1,
      rotate: (index) => HERO_POLAROIDS[index].rot,
      duration: 1.1,
      ease: "bounce.out",
      stagger: 0.12,
    });
    timeline.to(contentRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.25");

    return () => timeline.kill();
  }, []);

  return (
    <section className="hero events-contact-hero">
      <div className="grid-floor" />
      <HeroDecorations />
      <div className="events-contact-hero__inner">
        <div className="cards-row" id="cardsRow" ref={rowRef}>
          {HERO_POLAROIDS.map((card) => (
            <PolaroidCard key={card.title} {...card} />
          ))}
        </div>

        <div ref={contentRef} className="events-contact-hero__content">
          <Link
            href="/loopverse"
            ref={badgeRef}
            className="contact-badge events-hero-badge"
            style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer", textDecoration: "none" }}
          >
            <span className="contact-badge__dot" />
            <span>+ LOOPVERSE 3.0 REGISTRATIONS OPEN</span>
          </Link>

          <div className="contact-hero__title-wrap">
            <h1 className="contact-hero__title events-contact-hero__title">
              LOOPVERSE <span className="contact-hero__title-accent">3.0</span>
            </h1>
          </div>

          <p className="contact-hero__desc events-contact-hero__desc">
            Pakistan&apos;s largest campus tech gathering is live. Join 1,500+ builders
            from 20+ universities for keynote talks, build tracks, and a community
            built by students for builders.
          </p>

          <div className="events-hero-actions">
            <Link href="/loopverse" className="events-hero-view-details-btn">
              <span>View Details</span>
              <ArrowUpRight size={18} className="btn-arrow-icon" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
