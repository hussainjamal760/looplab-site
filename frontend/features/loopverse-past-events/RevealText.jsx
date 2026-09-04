"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function RevealText({ text, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const words = entry.target.querySelectorAll(".word");
            gsap.to(words, { opacity: 1, filter: "blur(0px)", stagger: 0.04, duration: 0.6, ease: "none" });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(/(\s+)/);

  return (
    <p className={`desc sr ${className}`.trim()} ref={ref}>
      {words.map((w, i) =>
        /^\s+$/.test(w) ? (
          <span key={i}>{w}</span>
        ) : (
          <span key={i} className="word">
            {w}
          </span>
        ),
      )}
    </p>
  );
}
