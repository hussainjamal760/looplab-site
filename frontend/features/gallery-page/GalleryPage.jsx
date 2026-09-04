"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeGalleryPage, setGallerySet } from "@/store/slices/galleryPageSlice";
import { PHOTO_SETS, COLLAGE_LAYOUTS, resolveCollageImage } from "./data";

export function GalleryPage() {
  const dispatch = useAppDispatch();
  const { isOpen, activeSet } = useAppSelector((state) => state.galleryPage);
  const collageRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const collage = collageRef.current;
    if (!collage) return;

    const items = gsap.utils.toArray(collage.querySelectorAll(".p"));
    items.forEach((el, i) => {
      const layout = COLLAGE_LAYOUTS[i] || COLLAGE_LAYOUTS[i % COLLAGE_LAYOUTS.length];
      gsap.fromTo(
        el,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.1,
          ease: "back.out(1.5)",
          onUpdate() {
            el.style.transform = `rotate(${layout.rot}deg) scale(${gsap.getProperty(el, "scale")})`;
          },
        },
      );
    });
  }, [isOpen, activeSet]);

  const seeds = PHOTO_SETS[activeSet] || [];

  return (
    <div className={`gallery-page${isOpen ? " open" : ""}`} id="galleryPage">
      <button className="back-btn" onClick={() => dispatch(closeGalleryPage())}>
        ← Back
      </button>
      <div className="gallery-page-inner">
        <h2 className="galery-heading shiny-text-ink">GALERY</h2>
        <div className="dots" id="galleryDots">
          {PHOTO_SETS.map((_, i) => (
            <div
              key={i}
              className={`dot${i === activeSet ? " active" : ""}`}
              data-set={i}
              onClick={() => dispatch(setGallerySet(i))}
            />
          ))}
        </div>
        <div className="collage" id="fullCollage" style={{ height: 460 }} ref={collageRef}>
          {seeds.map((seed, i) => {
            const layout = COLLAGE_LAYOUTS[i] || COLLAGE_LAYOUTS[i % COLLAGE_LAYOUTS.length];
            return (
              <div
                key={`${activeSet}-${seed}`}
                className="p"
                style={{
                  left: layout.left,
                  top: layout.top,
                  transform: `rotate(${layout.rot}deg) scale(.6)`,
                  opacity: 0,
                }}
              >
                <img src={resolveCollageImage(seed)} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
