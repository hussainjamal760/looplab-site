'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Globe2, 
  Scale, 
  BookOpen, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export interface PillarData {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  highlights: string[];
  description: string;
  extraTitle: string;
  extraContent: string;
}

const PILLARS_DATA: PillarData[] = [
  {
    id: 'onsite',
    badge: 'Onsite · 7-Hour Sprint',
    badgeColor: 'bg-[#f5693c] text-white',
    title: 'Onsite Track · The Easy Way In',
    subtitle: '10:00 AM – 05:00 PM · Physical Venue, Lahore',
    highlights: [
      'Beginner-friendly briefs calibrated for a focused 7-hour build',
      'In-person mentors, workstations, high-speed WiFi, power provided',
      'Live onstage pitch directly to VC judges & same-day evening awards',
      'Exclusive access to Pitching & Game Development tracks'
    ],
    description: 'The shortest, highest-energy route to a shipped project. Zero setup friction with dedicated desks, free meals, and mentors circulating the floor.',
    extraTitle: 'Venue Perks',
    extraContent: 'Food, drinks, swag pack, CTF booth access, and same-day trophy presentation.'
  },
  {
    id: 'virtual',
    badge: 'Virtual · ~26-Hour Marathon',
    badgeColor: 'bg-purple-600 text-white',
    title: 'Virtual Track · The Tougher Grind',
    subtitle: 'Day 1 (10 AM) – Day 2 (12 PM) · Open Worldwide',
    highlights: [
      'Longer ~26-hour runway with harder, production-grade problem briefs',
      'Self-managed team setup, international time zones, and tools',
      'Livestream opening ceremony & async video call mentor office hours',
      'Judged and awarded separately from the onsite track'
    ],
    description: 'Built for squads seeking a deeper engineering challenge. Coordinate globally across Discord and submit your repo + 3-minute video.',
    extraTitle: 'Submission Package',
    extraContent: 'Public GitHub repo link, deployment URL, and recorded product walkthrough.'
  },
  {
    id: 'judging',
    badge: 'Rubric Weightage',
    badgeColor: 'bg-[#e6fab9] text-black',
    title: 'Judging Criteria & Scoring',
    subtitle: 'How projects are scored across 5 dimensions',
    highlights: [
      'Innovation & Originality (25%) · Novelty and unique approach',
      'Technical Execution (25%) · Code quality, architecture & functionality',
      'Real-World Impact (20%) · Feasibility and market relevance',
      'Design & UX (15%) + Pitch & Presentation (15%)'
    ],
    description: 'Every project is scored on a standardized 100-point rubric by a panel of venture capitalists, staff engineers, and domain specialists.',
    extraTitle: 'Pitch Deliberation',
    extraContent: '5-minute live onstage presentation followed by 3-minute technical Q&A.'
  }
];

export default function Features6() {
  const [activeCard, setActiveCard] = useState<string>('onsite');

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto bg-[#F9F6EE] font-sans antialiased">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-black bg-purple-100 text-purple-950 font-bold text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_#000000] mb-4">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>React Bits Pro Features-6 · Neo-Brutalist Architecture</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight mb-4">
          Tracks & Scoring System
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">
          Click any card in the Bento grid to expand animated logistics, rubric details, and venue perks.
        </p>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PILLARS_DATA.map((item, idx) => {
          const isHero = idx === 0;
          const isExpanded = activeCard === item.id;

          return (
            <motion.div
              layout
              key={item.id}
              onClick={() => setActiveCard(isExpanded ? '' : item.id)}
              className={`relative cursor-pointer bg-white border-2 border-black rounded-2xl p-7 transition-all duration-200 
                ${isHero ? 'md:col-span-2 bg-gradient-to-br from-white to-purple-50/40' : 'md:col-span-1'}
                ${isExpanded 
                  ? 'shadow-[8px_8px_0px_0px_#9E00FE] -translate-x-1 -translate-y-1 border-purple-700' 
                  : 'shadow-[5px_5px_0px_0px_#000000] hover:shadow-[7px_7px_0px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5'
                }`}
            >
              {/* Header Top Row */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full border-2 border-black font-extrabold text-xs tracking-wider shadow-[2px_2px_0px_0px_#000000] ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <div className="w-9 h-9 rounded-full border-2 border-black bg-slate-100 flex items-center justify-center text-black shadow-[2px_2px_0px_0px_#000000]">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-2xl font-black text-black tracking-tight mb-1">
                {item.title}
              </h3>
              <p className="text-sm font-semibold text-purple-700 mb-5">
                {item.subtitle}
              </p>

              {/* Bullet Highlights */}
              <ul className="space-y-2.5 mb-5">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-800 text-sm font-medium leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Toggle CTA */}
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-700 hover:text-purple-900">
                <span>{isExpanded ? 'Collapse Details' : 'Click to Reveal Animated Specs'}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </div>

              {/* Animated Expandable Drawer */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="mt-5 pt-5 border-t-2 border-dashed border-slate-300"
                  >
                    <p className="text-sm text-slate-700 font-medium leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="p-3.5 rounded-xl border-2 border-black bg-[#F9F6EE] shadow-[2px_2px_0px_0px_#000000]">
                      <div className="text-xs font-black uppercase tracking-wider text-purple-700 mb-1">
                        ⚡ {item.extraTitle}
                      </div>
                      <div className="text-xs text-slate-800 font-medium leading-snug">
                        {item.extraContent}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
