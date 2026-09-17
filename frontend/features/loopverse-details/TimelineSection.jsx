'use client';

import { useState } from 'react';
import { Clock, Zap, Globe, AlertCircle } from 'lucide-react';

const ONSITE_SCHEDULE = [
  { step: '1', time: '10:45 – 11:15 AM', segment: 'Registration & Arrivals', details: 'Participants check in at venue and settle into their assigned module tables.' },
  { step: '2', time: '11:15 – 11:30 AM', segment: 'Kickoff & Briefing', details: 'Problem statements released, competition rules reviewed, and mentor floor introductions.' },
  { step: '3', time: '11:30 AM – 1:30 PM', segment: 'Build Sprint — Block 1', details: 'First 2-hour continuous build block across all seven onsite competition modules.' },
  { step: '4', time: '1:30 – 2:00 PM', segment: 'Prayer Break', details: 'Mid-day break for prayer and relaxation before the second build sprint.' },
  { step: '5', time: '2:00 – 4:00 PM', segment: 'Build Sprint — Block 2', details: 'Second 2-hour build block; teams complete code, refine demos, and finalize submissions.' },
  { step: '6', time: '4:00 – 5:00 PM', segment: 'Judging & Evaluations', details: 'Mentors and guest VC judges review live project demos and evaluate submissions.' },
  { step: '7', time: '5:00 – 5:30 PM', segment: 'Closing Ceremony & Awards', details: 'Onsite champions crowned across all seven modules; trophy and swag distribution.' },
];

const VIRTUAL_SCHEDULE = [
  { step: '1', time: 'Fri, 9 Oct · 11:59 AM', segment: 'Opening & Problem Release', details: 'Livestreamed opening ceremony; advanced problem briefs released for all virtual modules.' },
  { step: '2', time: 'Fri, 9 Oct · 12:00 PM', segment: 'Building Begins', details: 'Teams start building remotely from wherever they are in the world.' },
  { step: '3', time: 'Fri, 9 Oct · 2:00 PM', segment: 'Async Mentor Office Hours', details: 'Dedicated call-in mentor support for teams needing technical guidance.' },
  { step: '4', time: 'Fri, 9 Oct · 6:00 PM', segment: 'Mid-Point Check-In', details: 'Optional chat/call check-in with mentors to review progress and roadblocks.' },
  { step: '5', time: 'Fri, 9 Oct · 10:00 PM', segment: 'Evening Progress Check-In', details: 'Quick async status check before entering the overnight building stretch.' },
  { step: '6', time: 'Sat, 10 Oct · 2:00 AM', segment: 'Overnight Building', details: 'Teams continue building at their own pace across global time zones.' },
  { step: '7', time: 'Sat, 10 Oct · 9:00 AM', segment: 'Final Touches & Prep', details: 'Wrap up project builds, record 3-min demo video, and prepare repository links.' },
  { step: '8', time: 'Sat, 10 Oct · 11:00 AM', segment: 'Final Mentor Call', details: 'Last chance to ask mentors questions before the hard submission cutoff.' },
  { step: '9', time: 'Sat, 10 Oct · 11:59 AM', segment: 'Submissions Close', details: 'All submissions due across every module — exactly 24 hours from kickoff.' },
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
    <section className="lv-timeline-section" id="timeline">
      {/* Section Header */}
      <div className="lv-section-header">
        <span className="lv-section-tag">Hour By Hour Runway</span>
        <h2 className="lv-section-title">Official Event Timelines</h2>
        <p className="lv-section-sub">
          Friday, 9 October 2026 — Schedule details for both the single-day Onsite Runway in Lahore and the continuous 24-Hour Virtual Marathon.
        </p>
      </div>

      {/* Track Selector */}
      <div className="lv-timeline-toggle-wrap">
        <div className="lv-timeline-toggle">
          <button
            type="button"
            className={`lv-toggle-btn${selectedTrack === 'onsite' ? ' lv-toggle-btn--active' : ''}`}
            onClick={() => setSelectedTrack('onsite')}
          >
            <Zap size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
            Onsite Track (6h 45m · Lahore)
          </button>
          <button
            type="button"
            className={`lv-toggle-btn${selectedTrack === 'virtual' ? ' lv-toggle-btn--active' : ''}`}
            onClick={() => setSelectedTrack('virtual')}
          >
            <Globe size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
            Virtual Track (24 Hours · Worldwide)
          </button>
        </div>
      </div>

      {/* At a Glance Stats */}
      <div className="lv-timeline-glance-grid">
        {glance.map((g, idx) => (
          <div key={idx} className="lv-timeline-glance-card">
            <div className="lv-timeline-glance-label">{g.label}</div>
            <div className="lv-timeline-glance-val">{g.val}</div>
          </div>
        ))}
      </div>

      {/* Timeline Steps */}
      <div className="lv-timeline-card">
        <div className="lv-timeline-steps">
          {schedule.map((item, idx) => (
            <div key={idx} className="lv-timeline-step">
              <div className="lv-timeline-step-dot">{item.step}</div>
              <div className="lv-timeline-step-body">
                <div className="lv-timeline-step-header">
                  <span className="lv-timeline-time-badge">
                    <Clock size={12} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
                    {item.time}
                  </span>
                  <span className="lv-timeline-step-title">{item.segment}</span>
                </div>
                <p className="lv-timeline-step-desc">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div className="lv-timeline-notice">
        <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 2 }} color="var(--color-orange, #f5693c)" />
        <p className="lv-timeline-notice-text">
          {selectedTrack === 'onsite' ? (
            <>
              <strong>Onsite Check-in Note:</strong> Check-in opens at <strong>10:45 AM sharp</strong> at the Lahore venue. Teams arriving after 11:30 AM kickoff may miss the opening briefing.
            </>
          ) : (
            <>
              <strong>Virtual Schedule Note:</strong> The 24-hour window (Fri 9 Oct 11:59 AM → Sat 10 Oct 11:59 AM) is fixed and the same for every team regardless of time zone.
            </>
          )}
        </p>
      </div>
    </section>
  );
}
