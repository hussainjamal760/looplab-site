'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Zap, Globe, AlertCircle, CheckCircle2, CalendarDays, Timer, Flame } from 'lucide-react';

const ONSITE_SCHEDULE = [
  { step: '01', time: '10:45 – 11:15 AM', segment: 'Registration & Arrivals', details: 'Participants check in at venue and settle into their assigned module tables.' },
  { step: '02', time: '11:15 – 11:30 AM', segment: 'Kickoff & Briefing', details: 'Problem statements released, competition rules reviewed, and mentor floor introductions.' },
  { step: '03', time: '11:30 AM – 1:30 PM', segment: 'Build Sprint — Block 1', details: 'First 2-hour continuous build block across all seven onsite competition modules.' },
  { step: '04', time: '1:30 – 2:00 PM', segment: 'Prayer Break', details: 'Mid-day break for prayer and relaxation before the second build sprint.' },
  { step: '05', time: '2:00 – 4:00 PM', segment: 'Build Sprint — Block 2', details: 'Second 2-hour build block; teams complete code, refine demos, and finalize submissions.' },
  { step: '06', time: '4:00 – 5:00 PM', segment: 'Judging & Evaluations', details: 'Mentors and guest VC judges review live project demos and evaluate submissions.' },
  { step: '07', time: '5:00 – 5:30 PM', segment: 'Closing Ceremony & Awards', details: 'Onsite champions crowned across all seven modules; trophy and swag distribution.' },
];

const VIRTUAL_SCHEDULE = [
  { step: '01', time: 'Fri, 9 Oct · 11:59 AM', segment: 'Opening & Problem Release', details: 'Livestreamed opening ceremony; advanced problem briefs released for all virtual modules.' },
  { step: '02', time: 'Fri, 9 Oct · 12:00 PM', segment: 'Building Begins', details: 'Teams start building remotely from wherever they are in the world.' },
  { step: '03', time: 'Fri, 9 Oct · 2:00 PM', segment: 'Async Mentor Office Hours', details: 'Dedicated call-in mentor support for teams needing technical guidance.' },
  { step: '04', time: 'Fri, 9 Oct · 6:00 PM', segment: 'Mid-Point Check-In', details: 'Optional chat/call check-in with mentors to review progress and roadblocks.' },
  { step: '05', time: 'Fri, 9 Oct · 10:00 PM', segment: 'Evening Progress Check-In', details: 'Quick async status check before entering the overnight building stretch.' },
  { step: '06', time: 'Sat, 10 Oct · 2:00 AM', segment: 'Overnight Building', details: 'Teams continue building at their own pace across global time zones.' },
  { step: '07', time: 'Sat, 10 Oct · 9:00 AM', segment: 'Final Touches & Prep', details: 'Wrap up project builds, record 3-min demo video, and prepare repository links.' },
  { step: '08', time: 'Sat, 10 Oct · 11:00 AM', segment: 'Final Mentor Call', details: 'Last chance to ask mentors questions before the hard submission cutoff.' },
  { step: '09', time: 'Sat, 10 Oct · 11:59 AM', segment: 'Submissions Close', details: 'All submissions due across every module — exactly 24 hours from kickoff.' },
];

const ONSITE_GLANCE = [
  { label: 'Event Hours', val: '10:45 AM – 5:30 PM' },
  { label: 'Total Duration', val: '6h 45m Runway' },
  { label: 'Build Sprint', val: '4 Hours (2 Blocks)' },
  { label: 'Prayer Break', val: '30 Minutes' },
  { label: 'Evaluation Window', val: '1 Hour Live' },
  { label: 'Awards Ceremony', val: '30 Minutes' },
];

const VIRTUAL_GLANCE = [
  { label: 'Event Window', val: 'Fri 11:59 AM – Sat 11:59 AM' },
  { label: 'Total Duration', val: '24 Hours Continuous' },
  { label: 'Format', val: '100% Worldwide Remote' },
  { label: 'Mentor Touchpoints', val: '3 Scheduled Calls' },
  { label: 'Evaluation Window', val: '1 Week Review' },
  { label: 'Results Date', val: 'Sat, 17 Oct 2026' },
];

