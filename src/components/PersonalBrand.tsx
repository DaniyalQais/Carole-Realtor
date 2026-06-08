/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Shield, Compass, MessageCircle, Phone, Star, BadgeCheck } from 'lucide-react';
import Reveal from './Reveal';

interface PersonalBrandProps {
  portraitImageName: string;
  onOpenConsultation: (type?: string) => void;
}

export default function PersonalBrand({ portraitImageName, onOpenConsultation }: PersonalBrandProps) {

  const pillars = [
    {
      icon: <Compass className="w-5 h-5 text-luxury-gold-dark" />,
      title: "Personalized Attention",
      description: "You work directly with Carole — not a junior team. Every transaction receives thoughtful strategy and the individual care your home deserves."
    },
    {
      icon: <Award className="w-5 h-5 text-luxury-gold-dark" />,
      title: "Skilled Negotiation",
      description: "Securing optimal terms through market insight and calm, confident advocacy. Carole protects your equity and guides you to a successful close."
    },
    {
      icon: <Shield className="w-5 h-5 text-luxury-gold-dark" />,
      title: "Local Market Expertise",
      description: "Deep knowledge of Silicon Valley neighborhoods, school districts, and off-market opportunities — often before they ever reach the MLS."
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-luxury-gold-dark" />,
      title: "Responsive Communication",
      description: "A stress-free relationship built on clarity and accessibility. Carole keeps you informed and confident at every step."
    }
  ];

  const trustSeals = [
    { label: 'Top Producer', sub: 'Silicon Valley' },
    { label: '$340M+', sub: 'Career Volume' },
    { label: '98%', sub: 'Client Referrals' },
    { label: '12+ Yrs', sub: 'Local Expertise' },
  ];

  return (
    <section id="meet-carole" className="section-padding bg-soft-ivory text-charcoal border-b border-champagne/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          <Reveal className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute -inset-5 border border-luxury-gold/25 rounded-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-champagne/30 rounded-3xl transform translate-x-4 translate-y-4 pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden shadow-luxury-xl aspect-[3/4] bg-champagne group">
                <img
                  src={`/src/assets/images/${portraitImageName}.png`}
                  alt="Carole Staats, REALTOR®"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-5 left-5 bg-charcoal/90 backdrop-blur-md text-luxury-gold border border-luxury-gold/30 px-3 py-1.5 rounded-full text-[9px] tracking-widest font-mono font-bold uppercase flex items-center gap-1.5">
                  <BadgeCheck className="w-3 h-3" />
                  Top Producer 2025
                </div>

                <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl p-5 shadow-luxury-lg">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-serif text-xl font-semibold leading-none text-charcoal">Carole Staats</p>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-luxury-gold-dark mt-2 font-semibold">REALTOR® • CalRE #0194883</p>
                      <div className="flex items-center gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-luxury-gold text-luxury-gold" />
                        ))}
                        <span className="text-[10px] text-stone-500 font-mono ml-1">5.0 Client Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 space-y-7">
            <Reveal delay={100}>
              <div className="space-y-4">
                <span className="section-eyebrow">Your Trusted Local Advisor</span>
                <h2 className="section-title">Meet Carole Staats</h2>
                <p className="font-serif text-xl sm:text-2xl lg:text-[1.75rem] font-light text-luxury-gold-dark italic leading-snug max-w-xl">
                  Helping families navigate one of life's biggest decisions.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="bg-white border border-champagne/50 rounded-2xl p-5 sm:p-6 shadow-luxury border-l-4 border-l-luxury-gold">
                <p className="font-sans text-base sm:text-lg text-charcoal-light leading-relaxed">
                  When you work with Carole, you get <strong className="font-medium text-charcoal">Carole</strong> — not a call center, not a junior agent. She's built her reputation on honest communication, skilled negotiation, and genuine care for every family she serves.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="section-subtitle max-w-2xl">
                With deep roots in Silicon Valley and over a decade of local expertise, she offers personalized guidance that goes far beyond a typical transaction — whether you're buying your first home or selling a cherished family estate.
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {trustSeals.map((seal, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-champagne/50 rounded-xl p-4 text-center shadow-luxury hover:shadow-luxury-lg hover:border-luxury-gold/30 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <p className="font-serif text-xl sm:text-2xl font-light text-luxury-gold-dark">{seal.label}</p>
                    <p className="text-[9px] font-mono uppercase tracking-widest text-stone-500 mt-1">{seal.sub}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onOpenConsultation('consultation')}
                  className="btn-luxury btn-press shimmer-gold text-xs px-7 py-4 flex-1 sm:flex-none text-center"
                >
                  Book A Private Consultation
                </button>
                <a
                  href="tel:+15558902026"
                  className="btn-luxury-outline btn-press text-xs px-7 py-4 flex items-center justify-center gap-2 tap-target"
                >
                  <Phone className="w-4 h-4 text-luxury-gold-dark" />
                  555.890.2026
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 sm:mt-24 space-y-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="section-eyebrow">How Carole Serves You</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-charcoal tracking-tight">
                Why Clients Work With Carole
              </h3>
              <p className="section-subtitle">
                A personal advisory approach focused on your goals, your timeline, and your peace of mind.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4">
            {pillars.map((pillar, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <div className="card-luxury p-6 sm:p-8 flex gap-5 group">
                  <div className="flex-shrink-0 bg-soft-ivory border border-champagne/60 p-3.5 rounded-xl h-fit group-hover:bg-luxury-gold/10 group-hover:border-luxury-gold/30 transition-all duration-300">
                    {pillar.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg font-medium text-charcoal group-hover:text-luxury-gold-dark transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="font-sans font-light text-sm text-stone-500 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
