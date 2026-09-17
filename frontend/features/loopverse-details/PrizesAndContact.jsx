'use client';

import { Trophy, Mail, Phone, User, ExternalLink, Sparkles, Calendar, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const PRIZES_LIST = [
  { track: 'Onsite Champion, per module (×7)', reward: 'To Be Confirmed + Trophies & Swag' },
  { track: 'Virtual Champion, per module (×5)', reward: 'To Be Confirmed + Trophies & Swag' },
  { track: 'Best Overall, Onsite Track', reward: 'To Be Confirmed + Grand Champion Award' },
  { track: 'Best Overall, Virtual Track', reward: 'To Be Confirmed + Grand Champion Award' },
  { track: 'Best Beginner Team', reward: 'To Be Confirmed + Rising Star Recognition' },
  { track: 'All Finalists', reward: 'Official LoopLab Certificates & Swag' },
];

export default function PrizesAndContact() {
  return (
    <section className="lv-prizes-contact-section py-16" id="prizes">
      <div className="lv-section-header mb-12">
        <span className="lv-section-tag">Recognition &amp; Inquiries</span>
        <h2 className="lv-section-title">Prizes &amp; Official Contact</h2>
        <p className="lv-section-sub">
          Track-specific awards, sponsor prize pools, certificates, and direct registration support for LoopVerse 3.0.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Prize Breakdown */}
        <div className="lg:col-span-7 bg-white border-3 border-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#1a1a1a]">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-black/10">
            <Trophy size={26} className="text-amber-500" />
            <h3 className="font-black text-2xl text-black font-['Epilogue']">Prizes &amp; Recognition Pool</h3>
          </div>

          <table className="lv-timeline-table w-full">
            <thead>
              <tr>
                <th style={{ width: '55%' }}>Track / Category</th>
                <th>Prize &amp; Honor</th>
              </tr>
            </thead>
            <tbody>
              {PRIZES_LIST.map((item, idx) => (
                <tr key={idx}>
                  <td className="lv-time-cell">
                    <span className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm text-black">
                      <Trophy size={14} className="text-purple-600 shrink-0" />
                      {item.track}
                    </span>
                  </td>
                  <td className="lv-activity-cell text-xs sm:text-sm font-semibold text-black">
                    {item.reward}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 p-4 bg-purple-50 border-2 border-black rounded-xl">
            <p className="text-xs sm:text-sm text-purple-950 font-medium leading-relaxed">
              💡 <strong>Note on Prize Pool:</strong> Exact prize amounts are being finalized alongside sponsor partnerships and will be announced ahead of registration closing.
            </p>
          </div>
        </div>

        {/* Right: Official Contact Card */}
        <div className="lg:col-span-5 bg-purple-950 text-white border-3 border-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#1a1a1a] flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-800 border border-purple-400/40 rounded-full font-bold text-xs text-purple-200 mb-4">
              <Calendar size={13} />
              <span>Event Date: Friday, 9 October 2026</span>
            </div>

            <h3 className="font-black text-2xl sm:text-3xl text-white font-['Epilogue'] mb-4">
              Registration &amp; Questions
            </h3>

            <p className="text-xs sm:text-sm text-purple-200 font-medium mb-6 leading-relaxed">
              Open to students and early-career developers, designers, and product builders — no prior hackathon experience needed. Onsite seats are limited and allotted first-come, first-served.
            </p>

            <div className="space-y-4 border-t border-purple-800 pt-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-purple-800 rounded-xl border border-purple-400/40 flex items-center justify-center shrink-0">
                  <User size={18} className="text-purple-300" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-purple-300">President, LoopLab</div>
                  <div className="text-sm font-bold text-white">Muhammad Qasim Ali Tareen</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-purple-800 rounded-xl border border-purple-400/40 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-purple-300" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-purple-300">Direct Phone</div>
                  <a href="tel:03334093999" className="text-sm font-bold text-orange-300 hover:underline">
                    0333 4093999
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-purple-800 rounded-xl border border-purple-400/40 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-purple-300" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-purple-300">Official Email</div>
                  <a href="mailto:qk04504@gmail.com" className="text-sm font-bold text-orange-300 hover:underline">
                    qk04504@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-purple-800">
            <Link
              href="/loopverse/register"
              className="w-full py-3.5 px-5 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-xl border-2 border-black shadow-[3px_3px_0px_#1a1a1a] flex items-center justify-center gap-2 transition-all active:translate-y-0.5"
            >
              <Sparkles size={18} />
              <span>Register Now for LoopVerse 3.0</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
