'use client';

import { CheckCircle2, ShieldCheck, Zap, Globe, Cpu, Users, Award, AlertCircle } from 'lucide-react';

const ONSITE_PERKS = [
  'A shorter, beginner-friendly sprint done in a single focused day (10:45 AM – 5:30 PM)',
  'Dedicated mentors circulating the floor for real-time, in-person help',
  'Workstations, high-speed WiFi, and power provided — zero setup friction',
  'A live pitch and onstage demo directly in front of judges and sponsors',
  'Face-to-face networking with sponsor booths, recruiters, and fellow builders',
  'Meals, swag, and the full LoopLab event energy',
  'First access to sponsor-run workshops and CTF stations',
  'Exclusive access to the Pitching Competition and Game Development modules'
];

const VIRTUAL_PERKS = [
  'Open to participants worldwide — no travel, no venue seat limits',
  'A longer 24-hour runway to tackle a higher-ceiling problem statement',
  'Build with your own tools, stack, and setup, entirely on your own schedule within the window',
  'Async mentor office hours plus two scheduled check-in calls along the way',
  'Submit via video demo — no live onstage pitch required',
  'Judged and awarded separately from onsite, against teams tackling the same brief and duration',
  'Certificates and swag for all finalists, same as onsite'
];

const RULES_LIST = [
  {
    title: 'Team Size & Eligibility',
    desc: 'Teams of 2 to 4 members; solo participation is allowed. Open to students and early-career developers, designers, and product builders — no prior hackathon experience needed.'
  },
  {
    title: 'Code Originality & Sprint Window',
    desc: 'All code must be written during the hackathon window; pre-built projects are not eligible.'
  },
  {
    title: 'Open Source & Public APIs',
    desc: 'Use of open-source libraries and public APIs is permitted; cite them clearly in your submission.'
  },
  {
    title: 'AI Tool Disclosure',
    desc: 'Use of AI tools (e.g., ChatGPT, Copilot, Claude) is allowed to assist with your build; disclose significant AI-generated code or content in your submission.'
  },
  {
    title: 'Demo & Submission Deadlines',
    desc: 'Every team must submit a working demo. Onsite teams deliver a live pitch before 5:00 PM. Virtual teams submit via the online portal before Saturday 11:59 AM.'
  },
  {
    title: 'Code of Conduct Enforcement',
    desc: 'Respect the LoopLab Code of Conduct; harassment or plagiarism results in immediate disqualification.'
  }
];

export default function RulesAndPerksSection() {
  return (
    <section className="lv-rules-perks-section py-16" id="rules">
      {/* Section Header */}
      <div className="lv-section-header mb-12">
        <span className="lv-section-tag">Track Experience &amp; Governance</span>
        <h2 className="lv-section-title">Perks, Rules &amp; Hackathon Guidelines</h2>
        <p className="lv-section-sub">
          Whether you choose the fast, beginner-friendly Onsite Track in Lahore or the 24-Hour Virtual Marathon worldwide, review your track perks and official event rules below.
        </p>
      </div>

      {/* Perks Side-by-Side Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Onsite Track Card */}
        <div className="bg-orange-50/70 border-3 border-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#1a1a1a]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-500 text-white rounded-xl border-2 border-black flex items-center justify-center font-black">
              <Zap size={22} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-900">Lahore, Pakistan</span>
              <h3 className="font-black text-xl text-black font-['Epilogue']">Why Onsite Is the Beginner-Friendly Path</h3>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 font-medium mb-5 leading-relaxed">
            Going onsite is the simplest way to take part in LoopVerse 3.0. It&apos;s a short, focused sprint with approachable problem statements written for first-time hackathon participants, ready-made infrastructure, and same-day results.
          </p>
          <ul className="space-y-2.5">
            {ONSITE_PERKS.map((perk, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-black">
                <CheckCircle2 size={16} className="text-orange-600 shrink-0 mt-0.5" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Virtual Track Card */}
        <div className="bg-purple-50/70 border-3 border-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#1a1a1a]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-600 text-white rounded-xl border-2 border-black flex items-center justify-center font-black">
              <Globe size={22} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900">Worldwide Remote</span>
              <h3 className="font-black text-xl text-black font-['Epilogue']">Why Virtual Is the Tougher, Longer Challenge</h3>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 font-medium mb-5 leading-relaxed">
            The virtual track is built for teams who want a bigger challenge. It runs a full 24 hours — starting Friday 11:59 AM to Saturday 11:59 AM — with more advanced problem statements and remote mentor touchpoints.
          </p>
          <ul className="space-y-2.5">
            {VIRTUAL_PERKS.map((perk, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-black">
                <CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Rules & Guidelines Grid */}
      <div className="bg-white border-3 border-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#1a1a1a]">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black/10">
          <ShieldCheck size={26} className="text-purple-700" />
          <h3 className="font-black text-2xl text-black font-['Epilogue']">Official Hackathon Rules &amp; Guidelines</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RULES_LIST.map((r, idx) => (
            <div key={idx} className="p-4 bg-gray-50 border-2 border-black rounded-xl shadow-[2px_2px_0px_#1a1a1a]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 bg-black text-white rounded-full font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <h4 className="font-bold text-sm text-black">{r.title}</h4>
              </div>
              <p className="text-xs text-gray-700 font-medium leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
