import { DECOR_SHAPES, DECOR_STARS } from "./data";

export function DecorBackground() {
  return (
    <div className="lg-decor" id="lgDecor">
      {DECOR_SHAPES.map((s, i) => (
        <span
          key={`shape-${i}`}
          className={s.round ? "round" : undefined}
          style={{ top: s.top, left: s.left, width: s.w, height: s.h, animationDuration: s.dur }}
        />
      ))}
      {DECOR_STARS.map(([top, left], i) => (
        <span
          key={`star-${i}`}
          className="star"
          style={{ top, left, animationDelay: `${i * 0.35}s` }}
        />
      ))}
    </div>
  );
}
