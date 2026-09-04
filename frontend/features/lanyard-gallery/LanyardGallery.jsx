"use client";

import { useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { openGalleryPage } from "@/store/slices/galleryPageSlice";
import { MagneticButton } from "@/features/shared/MagneticButton";
import { DecorBackground } from "./DecorBackground";
import { LanyardCard } from "./LanyardCard";
import { LANYARD_CARDS } from "./data";

export function LanyardGallery() {
  const trackRef = useRef(null);
  const dispatch = useAppDispatch();

  const scrollStep = () => {
    const first = trackRef.current?.querySelector(".lanyard-card");
    return (first?.offsetWidth || 200) + 34;
  };

  return (
    <section className="lanyard-gallery" id="lanyardGallery">
      <DecorBackground />
      <div className="lg-top">
        <h2 className="lg-title">Gallery</h2>
        <MagneticButton className="lg-seeall" onClick={() => dispatch(openGalleryPage(0))}>
          See All <span>→</span>
        </MagneticButton>
      </div>

      <div className="lg-stage">
        <button
          className="lg-arrow lg-arrow-left"
          aria-label="Scroll left"
          onClick={() => trackRef.current?.scrollBy({ left: -scrollStep(), behavior: "smooth" })}
        >
          ‹
        </button>

        <div className="lg-track" id="lgTrack" ref={trackRef}>
          {LANYARD_CARDS.map((card) => (
            <LanyardCard key={card.wall} card={card} />
          ))}
        </div>

        <button
          className="lg-arrow lg-arrow-right"
          aria-label="Scroll right"
          onClick={() => trackRef.current?.scrollBy({ left: scrollStep(), behavior: "smooth" })}
        >
          ›
        </button>
      </div>
    </section>
  );
}
