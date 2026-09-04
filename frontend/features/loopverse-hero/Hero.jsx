"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Sparkles } from "./Sparkles";
import { PolaroidCard } from "./PolaroidCard";
import { HERO_POLAROIDS } from "./data";
import { ParticleText } from "./ParticleText";
import { MagneticButton } from "@/features/shared/MagneticButton";

export function Hero() {
  const rowRef = useRef(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const cards = gsap.utils.toArray(row.querySelectorAll(".polaroid"));
    const finalRotations = cards.map((c) => parseFloat(c.dataset.rot || "0"));

    gsap.set(cards, { y: -700, opacity: 0, rotate: 0 });
    const tween = gsap.to(cards, {
      y: 0,
      opacity: 1,
      rotate: (i) => finalRotations[i],
      duration: 1.1,
      ease: "bounce.out",
      stagger: 0.12,
      delay: 0.3,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="hero">
      <div className="grid-floor" />
      <Sparkles />

      <div className="headline-wrap">
        <div className="cards-row" id="cardsRow" ref={rowRef}>
          {HERO_POLAROIDS.map((p) => (
            <PolaroidCard key={p.title} {...p} />
          ))}
        </div>

        {/* Interactive React Bits Particle Text Headline with Infinity Sticker */}
        <div className="upcoming-events-title-wrap">
          <ParticleText text="UPCOMING EVENTS" />
          <span className="infinity-sticker-ic" title="Looplab Infinity">
            ∞
          </span>
        </div>
      </div>

      <div className="hero-sub">
        <div className="lv">loopverse 3.0</div>
        <div className="reg shiny-text">REGISTRATIONS OPEN</div>

        {/* Live Running Headline Banner */}
        <div className="live-headline-banner">
          <span className="live-badge">
            <span className="live-dot" /> LIVE NOW
          </span>
          <div className="live-ticker-wrap">
            <div className="live-ticker-track">
              <span>⚡ CURRENTLY LIVE — REGISTRATIONS OPEN NOW!</span>
              <span>✦ BUILT BY STUDENTS FOR BUILDERS</span>
              <span>⚡ CURRENTLY LIVE — REGISTRATIONS OPEN NOW!</span>
              <span>✦ BUILT BY STUDENTS FOR BUILDERS</span>
            </div>
          </div>
        </div>

        <MagneticButton as="a" href="#gallery-cta" className="portal-btn">
          PORTAL ✦
        </MagneticButton>
      </div>
    </section>
  );
}
