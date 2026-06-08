/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, Sparkles, Award, Shield, FileText, CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal';

export default function WhyChooseCarole() {
  const features = [
    {
      icon: <Compass className="w-5 h-5 text-luxury-gold-dark" />,
      title: "Local Expertise",
      text: "Decades of Silicon Valley market knowledge — from school districts and neighborhood trends to the nuances that truly affect your home's value."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-luxury-gold-dark" />,
      title: "Strategic Marketing",
      text: "Every listing is presented as a luxury experience — professional photography, thoughtful staging, and targeted exposure to qualified buyers."
    },
    {
      icon: <Award className="w-5 h-5 text-luxury-gold-dark" />,
      title: "Strong Negotiation",
      text: "Calm, fact-driven advocacy that consistently wins in competitive markets — protecting your interests and maximizing your outcome."
    },
    {
      icon: <Shield className="w-5 h-5 text-luxury-gold-dark" />,
      title: "Trusted Guidance",
      text: "Your trust is everything. Carole operates with complete transparency, loyalty, and discretion at every stage of your journey."
    },
    {
      icon: <FileText className="w-5 h-5 text-luxury-gold-dark" />,
      title: "Smooth Transactions",
      text: "From disclosures to inspections and escrow, every detail is managed with care — keeping your timeline on track and stress to a minimum."
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-luxury-gold-dark" />,
      title: "Responsive Advice",
      text: "Direct access to Carole — not a call center. Real answers, real guidance, when you need them most."
    }
  ];

  return (
    <section className="py-24 sm:py-28 bg-warm-white border-y border-champagne/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,164,108,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(233,223,210,0.4),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <Reveal>
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="section-eyebrow">
              Market Expertise You Can Trust
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal tracking-tight">
              Why Partner With Carole
            </h2>
            <p className="text-sm sm:text-base font-sans font-light text-stone-500">
              The qualities that set a great advisor apart — experience, integrity, and a genuine commitment to your success.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, index) => (
            <Reveal key={index} delay={index * 60}>
              <div className="card-luxury p-7 sm:p-8 relative group bg-white/80">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="space-y-4">
                  <div className="bg-soft-ivory border border-champagne/60 p-3.5 rounded-xl w-fit group-hover:bg-luxury-gold/10 group-hover:border-luxury-gold/25 transition-all duration-300">
                    {feat.icon}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-charcoal group-hover:text-luxury-gold-dark transition-colors">
                    {feat.title}
                  </h3>
                  <p className="font-sans font-light text-sm text-stone-500 leading-relaxed">
                    {feat.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
