const DOODLES = [
  { src: '/assets/VimeoHero SVG/pink-star.svg', className: 'showreel__doodle--star' },
  { src: '/assets/VimeoHero SVG/smiley-face.svg', className: 'showreel__doodle--smiley' },
  { src: '/assets/Card-Sticker SVG/sticker-heart.svg', className: 'showreel__doodle--heart' },
  { src: '/assets/Footer-Sticker SVG/footer-sticker-boom.svg', className: 'showreel__doodle--boom' },
  { src: '/assets/Card-Sticker SVG/sticker-camera.svg', className: 'showreel__doodle--camera' },
];

export function ShowreelDoodles({ visible }) {
  return (
    <div
      className={`showreel__doodles${visible ? ' is-visible' : ''}`}
      aria-hidden="true"
    >
      {DOODLES.map((doodle) => (
        <img
          key={doodle.className}
          src={doodle.src}
          alt=""
          className={`showreel__doodle ${doodle.className}`}
        />
      ))}
    </div>
  );
}
