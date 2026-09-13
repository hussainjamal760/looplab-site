'use client';

import {
  BadgeCheck,
  ArrowRight,
} from 'lucide-react';

import HeroBanner from './HeroBanner';
import ModulesFeatures2 from './ModulesFeatures2';
import Features10CirclePhases from './Features10CirclePhases';
import AnimatedTechRunnerPrizes from './AnimatedTechRunnerPrizes';
import LoopverseCtaBanner from './LoopverseCtaBanner';

import '@/app/styles/loopverse-details.css';

export default function LoopverseDetailsView() {
  return (
    <div className="lv-details-page">
      <div className="lv-container">
        {/* Hero banner */}

        <HeroBanner />

        {/* Registration and certificate buttons */}

        <section className="lv-primary-actions">
          <div className="lv-primary-actions__text">
            <span className="lv-primary-actions__eyebrow">
              LOOPVERSE 3.0
            </span>

            <h2>
              Ready to enter the loop?
            </h2>

            <p>
              Register for Loopverse 3.0
              or verify an officially
              issued LoopLab certificate.
            </p>
          </div>

          <div className="lv-primary-actions__buttons">
            <a
              href="/loopverse/register"
              className="lv-action-button lv-action-button--primary"
            >
              Register Now
              <ArrowRight size={18} />
            </a>

            <a
              href="/certificate"
              className="lv-action-button lv-action-button--certificate"
            >
              <BadgeCheck size={18} />
              Verify Certificate
            </a>
          </div>
        </section>

        {/* Competition modules */}

        <ModulesFeatures2 />

        {/* Onsite and virtual journey */}

        <Features10CirclePhases />

        {/* Prizes section */}

        <AnimatedTechRunnerPrizes />

        {/* Registration CTA banner */}

        <LoopverseCtaBanner />

        {/* Closing philosophy */}

        <div className="lv-philosophy-box">
          <div className="lv-infinity-tag">
            ∞
          </div>

          <p className="lv-philosophy-eyebrow">
            See You In The Loop
          </p>

          <h2 className="lv-philosophy-title">
            &ldquo;Idea. Build. Ship.
            Repeat.&rdquo;
          </h2>

          <p className="lv-philosophy-description">
            Seven modules, two tracks,
            one loop. Whether you&apos;re
            building shoulder to shoulder
            onsite in Lahore or coding
            through the night with a
            remote squad, Loopverse 3.0
            is waiting for you to bring
            your idea to life.
          </p>
        </div>
      </div>
    </div>
  );
}