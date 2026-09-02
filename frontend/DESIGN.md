# 🎨 Looplab Design System & Animation Specification (`DESIGN.md`)

This document defines the visual design system, typography, color palette, design tokens, GSAP motion system, Lenis smooth scroll configuration, and cursor specifications for **Looplab**.

---

## 🎭 Design Philosophy & Aesthetic Identity

Looplab's visual language captures the bold, playful, high-energy aesthetics of Awwward-winning interactive agency applications:
- **Playful Dynamism**: Hand-drawn vector scribbles, physics-based elastic fling, micro-hover wiggles, and interactive proximity pushes.
- **Vibrant Modern Palette**: Warm cream base (`#f0ebe6`) paired with bold purple (`#9E00FE`), soft pink (`#f0befa`), electric orange (`#f5693c`), and rich dark tones (`#1a1a1a`).
- **Tactile Cursor Experience**: Context-aware custom cursor bubble with physics-based `quickTo` tracking.

---

## 🎨 Color Palette & Design Tokens

All colors are centralized as CSS custom properties in `frontend/app/styles/base.css`:

```css
:root {
    /* Brand Primary & Accents */
    --color-darkblue: #9E00FE;     /* Primary brand accent & transition mask */
    --color-pink: #f0befa;         /* Selection background & cursor bubble */
    --color-lightblue: #EAD2FF;    /* Light accent & badge background */
    --color-orange: #f5693c;       /* Secondary brand accent */
    --color-green: #29725f;        /* Deep green accent */
    --color-lightgreen: #e6fab9;   /* Bright lime accent */
    --color-maroon: #a0325a;       /* Deep red/maroon accent */

    /* Neutral & Backgrounds */
    --bg-color: #f0ebe6;           /* Main page warm cream background */
    --color-white: #ffffff;        /* Surface white */
    --color-black: #000000;        /* Pure black */
    --color-dark: #1a1a1a;         /* Base text color */
    --color-black-soft: #111111;   /* Soft dark container background */
    --color-black-deep: #0a0a0a;   /* Video hero background */
}
```

### Text Selection & Custom Cursor
```css
::selection {
    background-color: var(--color-pink);
    color: var(--color-black);
}

body {
    cursor: url("/assets/Cursor SVG/cursor-default.svg") 2 0, auto;
}
```

---

## 🔤 Typography System

| Font Family | Type | Source | Role |
|---|---|---|---|
| **Pacifico** | Cursive Display | Google Fonts | Brand logo (`LOOPLAB`) |
| **Epilogue** | Sans-Serif Variable (100–900) | Local `/fonts/Epilogue-VariableFont_wght.ttf` | Primary Headings, Cards, Buttons, Body |
| **DM Sans** | Sans-Serif Variable (100–900) | Local `/fonts/DMSans-VariableFont_opsz,wght.ttf` | Secondary Micro-copy, Badges, Labels |

---

## 🎬 Motion Design & Animation Specification

The motion architecture is powered by **GSAP (GreenSock)**, **ScrollTrigger**, **InertiaPlugin**, and **Lenis Smooth Scroll**.

### 1. Lenis Smooth Scroll & GSAP Sync (`SmoothScroll.jsx`)
Lenis provides buttery-smooth inertia scrolling, synchronized directly with GSAP's global ticker:
```js
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### 2. Physics-Based Inertia Fling (`MotionCards.jsx`)
- Cards track mouse velocity on drag/swipe.
- On release (`mouseleave`), elements fling with physics inertia (`gsap.to(target, { inertia: { x: velocityX, y: velocityY } })`) and snap elastically back to original coordinates.

### 3. Fullscreen Page Transition Scribble (`TransitionScribble.jsx`)
- A full-screen GSAP SVG mask draws/undraws across the screen when clicking brand logos.
- Uses `stroke-dasharray` and `stroke-dashoffset` animation timed with `power2.inOut` easing.

### 4. Service Card Elastic Fan-Out (`ServiceCards.jsx`)
- Hovering over service cards causes adjacent cards to spread horizontally with an elastic spring callback (`ease: 'elastic.out(1, 0.4)'`).
- On mobile screens, cards stack vertically and reveal sequentially via ScrollTrigger.

### 5. Hover Wiggle System (`WIGGLE_CONFIG`)
- Per-element stepped rotation wiggles controlled centrally from `lib/data.js`:
```js
export const WIGGLE_CONFIG = {
    logoLooplab: 4,  // 4 deg rotation
    socials:     5,  // 5 deg rotation
    jobHeading:  1,
    googleMap:   1,
};
```
- Executes via GSAP stepped yoyo: `gsap.to(target, { rotation: intensity, repeat: -1, yoyo: true, ease: 'steps(1)' })`.

### 6. Interactive Cursor Bubble (`CursorBubble.jsx`)
- Follows the user's cursor smoothly using `gsap.quickTo(cursorBubble, 'x', { duration: 0.5, ease: 'power3' })`.
- Dynamically scales and rotates into view (`rotation: 0`, `scale: 1`, `elastic.out`) over interactive targets with context text (`click`, `to home`).

---

## 📂 CSS Modular Architecture

The frontend CSS is structured into 12 partial stylesheets imported sequentially via `frontend/app/globals.css`:

```css
@import './styles/base.css';             /* Reset, variables, fonts, cursor */
@import './styles/navbar.css';           /* Navbar, header hero, logos */
@import './styles/hero.css';             /* Section titles & underline SVGs */
@import './styles/motion-cards.css';     /* MotionCard physics section */
@import './styles/showreel.css';         /* Showreel section placeholder */
@import './styles/cards.css';            /* Service cards & card stickers */
@import './styles/marquee.css';          /* Infinite double marquee section */
@import './styles/horizontal-words.css'; /* Pinned horizontal scroll section */
@import './styles/footer.css';           /* Footer layout, stickers, socials */
@import './styles/vimeo-hero.css';       /* Vimeo hero player & mute blob */
@import './styles/cursor.css';          /* Cursor bubble & scribble transition */
@import './styles/responsive.css';      /* Mobile & tablet media queries */
```
