import { seedToImg } from "@/features/shared/seedToImg";

export const PHOTO_SETS = [
  ["lv1a", "lv1b", "lv1c", "lv1d", "lv1e"],
  [
    "/assets/loopverse2/lv2-01.jpeg",
    "/assets/loopverse2/lv2-03.jpeg",
    "/assets/loopverse2/lv2-08.jpeg",
    "/assets/loopverse2/lv2-05.jpeg",
    "/assets/loopverse2/lv2-09.jpeg",
  ],
  [
    "/assets/skillup/su-01.jpeg",
    "/assets/skillup/su-04.jpeg",
    "/assets/skillup/su-03.jpeg",
    "/assets/skillup/su-06.jpeg",
    "/assets/skillup/su-10.jpeg",
  ],
  ["g1", "g2", "g3", "g4", "g5"],
  ["tech1", "midi2", "newhey3", "skillup4", "hack5"],
];

export const COLLAGE_LAYOUTS = [
  { left: "2%", top: "60px", rot: -9 },
  { left: "20%", top: "120px", rot: 6 },
  { left: "39%", top: "20px", rot: -3 },
  { left: "58%", top: "110px", rot: 8 },
  { left: "76%", top: "40px", rot: -5 },
];

export function resolveCollageImage(seed) {
  return seed.includes("/") ? seed : seedToImg(seed, 320, 340);
}