export default function TimelineSection() {
  const [selectedTrack, setSelectedTrack] = useState('onsite');
  const schedule = selectedTrack === 'onsite' ? ONSITE_SCHEDULE : VIRTUAL_SCHEDULE;
  const glance = selectedTrack === 'onsite' ? ONSITE_GLANCE : VIRTUAL_GLANCE;

  return (
    <section className="lv-timeline-section py-20" id="timeline">
      {/* Section Header */}
      <div className="lv-section-header mb-12 text-center">
        <span className="lv-section-tag">Hour By Hour Runway</span>
        <h2 className="lv-section-title">Official Event Timelines</h2>
        <p className="lv-section-sub">
          Friday, 9 October 2026 — Complete milestone breakdown for both the single-day Onsite Runway in Lahore and the continuous 24-Hour Virtual Marathon.
        </p>
      </div>

      {/* Track Selector Bar */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1.5 bg-white border-3 border-[#1a1a1a] rounded-2xl shadow-[4px_4px_0px_#1a1a1a]">
          <button
            type="button"
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs sm:text-sm transition-all ${
              selectedTrack === 'onsite'
                ? 'bg-[#f5693c] text-white shadow-[2px_2px_0px_#1a1a1a]'
                : 'text-[#1a1a1a] hover:bg-orange-50'
            }`}
            onClick={() => setSelectedTrack('onsite')}
          >
            <Zap size={16} /> ⚡ Onsite Track (6h 45m · Lahore)
          </button>
          <button
            type="button"
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs sm:text-sm transition-all ${
              selectedTrack === 'virtual'
                ? 'bg-[#9E00FE] text-white shadow-[2px_2px_0px_#1a1a1a]'
                : 'text-[#1a1a1a] hover:bg-purple-50'
            }`}
            onClick={() => setSelectedTrack('virtual')}
          >
            <Globe size={16} /> 🌐 Virtual Track (24 Hours · Worldwide)
          </button>
        </div>
      </div>

      {/* At a Glance Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-12">
        {glance.map((g, idx) => (
          <div key={idx} className="p-4 bg-white border-2 border-[#1a1a1a] rounded-2xl shadow-[3px_3px_0px_#1a1a1a] hover:-translate-y-1 transition-all">
            <div className="text-[10px] font-black uppercase tracking-wider text-[#9E00FE]">{g.label}</div>
            <div className="text-xs sm:text-sm font-black text-[#1a1a1a] mt-1.5 font-['Epilogue']">{g.val}</div>
          </div>
        ))}
      </div>

      {/* Interactive Milestone Runway */}
      <div className="bg-white border-3 border-[#1a1a1a] rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#1a1a1a]">
        <div className="relative border-l-3 border-[#1a1a1a] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8 my-2">
          {schedule.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="relative group"
            >
              {/* Timeline Node Dot */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#ffd166] text-[#1a1a1a] border-2 border-[#1a1a1a] rounded-full font-black text-xs sm:text-sm flex items-center justify-center shadow-[2px_2px_0px_#1a1a1a] group-hover:scale-110 transition-transform">
                {item.step}
              </div>

              {/* Milestone Card */}
              <div className="bg-[#f9f6f0] border-2 border-[#1a1a1a] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#1a1a1a] group-hover:-translate-y-0.5 transition-transform">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#9E00FE] text-white rounded-full font-black text-xs shadow-[1.5px_1.5px_0px_#1a1a1a] w-fit">
                    <Clock size={13} /> {item.time}
                  </span>
                  <h4 className="font-black text-base sm:text-lg text-[#1a1a1a] font-['Epilogue']">{item.segment}</h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">{item.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Note Alert Banner */}
      <div className="mt-6 p-4 bg-amber-50 border-2 border-[#1a1a1a] rounded-2xl flex items-start gap-3.5 shadow-[4px_4px_0px_#1a1a1a]">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm font-semibold text-amber-950 leading-relaxed">
          {selectedTrack === 'onsite' ? (
            <>
              <strong>Onsite Check-in Notice:</strong> Check-in opens at <strong>10:45 AM sharp</strong> at the Lahore venue. Teams arriving after the 11:30 AM kickoff should still register but may miss the opening briefing.
            </>
          ) : (
            <>
              <strong>Virtual Schedule Notice:</strong> The 24-hour window (Fri 9 Oct 11:59 AM → Sat 10 Oct 11:59 AM) is fixed and the same for every team regardless of time zone. Convert Lahore local time to your own time zone accordingly.
            </>
          )}
        </p>
      </div>
    </section>
  );
}
