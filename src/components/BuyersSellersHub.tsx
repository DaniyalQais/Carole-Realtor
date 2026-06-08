/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Key, CheckCircle2, TrendingUp, Sparkles, Building } from 'lucide-react';
import Reveal from './Reveal';

interface BuyersSellersHubProps {
  onOpenConsultation: (type: 'buyer' | 'seller') => void;
}

export default function BuyersSellersHub({ onOpenConsultation }: BuyersSellersHubProps) {

  const buyerFeatures = [
    "Priority access to private off-market listings",
    "Personalized home search tailored to your lifestyle",
    "In-depth community and school district research",
    "Protective contract clauses and expert negotiation"
  ];

  const sellerFeatures = [
    "Complimentary professional home staging guidance",
    "Cinematic property tours and HDR photography",
    "Targeted marketing to qualified local buyers",
    "Private broker network and VIP open house events"
  ];

  return (
    <section id="buyers-sellers" className="py-24 sm:py-28 bg-warm-white text-charcoal border-b border-champagne/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="section-eyebrow">
              Your Journey Starts Here
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal tracking-tight">
              Buying or Selling?
            </h2>
            <p className="text-sm sm:text-base font-sans font-light text-stone-500 leading-relaxed">
              Whether you're finding your family's next home or maximizing the value of your current one, Carole guides every step with care and expertise.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

          <Reveal delay={0}>
            <div className="card-luxury rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group bg-white">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-luxury-gold/30 via-luxury-gold to-luxury-gold/30 group-hover:from-luxury-gold group-hover:via-luxury-gold group-hover:to-luxury-gold transition-all" />
              <div className="absolute top-6 right-6 text-champagne font-mono text-8xl font-black select-none opacity-40 group-hover:opacity-60 transition-opacity">
                01
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-luxury-gold/10 border border-luxury-gold/25 p-3.5 rounded-2xl">
                    <Key className="w-6 h-6 text-luxury-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-light text-charcoal group-hover:text-luxury-gold-dark transition-colors">
                      Buying A Home
                    </h3>
                    <p className="text-[11px] font-mono tracking-widest text-stone-400 capitalize">
                      Your Home Search, Simplified
                    </p>
                  </div>
                </div>

                <p className="font-sans text-stone-500 text-sm sm:text-base leading-relaxed">
                  Finding the right home takes more than browsing listings. Carole provides proactive search, exclusive pocket listings, and local pricing insight so you negotiate from a position of strength.
                </p>

                <hr className="border-champagne/50" />

                <div className="space-y-3">
                  <p className="text-xs uppercase font-mono font-bold text-charcoal-light tracking-widest">
                    What You Get:
                  </p>
                  <div className="space-y-2.5">
                    {buyerFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-luxury-gold-dark mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-sans font-light text-stone-600">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onOpenConsultation('buyer')}
                  className="w-full bg-charcoal text-warm-white py-4 rounded-2xl text-xs font-semibold tracking-widest uppercase hover:bg-luxury-gold hover:text-charcoal transition-all shadow-luxury hover:shadow-luxury-lg duration-300 flex items-center justify-center gap-2"
                >
                  <span>Find Your Future Home</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card-luxury rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group bg-white">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-luxury-gold/30 via-luxury-gold to-luxury-gold/30 group-hover:from-luxury-gold group-hover:via-luxury-gold group-hover:to-luxury-gold transition-all" />
              <div className="absolute top-6 right-6 text-champagne font-mono text-8xl font-black select-none opacity-40 group-hover:opacity-60 transition-opacity">
                02
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-luxury-gold/10 border border-luxury-gold/25 p-3.5 rounded-2xl">
                    <TrendingUp className="w-6 h-6 text-luxury-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-light text-charcoal group-hover:text-luxury-gold-dark transition-colors">
                      Selling Your Home
                    </h3>
                    <p className="text-[11px] font-mono tracking-widest text-stone-400 capitalize">
                      Maximize Your Home's Value
                    </p>
                  </div>
                </div>

                <p className="font-sans text-stone-500 text-sm sm:text-base leading-relaxed">
                  Selling a premium home deserves premium presentation. Carole crafts beautiful, aspirational narratives for each listing — attracting qualified buyers and maximizing your return.
                </p>

                <hr className="border-champagne/50" />

                <div className="space-y-3">
                  <p className="text-xs uppercase font-mono font-bold text-charcoal-light tracking-widest">
                    What You Get:
                  </p>
                  <div className="space-y-2.5">
                    {sellerFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-luxury-gold-dark mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-sans font-light text-stone-600">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onOpenConsultation('seller')}
                  className="w-full bg-charcoal text-warm-white py-4 rounded-2xl text-xs font-semibold tracking-widest uppercase hover:bg-luxury-gold hover:text-charcoal transition-all shadow-luxury hover:shadow-luxury-lg duration-300 flex items-center justify-center gap-2"
                >
                  <span>Request Marketing Plan</span>
                  <Building className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
