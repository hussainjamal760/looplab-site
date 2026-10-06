'use client';

import { Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoopverseRegistrationForm() {
  return (
    <section className="lv-registration-section" id="loopverse-registration">
      <div className="lv-registration-heading" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '2px solid rgba(239, 68, 68, 0.4)',
            color: '#ef4444',
            marginBottom: '16px',
          }}
        >
          <Lock size={32} />
        </div>

        <p className="lv-registration-eyebrow" style={{ color: '#ef4444' }}>
          REGISTRATION PORTAL CLOSED
        </p>

        <h2>
          Registrations are <span>Closed.</span>
        </h2>

        <p style={{ maxWidth: '540px', margin: '0 auto 24px', color: '#a1a1aa' }}>
          Registrations for Loopverse 3.0 have officially ended. Thank you to everyone who registered! No further form submissions are allowed.
        </p>

        <Link
          href="/loopverse"
          className="lv-action-button lv-action-button--primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
        >
          Explore Loopverse 3.0 <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}