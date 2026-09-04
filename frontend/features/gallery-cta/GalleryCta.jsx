"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/features/shared/MagneticButton";

export function GalleryCta() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = sectionRef.current;
    if (!container) return;

    // Word-by-word reveal for quote text
    const qEl = quoteRef.current;
    if (qEl) {
      const words = qEl.querySelectorAll(".quote-word");
      gsap.fromTo(
        words,
        { opacity: 0.15, filter: "blur(6px)", y: 10 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          stagger: 0.03,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: qEl,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, []);

  const quoteText =
    "Looplab is Pakistan's premier student tech community — where ambitious developers, designers, and innovators connect to turn bold ideas into real-world software and shape the future of technology together.";

  return (
    <section ref={sectionRef} className="light community-motivation center" id="community-motivation">
      {/* Background Blobs */}
      <svg
        className="blob-decor"
        style={{ top: -30, left: "2%", width: 180, height: 180, opacity: 0.35 }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#c9a6ff"
          d="M45,3 C75,-8 130,10 148,45 C166,80 172,120 140,150 C108,180 55,178 28,150 C1,122 -8,80 8,50 C17,32 30,9 45,3 Z"
        />
      </svg>
      <svg
        className="blob-decor"
        style={{ bottom: -20, right: "4%", width: 140, height: 140, opacity: 0.3 }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#ff5a1f"
          d="M50,6 C80,-6 135,14 150,48 C165,82 168,118 138,148 C108,178 58,178 30,150 C2,122 -6,78 12,48 C22,30 32,15 50,6 Z"
        />
      </svg>

      {/* Floating Sticker Accents */}
      <div className="motivation-sticker">
        <img
          src="/assets/Footer-Sticker SVG/footer-sticker-boom.svg"
          width="54"
          height="54"
          alt=""
          aria-hidden="true"
        />
      </div>

      <span className="community-badge">🌟 JOIN THE MOVEMENT</span>

      {/* Clean Static Title (All animations removed per request) */}
      <h2 className="clean-static-tagline">innovate. create. repeat.</h2>

      {/* Word-by-Word Reveal Quote */}
      <div className="quote-container" ref={quoteRef}>
        <p className="quote-text">
          &ldquo;
          {quoteText.split(" ").map((word, i) => (
            <span key={i} className="quote-word">
              {word}{" "}
            </span>
          ))}
          &rdquo;
        </p>
      </div>

      {/* Social Media Link Buttons */}
      <div className="social-links-frame">
        <h3 className="social-cta-heading">CONNECT WITH OUR COMMUNITY</h3>
        <div className="social-btn-row">
          <MagneticButton
            as="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-btn btn-instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span>Instagram</span>
          </MagneticButton>

          <MagneticButton
            as="a"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-btn btn-linkedin"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
            </svg>
            <span>LinkedIn</span>
          </MagneticButton>

          <MagneticButton
            as="a"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-btn btn-facebook"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z" />
            </svg>
            <span>Facebook</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
