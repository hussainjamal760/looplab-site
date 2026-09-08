export const ONSITE_PERKS = [
  'Shorter, focused sprint at the physical Lahore venue.',
  'Beginner-friendly briefs with mentors circulating on the floor.',
  'Workstations, high-speed WiFi, power, meals & swag provided.',
  'Live onstage pitch to judges; same-day evening results.',
  'Exclusive access to Pitching & Game Development tracks.'
];

export const VIRTUAL_PERKS = [
  'Longer ~26-hour sprint with harder, advanced problem briefs.',
  'Open worldwide: manage your own setup, time zones, and tools.',
  'Livestreamed opening & async mentor rooms on video call.',
  'Online submission portal + recorded product walkthrough video.',
  'Judged & awarded separately from the onsite track.'
];

export const RULES_LIST = [
  'Teams of 2 to 4 members; solo participation is allowed.',
  'All code written during sprint; pre-built code is strictly ineligible.',
  'Participants may not switch tracks after registration closes.',
  'Open-source libraries & APIs permitted; cite all in submission.',
  'Harassment, unauthorized code, or plagiarism results in disqualification.'
];

export const JUDGING_CRITERIA = [
  { name: 'Innovation & Originality', weight: '25%', pct: 25 },
  { name: 'Technical Execution', weight: '25%', pct: 25 },
  { name: 'Real-World Impact & Feasibility', weight: '20%', pct: 20 },
  { name: 'Design & User Experience', weight: '15%', pct: 15 },
  { name: 'Pitch & Presentation', weight: '15%', pct: 15 }
];

export const EXPANDED_DETAILS = {
  onsite: {
    desc: 'The Onsite Track is calibrated for maximum velocity with minimum friction. You arrive with your laptop, plug into dedicated gigabit power/WiFi desks, and brainstorm with industry mentors circulating the floor.',
    perkTitle: 'Venue Perks & Exclusives',
    perkText: 'Free lunch, Red Bull / energy drinks, LoopLab sticker packs, and exclusive qualification for Pitching and Game Development trophies.'
  },
  virtual: {
    desc: 'The Virtual Track runs for an intense ~26 hours across international time zones. Teams receive production-grade problem briefs and collaborate via LoopLab Discord channels, livestream keynotes, and scheduled video mentor rooms.',
    perkTitle: 'Global Track Logistics',
    perkText: 'Submit working GitHub repo link + 3-minute video walkthrough by Day 2, 12 PM PKT. Evaluated independently with separate champion awards.'
  },
  rules: {
    desc: 'Integrity is paramount at LoopVerse 3.0. Projects must be built from the first commit timestamp after problem statements drop. Any pre-existing repositories or copied code will trigger immediate disqualification.',
    perkTitle: 'Submission Package',
    perkText: 'Working demo prototype, public source code repository, and transparent attribution of any public APIs, LLM endpoints, or libraries used.'
  },
  judging: {
    desc: 'Each project is scored independently by a 3-judge panel consisting of venture capital partners, senior staff engineers, and domain specialists using a unified weighted rubric.',
    perkTitle: 'Evaluation Protocol',
    perkText: 'Teams deliver a 5-minute presentation followed by a 3-minute technical Q&A covering code architecture, user flow, and business viability.'
  }
};
