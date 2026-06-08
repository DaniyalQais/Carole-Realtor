/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, Quote, BadgeCheck, Calendar } from 'lucide-react';
import Reveal from './Reveal';

export default function SuccessStories() {
  const stories = [
    {
      metric: "Sold $180K Above Ask",
      time: "Closed in 8 Days",
      transactionType: "Seller",
      year: "2025",
      author: "The Sterling Family",
      role: "Los Altos Hills",
      initials: "SF",
      avatarColor: "bg-luxury-gold/20 text-luxury-gold-dark border-luxury-gold/30",
      stars: 5,
      review: "Carole's eye for staging and her strategic timing changed everything. We had multiple offers by Friday and closed well above our target in record time. Absolute class."
    },
    {
      metric: "Saved $45K on Purchase",
      time: "First-Bid Acceptance",
      transactionType: "Buyer",
      year: "2025",
      author: "Dr. Marcus & Elena Vance",
      role: "Saratoga Estate",
      initials: "MV",
      avatarColor: "bg-champagne text-charcoal border-champagne",
      stars: 5,
      review: "Working with Carole was a masterclass. She spotted neighborhood details that saved us thousands and structured a protective escrow that preserved our budget."
    },
    {
      metric: "Sold Off-Market, 100% Private",
      time: "Unlisted Transaction",
      transactionType: "Seller",
      year: "2024",
      author: "Amara Lin",
      role: "Palo Alto Residence",
      initials: "AL",
      avatarColor: "bg-soft-ivory text-charcoal border-champagne",
      stars: 5,
      review: "Discreet, connected, and protective. Carole matched our property with a private buyer from her network, bypassing public listings completely."
    }
  ];

  return (
    <section className="section-padding bg-soft-ivory border-b border-champagne/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="text-center max-w-2xl mx-auto space-y-5 mb-12 sm:mb-16">
            <span className="section-eyebrow">Client Experiences</span>
            <h2 className="section-title">Success Stories</h2>
            <p className="section-subtitle">
              Real families, real results — and the relationships that made them possible.
            </p>

            <div className="inline-flex items-center gap-4 bg-white border border-champagne/50 rounded-2xl px-6 py-4 shadow-luxury mt-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-luxury-gold text-luxury-gold" />
                ))}
              </div>
              <div className="text-left border-l border-champagne/50 pl-4">
                <p className="font-serif text-2xl font-light text-charcoal leading-none">5.0</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-stone-500 mt-1">Average Client Rating</p>
              </div>
              <div className="text-left border-l border-champagne/50 pl-4 hidden sm:block">
                <p className="font-serif text-2xl font-light text-charcoal leading-none">98%</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-stone-500 mt-1">Referral Rate</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {stories.map((story, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="bg-white border border-champagne/50 rounded-3xl p-8 sm:p-10 shadow-luxury hover:shadow-luxury-xl transition-all duration-500 flex flex-col relative group hover:-translate-y-1.5 hover:border-luxury-gold/30 min-h-[420px]">

                <div className="absolute top-8 right-8 text-champagne/70 pointer-events-none group-hover:text-luxury-gold/25 transition-colors">
                  <Quote className="w-16 h-16 rotate-180" />
                </div>

                <div className="space-y-6 relative z-10 flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-luxury-gold-dark bg-luxury-gold/10 rounded-lg px-3 py-1.5 border border-luxury-gold/20">
                      {story.metric}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 bg-soft-ivory px-2.5 py-1 rounded-lg border border-champagne/50">
                      {story.transactionType}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                    <Calendar className="w-3 h-3" />
                    <span>{story.time}</span>
                    <span className="text-champagne">•</span>
                    <span>{story.year}</span>
                  </div>

                  <div className="flex gap-1">
                    {Array.from({ length: story.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                    ))}
                  </div>

                  <blockquote className="display-quote text-charcoal pt-2">
                    "{story.review}"
                  </blockquote>
                </div>

                <div className="pt-8 border-t border-champagne/50 mt-8 flex items-center gap-4 relative z-10">
                  <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-serif text-base font-semibold shrink-0 ${story.avatarColor}`}>
                    {story.initials}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-serif text-lg font-semibold text-charcoal">{story.author}</h4>
                    <p className="text-[11px] font-mono uppercase tracking-widest text-stone-400 mt-0.5">{story.role}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 font-bold flex items-center gap-1">
                      <BadgeCheck className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
