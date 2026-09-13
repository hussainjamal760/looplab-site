'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Trophy, Users, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LoopverseCtaBanner() {
  return (
    <section className="lv-cta-banner-section" id="loopverse-registration" style={{ padding: '80px 0 60px' }}>
      <motion.div
        className="lv-cta-banner-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          background: 'linear-gradient(135deg, #18092B 0%, #2A0845 50%, #11052C 100%)',
          border: '3px solid #1a1a1a',
          borderRadius: '28px',
          padding: '60px 40px',
          color: '#ffffff',
          boxShadow: '10px 10px 0 #1a1a1a',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            background: 'rgba(234, 210, 255, 0.15)',
            border: '1.5px solid #EAD2FF',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: '#EAD2FF',
            marginBottom: '20px',
          }}
        >
          <Sparkles size={16} /> REGISTRATION NOW OPEN
        </div>

        <h2
          style={{
            fontFamily: 'Epilogue, sans-serif',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '16px',
            color: '#ffffff',
          }}
        >
          Ready to Enter the <span style={{ color: '#f0befa' }}>Loop?</span>
        </h2>

        <p
          style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '640px',
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}
        >
          Join hundreds of onsite and virtual builders across 7 competition modules. Step into the portal and register
          for Loopverse 3.0 today.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
            <Trophy size={18} color="#f5693c" /> <span>PKR 500,000 Pool</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
            <Users size={18} color="#9E00FE" /> <span>Onsite & Virtual Tracks</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
            <ShieldCheck size={18} color="#10B981" /> <span>Official Certification</span>
          </div>
        </div>

        <Link
          href="/loopverse/register"
          className="lv-action-button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '18px 42px',
            backgroundColor: '#9E00FE',
            color: '#ffffff',
            border: '2.5px solid #1a1a1a',
            borderRadius: '16px',
            fontSize: '1.1rem',
            fontWeight: 900,
            boxShadow: '4px 4px 0 #1a1a1a',
            textDecoration: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          Start Registration Now <ArrowRight size={22} />
        </Link>
      </motion.div>
    </section>
  );
}
