/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check, TrendingUp, Clock, Heading, ArrowDown } from 'lucide-react';
import Reveal from './Reveal';

interface HeroProps {
  onOpenConsultation: (type?: string) => void;
  heroImageName: string;
}

export default function Hero({ onOpenConsultation, heroImageName }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const licenseBadge = "CAROLE STAATS • LICENSED IN PENNSYLVANIA";

  const trustBadges = [
    "REALTOR® Certification",
    "Local Market Expert",
    "Buyer & Seller Representation",
    "Bespoke Personal Service"
  ];

  return (
    <section id="hero" className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-warm-white">
      <div className="absolute inset-0 z-0">
        <img
          src={`/src/assets/images/${heroImageName}.png`}
          alt="Luxury Architectural Residence"
          className="w-full h-full object-cover warm-image animate-subtle-zoom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-white/95 via-warm-white/80 to-warm-white/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-soft-ivory/90 via-transparent to-warm-white/30" />
        <div className="absolute inset-0 bg-gradient-to-br from-champagne/20 via-transparent to-luxury-gold/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-7 flex flex-col space-y-10 text-left">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 self-start glass-card-warm px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.3em] font-mono text-luxury-gold-dark font-semibold shadow-luxury">
                <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse"></span>
                {licenseBadge}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-6">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-light leading-[1.08] tracking-tight text-charcoal max-w-2xl">
                  Helping Families Find The Right Home With <span className="italic font-normal text-luxury-gold">Confidence</span>
                </h1>
                <p className="font-sans font-light text-base sm:text-lg md:text-xl text-charcoal-light max-w-xl leading-relaxed">
                  Local expertise. Personalized guidance. Exceptional real estate results tailored to your family's unique story.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onOpenConsultation('consultation')}
                  className="bg-luxury-gold hover:bg-luxury-gold-dark text-charcoal px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase shadow-luxury-lg hover:shadow-luxury-xl btn-press shimmer-gold cursor-pointer text-center tap-target"
                >
                  Schedule A Consultation
                </button>
                <button
                  onClick={() => scrollToSection('valuation-tool')}
                  className="btn-luxury-outline text-center tap-target btn-press"
                >
                  Get Home Value Estimate
                </button>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 pt-6 border-t border-champagne/60 max-w-xl">
                {trustBadges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-charcoal-light text-sm">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-luxury-gold/15 border border-luxury-gold/30">
                      <Check className="w-3.5 h-3.5 text-luxury-gold-dark" />
                    </div>
                    <span className="font-sans font-medium tracking-wide">{badge}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Reveal delay={200}>
              <div className="w-full max-w-sm glass-card rounded-3xl p-7 sm:p-8 shadow-luxury-xl relative group hover:shadow-luxury-xl hover:border-luxury-gold/40 transition-all duration-500 hover:-translate-y-1">

                <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/8 rounded-full blur-3xl group-hover:bg-luxury-gold/15 transition-all duration-500" />

                <div className="flex justify-between items-start mb-7">
                  <div>
                    <h3 className="font-serif text-xl font-light text-charcoal tracking-wide">
                      Market Snapshot
                    </h3>
                    <p className="text-[10px] font-mono uppercase text-stone-500 tracking-wider mt-0.5">
                      Silicon Valley Regional Area
                    </p>
                  </div>
                  <div className="bg-luxury-gold/10 p-2.5 rounded-xl border border-luxury-gold/25">
                    <TrendingUp className="w-4 h-4 text-luxury-gold-dark" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-soft-ivory/80 border border-champagne/50 rounded-2xl flex items-center justify-between transition-all duration-300 hover:bg-white hover:shadow-luxury">
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-stone-500">
                        Average Home Price
                      </p>
                      <p className="text-2xl font-serif text-charcoal mt-1 font-light tracking-tight">
                        $1,895,000
                      </p>
                    </div>
                    <div className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 font-mono">
                      +4.8% YoY
                    </div>
                  </div>

                  <div className="p-4 bg-soft-ivory/80 border border-champagne/50 rounded-2xl flex items-center justify-between transition-all duration-300 hover:bg-white hover:shadow-luxury">
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-stone-500">
                        Days On Market
                      </p>
                      <p className="text-2xl font-serif text-charcoal mt-1 font-light tracking-tight">
                        14 Days Avg
                      </p>
                    </div>
                    <div className="text-xs text-luxury-gold-dark font-semibold bg-luxury-gold/10 px-2.5 py-1 rounded-lg border border-luxury-gold/25 font-mono">
                      Fast Velocity
                    </div>
                  </div>

                  <div className="p-4 bg-soft-ivory/80 border border-champagne/50 rounded-2xl flex items-center justify-between transition-all duration-300 hover:bg-white hover:shadow-luxury">
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-stone-500">
                        Recent Transactions
                      </p>
                      <p className="text-2xl font-serif text-charcoal mt-1 font-light tracking-tight">
                        48 Closed (LTM)
                      </p>
                    </div>
                    <div className="text-xs text-sky-700 font-semibold bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200/60 font-mono">
                      High Volume
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => scrollToSection('valuation-tool')}
                    className="text-[11px] font-semibold text-luxury-gold-dark hover:text-luxury-gold transition-colors tracking-widest uppercase inline-flex items-center gap-1.5 focus:outline-none cursor-pointer"
                  >
                    <span>Evaluate My Property's Worth</span>
                    <Heading className="w-3 h-3 rotate-90" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500">Meet Carole</span>
          <button
            onClick={() => scrollToSection('meet-carole')}
            className="p-2 rounded-full border border-champagne bg-white/80 hover:bg-white text-luxury-gold-dark focus:outline-none shadow-luxury transition-all hover:-translate-y-0.5"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
