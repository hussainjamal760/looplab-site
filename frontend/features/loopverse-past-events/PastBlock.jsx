"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SpotlightCard } from "@/features/shared/SpotlightCard";
import { MagneticButton } from "@/features/shared/MagneticButton";
import { Cube } from "./Cube";
import { Counter } from "./Counter";
import { RevealText } from "./RevealText";

const STICKERS = [
  "/assets/Footer-Sticker SVG/footer-sticker-boom.svg",
  "/assets/Footer-Sticker SVG/footer-sticker-smiley.svg",
  "/assets/Footer-Sticker SVG/footer-sticker-100.svg",
  "/assets/Card-Sticker SVG/sticker-boom.svg",
];

export function PastBlock({ event, index = 0 }) {
  const [showSmallInterface, setShowSmallInterface] = useState(false);
  const stickerImg = STICKERS[index % STICKERS.length];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate section underline SVG paths on scroll
    const paths = document.querySelectorAll(`.event-underline-${index} path`);
    if (paths.length) {
      paths.forEach((p) => {
        const len = p.getTotalLength ? p.getTotalLength() : 200;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.25,
        scrollTrigger: {
          trigger: `.past-block-${index}`,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, [index]);

  const handleRegisterClick = () => {
    setShowSmallInterface((prev) => !prev);
  };

  const handleGoToLoopverse3 = () => {
    setShowSmallInterface(false);
    const target = document.getElementById("cardsRow") || document.querySelector(".hero-sub");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`past-block past-block-${index}`}>
      <SpotlightCard className="pb-left">
        {/* Floating Sticker Accent */}
        <div className="pb-sticker-badge">
          <img src={stickerImg} alt="" width="56" height="56" aria-hidden="true" />
        </div>

        <div className="heading-stack">
          <div className="top" data-wiggle-target="true">
            {event.name}
          </div>
          <div className="bottom">{event.name}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="160"
            viewBox="0 0 159 17"
            fill="none"
            className={`title-underline-svg event-underline-${index}`}
          >
            <path
              d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652"
              stroke="#ff5a1f"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735"
              stroke="#8c5cff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>

        <RevealText text={event.description} />

        <div className="meta-row">
          {event.meta.map((m, i) => (
            <div className="meta-item" key={i}>
              <span className="ic">{m.icon}</span>{" "}
              {m.count !== undefined ? (
                <>
                  <Counter target={m.count} />+ {m.label}
                </>
              ) : (
                m.label
              )}
            </div>
          ))}
        </div>

        <a href="#" className="read-more">
          Read More →
        </a>

        {/* Clean Pill Button & Small Popover Interface */}
        <div className="past-card-btn-container">
          <MagneticButton
            className="pill-btn register-now-pill-btn"
            shine={false}
            onClick={handleRegisterClick}
          >
            Register Now →
          </MagneticButton>

          {/* Small Popover Interface Card */}
          {showSmallInterface && (
            <div className="small-date-passed-card">
              <button
                className="small-card-close"
                onClick={() => setShowSmallInterface(false)}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="small-card-text">
                <span className="oops-tag">⚠️ Oops! Date passed</span>
                <p>but you can register for <strong>Loopverse 3.0</strong></p>
              </div>
              <button className="small-card-action" onClick={handleGoToLoopverse3}>
                Register for Loopverse 3.0 →
              </button>
            </div>
          )}
        </div>
      </SpotlightCard>

      <div className="pb-right">
        <Cube faces={event.cubeFaces} title={event.name} />
      </div>
    </div>
  );
}
