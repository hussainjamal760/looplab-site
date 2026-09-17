'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, FileText, Zap, Globe, Sparkles, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';
import { MODULES_DATA } from './modulesData';

export default function MarkingCriteriaSection() {
  const [activeModuleId, setActiveModuleId] = useState(1);

  const activeModule = MODULES_DATA.find((m) => m.id === activeModuleId) || MODULES_DATA[0];

  return (
    <section className="lv-marking-section py-20" id="criteria">
      {/* Section Header */}
      <div className="lv-section-header mb-12 text-center">
        <span className="lv-section-tag">Evaluation Framework</span>
        <h2 className="lv-section-title">Module Criteria &amp; Deliverables</h2>
        <p className="lv-section-sub">
          Every module is calibrated with approachable problem statements. Criteria are weighted to reward innovation, execution, and presentation.
        </p>
      </div>

      {/* Module Selector Pill Bar */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-10 px-2">
        {MODULES_DATA.map((m) => {
          const IconComp = m.icon;
          const isActive = m.id === activeModuleId;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveModuleId(m.id)}
              className={`group relative flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-[#1a1a1a] font-bold text-xs sm:text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-[#9E00FE] text-white -translate-y-1 shadow-[4px_4px_0px_#1a1a1a]'
                  : 'bg-white text-[#1a1a1a] hover:bg-purple-50 shadow-[2px_2px_0px_#1a1a1a] hover:-translate-y-0.5'
              }`}
            >
              <IconComp size={17} className={isActive ? 'text-white' : 'text-purple-600'} />
              <span>{m.title}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase border border-[#1a1a1a] ${
                isActive ? 'bg-[#ffd166] text-[#1a1a1a]' : 'bg-purple-100 text-purple-900'
              }`}>
                {m.feeFormatted}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Module Detail Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModule.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-[#ffffff] border-3 border-[#1a1a1a] rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#1a1a1a] relative overflow-hidden"
        >
          {/* Subtle background glow element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/40 to-orange-200/30 rounded-full blur-3xl pointer-events-none -z-0" />

          {/* Module Header Bar */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b-2 border-[#1a1a1a]/10">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="px-3.5 py-1 bg-[#1a1a1a] text-white rounded-full font-black text-xs tracking-wide">
                  MODULE 0{activeModule.id}
                </span>
                <span className="px-3.5 py-1 bg-[#ffd166] text-[#1a1a1a] border-1.5 border-[#1a1a1a] rounded-full font-black text-xs shadow-[2px_2px_0px_#1a1a1a] flex items-center gap-1">
                  <Tag size={12} /> Fee: {activeModule.feeFormatted}
                </span>
                {activeModule.isOnsiteOnly ? (
                  <span className="px-3.5 py-1 bg-[#f5693c] text-white border-1.5 border-[#1a1a1a] rounded-full font-bold text-xs shadow-[2px_2px_0px_#1a1a1a] flex items-center gap-1">
                    <Zap size={13} /> Onsite Exclusive
                  </span>
                ) : (
                  <span className="px-3.5 py-1 bg-[#EAD2FF] text-[#1a1a1a] border-1.5 border-[#1a1a1a] rounded-full font-bold text-xs shadow-[2px_2px_0px_#1a1a1a] flex items-center gap-1">
                    <Globe size={13} /> Dual Track (Onsite &amp; Virtual)
                  </span>
                )}
              </div>
              <h3 className="font-black text-3xl sm:text-4xl text-[#1a1a1a] font-['Epilogue'] tracking-tight">
                {activeModule.title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base mt-2 font-medium max-w-3xl leading-relaxed">
                {activeModule.desc}
              </p>
            </div>
          </div>

          {/* Criteria & Deliverables Grid */}
          <div className="relative z-10 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Weighted Criteria (7 Cols) */}
            <div className="lg:col-span-7 bg-[#f9f6f0] border-2 border-[#1a1a1a] rounded-2xl p-6 shadow-[4px_4px_0px_#1a1a1a]">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#1a1a1a]/15">
                <h4 className="font-black text-sm uppercase tracking-wider text-[#9E00FE] flex items-center gap-2">
                  <Award size={19} /> Weighted Marking Criteria
                </h4>
                <span className="text-xs font-black text-[#1a1a1a] bg-[#EAD2FF] px-2.5 py-1 rounded-full border border-[#1a1a1a]">
                  100% Total
                </span>
              </div>

              <div className="space-y-4">
                {activeModule.criteria.map((c, idx) => (
                  <div key={idx} className="p-3.5 bg-white border-2 border-[#1a1a1a] rounded-xl shadow-[2px_2px_0px_#1a1a1a]">
                    <div className="flex justify-between items-center mb-2 font-bold text-xs sm:text-sm text-[#1a1a1a]">
                      <span className="flex items-center gap-2 font-extrabold">
                        <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-900 border border-[#1a1a1a] text-[11px] flex items-center justify-center font-black">
                          {idx + 1}
                        </span>
                        {c.name}
                      </span>
                      <span className="px-2.5 py-0.5 bg-[#9E00FE] text-white rounded-lg font-black text-xs shadow-[1px_1px_0px_#1a1a1a]">
                        {c.weight}%
                      </span>
                    </div>
                    <div className="w-full bg-purple-100/60 h-3 rounded-full border border-[#1a1a1a] overflow-hidden p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.weight * 3.5}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#9E00FE] via-purple-500 to-[#f5693c] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Submission Formats & Briefs (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div className="bg-[#f0befa]/30 border-2 border-[#1a1a1a] rounded-2xl p-5 shadow-[4px_4px_0px_#1a1a1a]">
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-[#9E00FE] mb-2">
                  <FileText size={16} /> Official Submission Deliverables
                </div>
                <p className="text-xs sm:text-sm text-[#1a1a1a] font-bold leading-relaxed">
                  {activeModule.submissionFormat}
                </p>
              </div>

              <div className="p-4 bg-orange-50 border-2 border-[#1a1a1a] rounded-xl shadow-[3px_3px_0px_#1a1a1a]">
                <div className="flex items-center gap-1.5 font-black text-xs uppercase tracking-wider text-orange-950 mb-1">
                  <Zap size={14} className="text-orange-600" /> Onsite Track Brief
                </div>
                <p className="text-xs sm:text-sm text-[#1a1a1a] font-medium leading-relaxed">
                  {activeModule.onsiteBrief}
                </p>
              </div>

              <div className="p-4 bg-purple-50 border-2 border-[#1a1a1a] rounded-xl shadow-[3px_3px_0px_#1a1a1a]">
                <div className="flex items-center gap-1.5 font-black text-xs uppercase tracking-wider text-purple-950 mb-1">
                  <Globe size={14} className="text-purple-600" /> Virtual Track Brief
                </div>
                <p className="text-xs sm:text-sm text-[#1a1a1a] font-medium leading-relaxed">
                  {activeModule.virtualBrief}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
