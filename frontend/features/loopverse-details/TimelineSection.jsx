'use client';

import { useState } from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const ONSITE_SCHEDULE = [
  { time: '10:45 – 11:15 AM', segment: '1. Registration & Arrivals', details: 'Participants check in and settle into their module tables.' },
  { time: '11:15 – 11:30 AM', segment: '2. Kickoff & Briefing', details: 'Problem statements, rules, and mentor introductions.' },
  { time: '11:30 AM – 1:30 PM', segment: '3. Build Sprint — Block 1', details: 'First build block across all seven modules.' },
  { time: '1:30 – 2:00 PM', segment: '4. Prayer Break', details: 'Break for prayer before the second build block.' },
  { time: '2:00 – 4:00 PM', segment: '5. Build Sprint — Block 2', details: 'Second build block; teams finalize submissions.' },
  { time: '4:00 – 5:00 PM', segment: '6. Judging & Evaluations', details: 'Mentors and judges review project submissions.' },
  { time: '5:00 – 5:30 PM', segment: '7. Closing Ceremony & Awards', details: 'Winners announced across all seven modules; prize distribution.' },
];

const VIRTUAL_SCHEDULE = [
  { time: 'Fri, 9 Oct · 11:59 AM', segment: '1. Opening & Problem Release', details: 'Livestreamed kickoff; problem statements released for all modules.' },
  { time: 'Fri, 9 Oct · 12:00 PM', segment: '2. Building Begins', details: 'Teams start building remotely from wherever they are.' },
  { time: 'Fri, 9 Oct · 2:00 PM', segment: '3. Async Mentor Office Hours', details: 'Call-in mentor support for teams who need a nudge.' },
  { time: 'Fri, 9 Oct · 6:00 PM', segment: '4. Mid-Point Check-In', details: 'Optional chat/call check-in with mentors on progress.' },
  { time: 'Fri, 9 Oct · 10:00 PM', segment: '5. Evening Progress Check-In', details: 'Quick async status check before the overnight stretch.' },
  { time: 'Sat, 10 Oct · 2:00 AM', segment: '6. Overnight Building', details: 'Teams continue at their own pace and time zone.' },
  { time: 'Sat, 10 Oct · 9:00 AM', segment: '7. Final Touches & Submission Prep', details: 'Wrap up builds and prepare submission materials.' },
  { time: 'Sat, 10 Oct · 11:00 AM', segment: '8. Final Mentor Call', details: 'Last chance to ask mentors questions before the deadline.' },
  { time: 'Sat, 10 Oct · 11:59 AM', segment: '9. Submissions Close', details: 'All submissions due across every module — exactly 24 hours in.' },
];

const ONSITE_GLANCE = [
  { label: 'Event Hours', val: '10:45 AM – 5:30 PM' },
  { label: 'Total Duration', val: '6h 45m' },
  { label: 'Build Sprint Time', val: '4 Hours (2 blocks)' },
  { label: 'Prayer Break', val: '30 Min' },
  { label: 'Evaluation Window', val: '1 Hour' },
  { label: 'Closing & Awards', val: '30 Min' },
];

const VIRTUAL_GLANCE = [
  { label: 'Event Window', val: 'Fri, 9 Oct 11:59 AM – Sat, 10 Oct 11:59 AM' },
  { label: 'Total Duration', val: '24 Hours' },
  { label: 'Format', val: 'Fully Remote (Worldwide)' },
  { label: 'Mentor Touchpoints', val: '3 (Office Hours, Mid-Point, Final Call)' },
  { label: 'Evaluation Window', val: '1 Week' },
  { label: 'Results Announced', val: 'On/around Sat, 17 Oct 2026' },
];

export default function TimelineSection() {
  const [selectedTrack, setSelectedTrack] = useState('onsite');
  const schedule = selectedTrack === 'onsite' ? ONSITE_SCHEDULE : VIRTUAL_SCHEDULE;
  const glance = selectedTrack === 'onsite' ? ONSITE_GLANCE : VIRTUAL_GLANCE;

  return (
    <section className="lv-timeline-section" id="timeline">
      <div className="lv-section-header">
        <span className="lv-section-tag">Hour By Hour</span>
        <h2 className="lv-section-title">Official Event Timelines</h2>
        <p className="lv-section-sub">
          Friday, 9 October 2026 — Exact schedule details for both the single-day Onsite Runway in Lahore and the continuous 24-Hour Virtual Marathon worldwide.
        </p>
      </div>

      {/* Toggle Buttons */}
      <div className="lv-timeline-toggle-wrap">
        <div className="lv-timeline-toggle">
          <button
            type="button"
            className={`lv-toggle-btn ${selectedTrack === 'onsite' ? 'lv-toggle-btn--active' : ''}`}
            onClick={() => setSelectedTrack('onsite')}
          >
            ⚡ Onsite Track (6h 45m · 7 Modules)
          </button>
          <button
            type="button"
            className={`lv-toggle-btn ${selectedTrack === 'virtual' ? 'lv-toggle-btn--active' : ''}`}
            onClick={() => setSelectedTrack('virtual')}
          >
            🌐 Virtual Track (24 Hours · 5 Modules)
          </button>
        </div>
      </div>

      {/* At a Glance Grid */}
      <div className="lv-glance-grid mb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {glance.map((g, idx) => (
          <div key={idx} className="p-3 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_#1a1a1a]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-purple-700">{g.label}</div>
            <div className="text-xs font-black text-black mt-1">{g.val}</div>
          </div>
        ))}
      </div>

      {/* Schedule Table */}
      <div className="lv-timeline-card">
        <table className="lv-timeline-table">
          <thead>
            <tr>
              <th style={{ width: '28%' }}>Time (Lahore Local)</th>
              <th style={{ width: '32%' }}>Segment</th>
              <th>What Happens</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, idx) => (
              <tr key={idx}>
                <td className="lv-time-cell">
                  <span className="w-full h-10 px-3 shrink-0 flex items-center justify-center border-2 border-black rounded-xl bg-purple-100 font-bold text-xs sm:text-sm text-black shadow-[2px_2px_0px_#1a1a1a]">
                    <Clock size={14} className="mr-1.5 text-purple-700 shrink-0" />
                    {row.time}
                  </span>
                </td>
                <td className="font-bold text-black text-sm">{row.segment}</td>
                <td className="lv-activity-cell text-xs sm:text-sm">{row.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note Banner */}
      <div className="mt-4 p-3.5 bg-amber-50 border-2 border-black rounded-xl flex items-start gap-3 shadow-[3px_3px_0px_#1a1a1a]">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm font-medium text-amber-900 leading-relaxed">
          {selectedTrack === 'onsite' ? (
            <>
              <strong>Onsite Check-in Note:</strong> Check-in opens at <strong>10:45 AM sharp</strong> at the Lahore venue. Teams arriving after the 11:30 AM kickoff should still register but may miss the opening briefing.
            </>
          ) : (
            <>
              <strong>Virtual Fixed Window:</strong> The 24-hour window (Fri 9 Oct 11:59 AM → Sat 10 Oct 11:59 AM) is fixed and the same for every team regardless of time zone. Convert Lahore local time to your own time zone accordingly.
            </>
          )}
        </p>
      </div>
    </section>
  );
}
