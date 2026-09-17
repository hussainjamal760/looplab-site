'use client';

import { CheckCircle2, ShieldCheck, Zap, Globe } from 'lucide-react';

const ONSITE_PERKS = [
  'A shorter, beginner-friendly sprint done in a single focused day (10:45 AM – 5:30 PM)',
  'Dedicated mentors circulating the floor for real-time, in-person help',
  'Workstations, high-speed WiFi, and power provided — zero setup friction',
  'A live pitch and onstage demo directly in front of judges and sponsors',
  'Face-to-face networking with sponsor booths, recruiters, and fellow builders',
  'Meals, swag, and the full LoopLab event energy',
  'First access to sponsor-run workshops and CTF stations',
  'Exclusive access to Pitching Competition and Game Development modules',
];

const VIRTUAL_PERKS = [
  'Open to participants worldwide — no travel, no venue seat limits',
  'A longer 24-hour runway to tackle a higher-ceiling problem statement',
  'Build with your own tools, stack, and setup, entirely on your own schedule within the window',
  'Async mentor office hours plus two scheduled check-in calls along the way',
  'Submit via video demo — no live onstage pitch required',
  'Judged and awarded separately from onsite, against teams tackling the same brief and duration',
  'Certificates and swag for all finalists, same as onsite',
];

const RULES_LIST = [
  {
    tag: 'Composition',
    title: 'Team Size & Eligibility',
    desc: 'Teams of 2 to 4 members; solo participation is allowed. Open to students and early-career developers, designers, and product builders — no prior hackathon experience needed.',
  },
  {
    tag: 'Integrity',
    title: 'Code Originality & Window',
    desc: 'All code must be written during the hackathon window; pre-built projects are strictly not eligible.',
  },
  {
    tag: 'Dependencies',
    title: 'Open Source & Public APIs',
    desc: 'Use of open-source libraries and public APIs is permitted; cite them clearly in your submission.',
  },
  {
    tag: 'AI Tools',
    title: 'AI Tool Disclosure',
    desc: 'Use of AI tools (e.g., ChatGPT, Copilot, Claude) is allowed; disclose significant AI-generated code in your submission.',
  },
  {
    tag: 'Submission',
    title: 'Demo & Deadlines',
    desc: 'Every team must submit a working demo. Onsite teams deliver a live pitch before 5:00 PM. Virtual teams submit via the online portal before Saturday 11:59 AM.',
  },
  {
    tag: 'Governance',
    title: 'Code of Conduct',
    desc: 'Respect the LoopLab Code of Conduct; harassment, plagiarism, or unsportsmanlike behavior results in immediate disqualification.',
  },
];

export default function RulesAndPerksSection() {
  return (
    <section className="lv-rules-perks-section" id="rules">
      {/* Section Header */}
      <div className="lv-section-header">
        <span className="lv-section-tag">Track Experience &amp; Governance</span>
        <h2 className="lv-section-title">Perks &amp; Hackathon Rules</h2>
        <p className="lv-section-sub">
          Compare Onsite vs Virtual track benefits and review official LoopVerse 3.0 competition rules.
        </p>
      </div>

      {/* Perks Comparison Grid */}
      <div className="lv-perks-grid">
        {/* Onsite */}
        <div className="lv-perks-card lv-perks-card--onsite">
          <div className="lv-perks-card-header">
            <div className="lv-perks-icon-box lv-perks-icon-box--orange">
              <Zap size={20} />
            </div>
            <div>
              <span className="lv-perks-location-badge lv-perks-location-badge--orange">Lahore, Pakistan</span>
              <h3 className="lv-perks-card-title">Why Onsite Is Beginner-Friendly</h3>
            </div>
          </div>
          <p className="lv-perks-card-sub">
            Going onsite is the simplest way into LoopVerse 3.0. A short, focused sprint with approachable briefs, in-person floor mentors, workstations, food, and same-day awards.
          </p>
          <ul className="lv-perks-list">
            {ONSITE_PERKS.map((perk, idx) => (
              <li key={idx} className="lv-perks-list-item">
                <CheckCircle2 size={16} className="lv-perks-check lv-perks-check--orange" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Virtual */}
        <div className="lv-perks-card lv-perks-card--virtual">
          <div className="lv-perks-card-header">
            <div className="lv-perks-icon-box lv-perks-icon-box--purple">
              <Globe size={20} />
            </div>
            <div>
              <span className="lv-perks-location-badge lv-perks-location-badge--purple">Worldwide Remote</span>
              <h3 className="lv-perks-card-title">Why Virtual Is a Tougher Marathon</h3>
            </div>
          </div>
          <p className="lv-perks-card-sub">
            The virtual track is built for remote teams wanting a bigger challenge. A full 24-hour window from Fri 11:59 AM to Sat 11:59 AM with higher-ceiling briefs and async mentor support.
          </p>
          <ul className="lv-perks-list">
            {VIRTUAL_PERKS.map((perk, idx) => (
              <li key={idx} className="lv-perks-list-item">
                <CheckCircle2 size={16} className="lv-perks-check lv-perks-check--purple" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Official Rules Grid */}
      <div className="lv-rules-card">
        <div className="lv-rules-card-header">
          <ShieldCheck size={26} color="var(--color-darkblue, #9E00FE)" />
          <div>
            <h3 className="lv-rules-card-title">Official Competition Rules</h3>
            <p className="lv-rules-card-sub">Mandatory guidelines for all onsite and virtual participants</p>
          </div>
        </div>
        <div className="lv-rules-grid">
          {RULES_LIST.map((r, idx) => (
            <div key={idx} className="lv-rule-item">
              <div className="lv-rule-item-header">
                <span className="lv-rule-num">0{idx + 1}</span>
                <span className="lv-rule-tag">{r.tag}</span>
              </div>
              <h4 className="lv-rule-title">{r.title}</h4>
              <p className="lv-rule-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
