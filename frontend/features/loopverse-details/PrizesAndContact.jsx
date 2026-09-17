'use client';

import { Trophy, Mail, Phone, User, Calendar, MapPin, Sparkles, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const PRIZES_LIST = [
  { category: 'Onsite Champion, per module (×7)', reward: 'To Be Confirmed + Official Trophy & Swag', badge: '⚡ Onsite' },
  { category: 'Virtual Champion, per module (×5)', reward: 'To Be Confirmed + Official Trophy & Swag', badge: '🌐 Virtual' },
  { category: 'Best Overall, Onsite Track', reward: 'To Be Confirmed + Grand Champion Award', badge: '🏆 Grand' },
  { category: 'Best Overall, Virtual Track', reward: 'To Be Confirmed + Grand Champion Award', badge: '🏆 Grand' },
  { category: 'Best Beginner Team', reward: 'To Be Confirmed + Rising Star Recognition', badge: '⭐ Special' },
  { category: 'All Finalists', reward: 'Official LoopLab Certificates & Swag Pack', badge: '🎖️ All Finalists' },
];

export default function PrizesAndContact() {
  return (
    <section className="lv-prizes-contact-section py-20" id="prizes">
      {/* Section Header */}
      <div className="lv-section-header mb-14 text-center">
        <span className="lv-section-tag">Honors &amp; Inquiries</span>
        <h2 className="lv-section-title">Prizes &amp; Official Contact</h2>
        <p className="lv-section-sub">
          Track-specific awards, sponsor prize pools, finalist certificates, and direct leadership support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Prize Breakdown Pool (7 Cols) */}
        <div className="lg:col-span-7 bg-white border-3 border-[#1a1a1a] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#1a1a1a] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-[#1a1a1a]/10">
              <div className="w-10 h-10 bg-[#ffd166] text-[#1a1a1a] rounded-xl border-2 border-[#1a1a1a] flex items-center justify-center font-black shadow-[2px_2px_0px_#1a1a1a]">
                <Trophy size={22} />
              </div>
              <div>
                <h3 className="font-black text-2xl text-[#1a1a1a] font-['Epilogue']">Prizes &amp; Recognition Pool</h3>
                <p className="text-xs text-gray-600 font-medium">Awarded separately for Onsite and Virtual tracks</p>
              </div>
            </div>

            <div className="space-y-3">
              {PRIZES_LIST.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-[#f9f6f0] border-2 border-[#1a1a1a] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-[2px_2px_0px_#1a1a1a] hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-black text-[#1a1a1a] bg-[#EAD2FF] px-2.5 py-0.5 rounded-full border border-[#1a1a1a]">
                      {item.badge}
                    </span>
                    <span className="font-black text-xs sm:text-sm text-[#1a1a1a]">{item.category}</span>
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-purple-950 font-['Epilogue']">{item.reward}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-purple-50 border-2 border-[#1a1a1a] rounded-xl">
            <p className="text-xs sm:text-sm text-purple-950 font-medium leading-relaxed">
              💡 <strong>Prize Pool Announcement:</strong> Exact prize amounts are being finalized alongside sponsor partnerships and will be announced ahead of registration closing.
            </p>
          </div>
        </div>

        {/* Right Column: Official Leadership & Registration Hub (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0d0822] text-white border-3 border-[#1a1a1a] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#1a1a1a] flex flex-col justify-between relative overflow-hidden">
          {/* Glowing cosmic accent */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#9E00FE]/40 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#9E00FE] border border-purple-400/40 rounded-full font-black text-xs text-white mb-5 shadow-[2px_2px_0px_#1a1a1a]">
              <Calendar size={14} />
              <span>Event Date: Friday, 9 October 2026</span>
            </div>

            <h3 className="font-black text-2xl sm:text-3xl text-white font-['Epilogue'] mb-3">
              Registration &amp; Questions
            </h3>

            <p className="text-xs sm:text-sm text-purple-200/90 font-medium mb-6 leading-relaxed">
              Open to students and early-career developers, designers, and product builders — no prior hackathon experience needed. Onsite seats are limited.
            </p>

            <div className="space-y-3.5 border-t border-purple-900/80 pt-5">
              <div className="p-3.5 bg-purple-950/80 border border-purple-700/50 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 bg-[#ffd166] text-[#1a1a1a] rounded-xl border border-black flex items-center justify-center shrink-0 font-black">
                  <User size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-purple-300">President, LoopLab</div>
                  <div className="text-sm font-black text-white font-['Epilogue']">Muhammad Qasim Ali Tareen</div>
                </div>
              </div>

              <div className="p-3.5 bg-purple-950/80 border border-purple-700/50 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 bg-[#f5693c] text-white rounded-xl border border-black flex items-center justify-center shrink-0 font-black">
                  <Phone size={19} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-purple-300">Direct Phone</div>
                  <a href="tel:03334093999" className="text-sm font-black text-[#ffd166] hover:underline font-['Epilogue']">
                    0333 4093999
                  </a>
                </div>
              </div>

              <div className="p-3.5 bg-purple-950/80 border border-purple-700/50 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 bg-[#9E00FE] text-white rounded-xl border border-black flex items-center justify-center shrink-0 font-black">
                  <Mail size={19} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-purple-300">Official Inquiries Email</div>
                  <a href="mailto:qk04504@gmail.com" className="text-sm font-black text-[#ffd166] hover:underline font-['Epilogue']">
                    qk04504@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-4 border-t border-purple-900/80">
            <Link
              href="/loopverse/register"
              className="w-full py-4 px-6 bg-[#f5693c] hover:bg-[#e0562a] text-white font-black text-sm sm:text-base rounded-2xl border-2 border-black shadow-[4px_4px_0px_#1a1a1a] flex items-center justify-center gap-2.5 transition-all active:translate-y-0.5"
            >
              <Sparkles size={20} />
              <span>Register Now for LoopVerse 3.0</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
