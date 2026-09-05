"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeWallModal, setWallIndex } from "@/store/slices/wallModalSlice";
import { seedToImg } from "@/features/shared/seedToImg";
import { WALL_SETS, WALL_GRID_COUNT } from "./data";

export function WallModal() {
  const dispatch = useAppDispatch();
  const { isOpen, activeIndex } = useAppSelector((state) => state.wallModal);
  const set = WALL_SETS[activeIndex];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const items = gsap.utils.toArray(
      document.querySelectorAll("#wallGrid .wg-item"),
    );
    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)", stagger: 0.02 },
    );
  }, [isOpen, activeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") dispatch(closeWallModal());
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, dispatch]);

  const urls =
    set.images ??
    Array.from({ length: WALL_GRID_COUNT }, (_, i) => seedToImg(`${set.seed}-wall${i + 1}`, 200, 200));

  return (
    <div
      className={`wall-modal${isOpen ? " open" : ""}`}
      id="wallModal"
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(closeWallModal());
      }}
    >
      <div className="wall-box">
        <div className="wall-head">
          <h3 id="wallTitle">{set.title}</h3>
          <button className="wall-close" aria-label="Close" onClick={() => dispatch(closeWallModal())}>
            ✕
          </button>
        </div>
        <div className="wall-grid" id="wallGrid">
          {urls.map((url, i) => (
            <div key={i} className="wg-item" style={{ backgroundImage: `url('${url}')` }} />
          ))}
        </div>
        <div className="wall-dots" id="wallDots">
          {WALL_SETS.map((_, i) => (
            <div
              key={i}
              className={`dot${i === activeIndex ? " active" : ""}`}
              onClick={() => dispatch(setWallIndex(i))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
