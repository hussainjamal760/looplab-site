'use client';

import { useState } from 'react';
import { Clock } from 'lucide-react';

const ONSITE_SCHEDULE = [
  { time: '10:00 AM', event: 'Registration & Kick-off' },
  { time: '10:30 AM', event: 'Team huddle + problem statement release (beginner friendly briefs)' },
  { time: '11:00 AM', event: 'Building begins' },
  { time: '01:00 PM', event: 'Lunch + in-person mentor rounds' },
  { time: '03:00 PM', event: 'Mid-point mentor check-in' },
  { time: '04:00 PM', event: 'Final touches & submission prep' },
  { time: '04:30 PM', event: 'Live pitches to judges' },
  { time: '05:00 PM', event: 'Onsite winners announced & award ceremony' },
];

const VIRTUAL_SCHEDULE = [
  { time: 'Day 1 · 10:00 AM', event: 'Opening ceremony (livestream)' },
  { time: 'Day 1 · 10:30 AM', event: 'Advanced problem statement release (harder briefs)' },
  { time: 'Day 1 · 11:00 AM', event: 'Building begins' },
  { time: 'Day 1 · 01:00 PM', event: 'Async mentor office hours (call-in)' },
  { time: 'Day 1 · 03:00 PM', event: 'Mid-point check-in (chat/video)' },
  { time: 'Day 1 · 05:00 PM', event: 'Evening progress check-in' },
  { time: 'Day 1 · 10:00 PM', event: 'Overnight self-paced building' },
  { time: 'Day 2 · 09:00 AM', event: 'Final touches & submission prep' },
  { time: 'Day 2 · 11:00 AM', event: 'Final mentor call & wrap-up' },
  { time: 'Day 2 · 12:00 PM', event: 'Virtual submissions close & winners announced' },
];

export default function TimelineSection() {
  const [selectedTrack, setSelectedTrack] = useState('onsite');
  const schedule = selectedTrack === 'onsite' ? ONSITE_SCHEDULE : VIRTUAL_SCHEDULE;

  return (
    <section className="lv-timeline-section" id="timeline">
      <div className="lv-section-header">
        <span className="lv-section-tag">Hour By Hour</span>
        <h2 className="lv-section-title">Detailed Timeline</h2>
        <p className="lv-section-sub">
          Times shown in venue local time (Lahore, Pakistan). Calibrated to deliver the best sprint experience.
        </p>
      </div>

      <div className="lv-timeline-toggle-wrap">
        <div className="lv-timeline-toggle">
          <button
            type="button"
            className={`lv-toggle-btn ${selectedTrack === 'onsite' ? 'lv-toggle-btn--active' : ''}`}
            onClick={() => setSelectedTrack('onsite')}
          >
            ⚡ Onsite Track (7 Hours)
          </button>
          <button
            type="button"
            className={`lv-toggle-btn ${selectedTrack === 'virtual' ? 'lv-toggle-btn--active' : ''}`}
            onClick={() => setSelectedTrack('virtual')}
          >
            🌐 Virtual Track (~26 Hours)
          </button>
        </div>
      </div>

      <div className="lv-timeline-card">
        <table className="lv-timeline-table">
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Time</th>
              <th>Milestone / Activity</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, idx) => (
              <tr key={idx}>
                <td className="lv-time-cell">
                  <span className="w-32 h-10 shrink-0 flex items-center justify-center border-2 border-black rounded-xl bg-purple-100 font-bold text-xs sm:text-sm text-black shadow-[2px_2px_0px_#1a1a1a]">
                    <Clock size={14} className="mr-1.5 text-purple-700 shrink-0" />
                    {row.time}
                  </span>
                </td>
                <td className="lv-activity-cell">{row.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
