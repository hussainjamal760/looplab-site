'use client';

import { CheckCircle2, ShieldCheck, Zap, Globe, Users, Award, AlertCircle, FileCheck2, Sparkles } from 'lucide-react';

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
    tag: 'Composition',
    title: 'Team Size & Eligibility',
    desc: 'Teams of 2 to 4 members; solo participation is allowed. Open to students and early-career developers, designers, and product builders — no prior hackathon experience needed.'
  },
  {
    tag: 'Integrity',
    title: 'Code Originality & Window',
    desc: 'All code must be written during the hackathon window; pre-built projects are strictly not eligible.'
  },
  {
    tag: 'Dependencies',
    title: 'Open Source & Public APIs',
    desc: 'Use of open-source libraries and public APIs is permitted; cite them clearly in your submission.'
  },
  {
    tag: 'AI Tools',
    title: 'AI Tool Disclosure',
    desc: 'Use of AI tools (e.g., ChatGPT, Copilot, Claude) is allowed to assist with your build; disclose significant AI-generated code or content in your submission.'
  },
  {
    tag: 'Submission',
    title: 'Demo & Deadlines',
    desc: 'Every team must submit a working demo. Onsite teams deliver a live pitch before 5:00 PM. Virtual teams submit via the online portal before Saturday 11:59 AM.'
  },
  {
    tag: 'Governance',
    title: 'Code of Conduct',
    desc: 'Respect the LoopLab Code of Conduct; harassment, plagiarism, or unsportsmanlike behavior results in immediate disqualification.'
  }
];

export default function RulesAndPerksSection() {
  return (
    <section className="lv-rules-perks-section py-20" id="rules">
      {/* Section Header */}
      <div className="lv-section-header mb-14 text-center">
        <span className="lv-section-tag">Track Experience &amp; Governance</span>
        <h2 className="lv-section-title">Perks &amp; Hackathon Rules</h2>
        <p className="lv-section-sub">
          Compare the Onsite vs Virtual track perks and review official LoopVerse 3.0 competition guidelines.
        </p>
      </div>

      {/* Perks Side-by-Side Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        {/* Onsite Card */}
        <div className="bg-[#fff9f4] border-3 border-[#1a1a1a] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#1a1a1a] hover:-translate-y-1 transition-all">
          <div className="flex items-center gap-3.5 mb-5 pb-4 border-b-2 border-[#1a1a1a]/10">
            <div className="w-12 h-12 bg-[#f5693c] text-white rounded-2xl border-2 border-[#1a1a1a] flex items-center justify-center font-black shadow-[2px_2px_0px_#1a1a1a]">
              <Zap size={24} />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-orange-950 bg-orange-200 px-2.5 py-0.5 rounded-full border border-[#1a1a1a]">
                Lahore, Pakistan
              </span>
              <h3 className="font-black text-2xl text-[#1a1a1a] font-['Epilogue'] mt-1">Why Onsite Is Beginner-Friendly</h3>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 font-medium mb-6 leading-relaxed">
            Going onsite is the simplest way into LoopVerse 3.0. A short, focused sprint with approachable briefs, in-person floor mentors, workstations, food, and same-day awards.
          </p>
          <ul className="space-y-3">
            {ONSITE_PERKS.map((perk, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-bold text-[#1a1a1a]">
                <CheckCircle2 size={18} className="text-[#f5693c] shrink-0 mt-0.5" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Virtual Card */}
        <div className="bg-[#fcf8ff] border-3 border-[#1a1a1a] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#1a1a1a] hover:-translate-y-1 transition-all">
          <div className="flex items-center gap-3.5 mb-5 pb-4 border-b-2 border-[#1a1a1a]/10">
            <div className="w-12 h-12 bg-[#9E00FE] text-white rounded-2xl border-2 border-[#1a1a1a] flex items-center justify-center font-black shadow-[2px_2px_0px_#1a1a1a]">
              <Globe size={24} />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-purple-950 bg-purple-200 px-2.5 py-0.5 rounded-full border border-[#1a1a1a]">
                Worldwide Remote
              </span>
              <h3 className="font-black text-2xl text-[#1a1a1a] font-['Epilogue'] mt-1">Why Virtual Is a Tougher Marathon</h3>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 font-medium mb-6 leading-relaxed">
            The virtual track is built for remote teams wanting a bigger challenge. A full 24-hour window from Fri 11:59 AM to Sat 11:59 AM with higher-ceiling briefs and async mentor support.
          </p>
          <ul className="space-y-3">
            {VIRTUAL_PERKS.map((perk, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-bold text-[#1a1a1a]">
                <CheckCircle2 size={18} className="text-[#9E00FE] shrink-0 mt-0.5" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Official Rules Showcase Grid */}
      <div className="bg-white border-3 border-[#1a1a1a] rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#1a1a1a]">
        <div className="flex items-center gap-3 mb-8 pb-5 border-b-2 border-[#1a1a1a]/10">
          <ShieldCheck size={28} className="text-[#9E00FE]" />
          <div>
            <h3 className="font-black text-2xl sm:text-3xl text-[#1a1a1a] font-['Epilogue']">Official Competition Rules</h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">Mandatory guidelines for all onsite and virtual participants</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RULES_LIST.map((r, idx) => (
            <div key={idx} className="p-5 bg-[#f9f6f0] border-2 border-[#1a1a1a] rounded-2xl shadow-[3px_3px_0px_#1a1a1a] hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 bg-[#1a1a1a] text-white rounded-full font-black text-xs flex items-center justify-center">
                  0{idx + 1}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full border border-[#1a1a1a]">
                  {r.tag}
                </span>
              </div>
              <h4 className="font-black text-base text-[#1a1a1a] font-['Epilogue'] mb-1.5">{r.title}</h4>
              <p className="text-xs text-gray-700 font-medium leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
