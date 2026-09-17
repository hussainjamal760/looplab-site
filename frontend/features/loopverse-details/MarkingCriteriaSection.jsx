'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Award, FileText, Sparkles, Code, Smartphone, Brain, Palette, ShieldAlert, Mic, Gamepad2 } from 'lucide-react';
import { MODULES_DATA } from './modulesData';

export default function MarkingCriteriaSection() {
  const [activeModuleId, setActiveModuleId] = useState(1);

  const activeModule = MODULES_DATA.find((m) => m.id === activeModuleId) || MODULES_DATA[0];

  return (
    <section className="lv-marking-section py-16" id="criteria">
      <div className="lv-section-header mb-8">
        <span className="lv-section-tag">Evaluation Framework</span>
        <h2 className="lv-section-title">Module Marking Criteria &amp; Submissions</h2>
        <p className="lv-section-sub">
          All seven modules are calibrated with beginner-friendly problem statements. Marking criteria below are weighted per module to match what each track actually rewards.
        </p>
      </div>

      {/* Module Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {MODULES_DATA.map((m) => {
          const IconComp = m.icon;
          const isActive = m.id === activeModuleId;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveModuleId(m.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-black font-bold text-xs sm:text-sm transition-all shadow-[2px_2px_0px_#1a1a1a] ${
                isActive
                  ? 'bg-purple-600 text-white translate-y-[-2px] shadow-[4px_4px_0px_#1a1a1a]'
                  : 'bg-white text-black hover:bg-purple-50'
              }`}
            >
              <IconComp size={16} />
              <span>{m.title}</span>
              {m.isOnsiteOnly && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-black uppercase ${isActive ? 'bg-orange-400 text-black' : 'bg-orange-100 text-orange-800'}`}>
                  Onsite
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Module Detail Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModule.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="bg-white border-3 border-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#1a1a1a]"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-black/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-purple-100 border border-black rounded-full font-bold text-xs text-purple-900">
                  Module 0{activeModule.id}
                </span>
                <span className="px-3 py-1 bg-amber-300 text-black border border-black rounded-full font-black text-xs shadow-[1px_1px_0px_#1a1a1a]">
                  Fee: {activeModule.feeFormatted}
                </span>
                {activeModule.isOnsiteOnly ? (
                  <span className="px-3 py-1 bg-orange-100 border border-black rounded-full font-bold text-xs text-orange-900">
                    ⚡ Onsite Only Module
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-emerald-100 border border-black rounded-full font-bold text-xs text-emerald-900">
                    🌐 Dual Track (Onsite &amp; Virtual)
                  </span>
                )}
              </div>
              <h3 className="font-black text-2xl sm:text-3xl text-black font-['Epilogue']">{activeModule.title}</h3>
              <p className="text-gray-700 text-sm sm:text-base mt-1 font-medium">{activeModule.desc}</p>
            </div>
          </div>

          {/* Criteria Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Criteria Breakdown */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-purple-700 mb-4 flex items-center gap-2">
                <Award size={18} /> Weighted Marking Criteria (100% Total)
              </h4>
              <div className="space-y-3.5">
                {activeModule.criteria.map((c, idx) => (
                  <div key={idx} className="p-3 bg-purple-50/60 border-2 border-black/80 rounded-xl">
                    <div className="flex justify-between items-center mb-1.5 font-bold text-xs sm:text-sm text-black">
                      <span>{c.name}</span>
                      <span className="px-2 py-0.5 bg-purple-600 text-white rounded font-black text-xs">{c.weight}%</span>
                    </div>
                    <div className="w-full bg-white h-2.5 rounded-full border border-black overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.weight * 3.5}%` }}
                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-orange-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Submission Requirements & Briefs */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-purple-700 mb-4 flex items-center gap-2">
                <FileText size={18} /> Required Deliverables &amp; Format
              </h4>
              
              <div className="p-4 bg-orange-50 border-2 border-black rounded-xl shadow-[2px_2px_0px_#1a1a1a]">
                <div className="font-bold text-xs uppercase tracking-wider text-orange-900 mb-1">⚡ Onsite Track Brief</div>
                <p className="text-xs sm:text-sm text-black font-medium">{activeModule.onsiteBrief}</p>
              </div>

              <div className="p-4 bg-purple-50 border-2 border-black rounded-xl shadow-[2px_2px_0px_#1a1a1a]">
                <div className="font-bold text-xs uppercase tracking-wider text-purple-900 mb-1">🌐 Virtual Track Brief</div>
                <p className="text-xs sm:text-sm text-black font-medium">{activeModule.virtualBrief}</p>
              </div>

              <div className="p-4 bg-emerald-50 border-2 border-black rounded-xl shadow-[2px_2px_0px_#1a1a1a]">
                <div className="font-bold text-xs uppercase tracking-wider text-emerald-900 mb-1">📁 Official Submission Format</div>
                <p className="text-xs sm:text-sm text-black font-semibold mt-1">{activeModule.submissionFormat}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
