"use client";

import { useAppDispatch } from "@/store/hooks";
import { openWallModal } from "@/store/slices/wallModalSlice";

export function LanyardCard({ card }) {
  const dispatch = useAppDispatch();
  const open = () => dispatch(openWallModal(card.wall));

  return (
    <div
      className="lanyard-card"
      data-wall={card.wall}
      style={{
        "--sway-dur": card.swayDur,
        "--sway-delay": card.swayDelay,
        marginTop: card.marginTop,
      }}
    >
      <div className="strap" style={{ "--strap-h": `${card.strapHeight}px` }}>
        <i>∞</i>
      </div>
      <div
        className="badge"
        onClick={(e) => {
          if (e.target.closest(".badge-ic")) return;
          open();
        }}
      >
        <div className="badge-photo" style={{ backgroundImage: `url('${card.photo}')` }} />
        <div className="badge-body">
          <b>{card.title}</b>
          <span>{card.subtitle}</span>
          <div className="badge-row">
            <button
              className="badge-pill"
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
            >
              Explore
            </button>
            <button className="badge-ic" title="Save">
              ☆
            </button>
            <button className="badge-ic" title="More">
              ⋯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
