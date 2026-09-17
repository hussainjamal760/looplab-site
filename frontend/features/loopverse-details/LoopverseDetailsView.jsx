'use client';

import { BadgeCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import HeroBanner from './HeroBanner';
import ModulesFeatures2 from './ModulesFeatures2';
import MarkingCriteriaSection from './MarkingCriteriaSection';
import Features10CirclePhases from './Features10CirclePhases';
import TimelineSection from './TimelineSection';
import RulesAndPerksSection from './RulesAndPerksSection';
import AnimatedTechRunnerPrizes from './AnimatedTechRunnerPrizes';
import PrizesAndContact from './PrizesAndContact';
import LoopverseCtaBanner from './LoopverseCtaBanner';

import '@/app/styles/loopverse-details.css';

export default function LoopverseDetailsView() {
  return (
    <div className="lv-details-page">
      <div className="lv-container">
        {/* 1. Hero Banner */}
        <HeroBanner />

        {/* 2. Primary Action Bar */}
        <section className="lv-primary-actions">
          <div className="lv-primary-actions__text">
            <span className="lv-primary-actions__eyebrow">
              LOOPVERSE 3.0 · ONSITE &amp; VIRTUAL TRACKS
            </span>
            <h2>Ready to enter the loop?</h2>
            <p>
              Register for LoopVerse 3.0 (Onsite Lahore or Virtual Worldwide) or verify an officially issued LoopLab certificate.
            </p>
          </div>

          <div className="lv-primary-actions__buttons">
            <Link
              href="/loopverse/register"
              className="lv-action-button lv-action-button--primary"
            >
              Register Now
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/certificate"
              className="lv-action-button lv-action-button--certificate"
            >
              <BadgeCheck size={18} />
              Verify Certificate
            </Link>
          </div>
        </section>

        {/* 3. Competition Modules */}
        <ModulesFeatures2 />

        {/* 4. Marking Criteria & Submission Formats */}
        <MarkingCriteriaSection />

        {/* 5. Orbital Journey Phases */}
        <Features10CirclePhases />

        {/* 6. Detailed Hour-by-Hour Timeline */}
        <TimelineSection />

        {/* 7. Perks & Official Rules */}
        <RulesAndPerksSection />

        {/* 8. Mascot Trophy Animation */}
        <AnimatedTechRunnerPrizes />

        {/* 9. Prize Pool & Official Contacts */}
        <PrizesAndContact />

        {/* 10. Registration CTA Banner */}
        <LoopverseCtaBanner />

        {/* 11. Closing Philosophy */}
        <div className="lv-philosophy-box">
          <div className="lv-infinity-tag">∞</div>
          <p className="lv-philosophy-eyebrow">See You In The Loop</p>
          <h2 className="lv-philosophy-title">&ldquo;Idea. Build. Ship. Repeat.&rdquo;</h2>
          <p className="lv-philosophy-description">
            Seven modules, two tracks, one loop. Whether you&apos;re building shoulder to shoulder onsite in Lahore or coding through the 24-hour continuous window with a remote squad worldwide, LoopVerse 3.0 is waiting for you to bring your idea to life.
          </p>
        </div>
      </div>
    </div>
  );
}