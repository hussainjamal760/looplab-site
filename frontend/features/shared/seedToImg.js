const KEYWORD_MAP = {
  tech1: "technology,conference,summit",
  midi2: "tech,meetup,conference",
  newhey3: "startup,networking,event",
  skillup4: "workshop,coding,training",
  hack5: "hackathon,coding,team",
  lv1a: "conference,audience,tech",
  lv1b: "conference,speaker,stage",
  lv1c: "conference,networking,tech",
  lv1d: "conference,students,tech",
  lv1e: "conference,crowd,tech",
  lv1f: "conference,presentation,tech",
  lv1: "conference,audience,tech",
  lv2a: "techconference,speaker,stage",
  lv2b: "techconference,coding,hackathon",
  lv2c: "techconference,panel,discussion",
  lv2d: "techconference,audience,tech",
  lv2e: "techconference,networking,startup",
  lv2f: "techconference,crowd,event",
  su1a: "workshop,coding,laptop",
  su1b: "workshop,training,mentor",
  su1c: "workshop,classroom,tech",
  su1d: "workshop,students,coding",
  su1e: "workshop,team,collaboration",
  su1f: "workshop,presentation,tech",
  g1: "hackathon,coding,team",
  g2: "conference,tech,event",
  g3: "workshop,students,coding",
  g4: "techconference,networking,startup",
  g5: "conference,crowd,tech",
};

export function seedToImg(seed, w, h) {
  const base = seed.split("-")[0];
  const keywords = KEYWORD_MAP[base] || "technology,conference,event";
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const lock = (hash % 900) + 100;
  return `https://loremflickr.com/${w}/${h}/${keywords}?lock=${lock}`;
}
