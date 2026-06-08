/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { scrollToElement, scrollToConsultationFormAfterRender } from '../utils/scrollToElement';

export default function Footer() {

  const scrollToSection = (id: string) => {
    if (id === 'consultation-form') {
      scrollToConsultationFormAfterRender();
      return;
    }
    scrollToElement(id);
  };

  const navLinks = [
    { id: 'meet-carole', label: 'Meet Carole' },
    { id: 'buyers-sellers', label: 'Buyers & Sellers' },
    { id: 'featured-listings', label: 'Properties' },
    { id: 'valuation-tool', label: 'Home Value' },
    { id: 'market-insights', label: 'Market Insights' },
    { id: 'consultation-form', label: 'Schedule Meeting' },
    { id: 'office-location', label: 'Office Location' },
  ];

  return (
    <footer className="bg-charcoal text-stone-400 py-16 border-t border-charcoal-light relative overflow-hidden">

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">

          <div className="md:col-span-4 flex flex-col space-y-4">
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.25em] text-xl font-light text-warm-white">
                CAROLE STAATS
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-mono text-luxury-gold font-bold mt-1">
                REALTOR®
              </span>
            </div>
            <p className="font-sans font-light text-[13px] text-stone-400 leading-relaxed max-w-sm">
              Trusted local real estate advisor serving Silicon Valley families with integrity, expertise, and personalized care.
            </p>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-stone-300 font-bold">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-stone-400 hover:text-luxury-gold duration-300 transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-stone-300 font-bold">
              Contact
            </h4>
            <div className="space-y-3 text-xs">

              <div className="flex gap-2.5 items-start">
                <MapPin className="w-3.5 h-3.5 text-luxury-gold mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  CENTURY 21 Advantage Gold<br />
                  130 W. Main Street, Suite 138<br />
                  Trappe, PA 19426
                </span>
              </div>

              <div className="flex gap-2.5 items-center">
                <Mail className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                <a href="mailto:carolestaats.c21ag@gmail.com" className="hover:text-luxury-gold transition-all">carolestaats.c21ag@gmail.com</a>
              </div>

              <div className="flex gap-2.5 items-center">
                <Phone className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
                <a href="tel:+15558902026" className="hover:text-luxury-gold transition-all">555.890.2026</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-[10px] sm:text-[11px] text-stone-500 leading-relaxed font-mono tracking-wider">
          <div className="space-y-1 md:max-w-xl text-left">
            <p className="uppercase font-bold text-stone-400">Regulatory Disclosures</p>
            <p>
              Licensed REALTOR® in the State of California. License #0194883. Affiliated brokerage representation via Staats Luxury Brokerage Group, Inc. (CalRE #02124801). All metrics and sale statistics represent consolidated regional MLS records.
            </p>
            <p className="pt-1.5 flex flex-wrap gap-2 items-center text-[10px]">
              <span className="border border-white/15 px-2 py-0.5 rounded font-black text-stone-400">EQUAL HOUSING OPPORTUNITY</span>
              <span className="text-stone-600 hidden sm:inline">•</span>
              <span className="font-extrabold uppercase text-stone-400">MLS</span>
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1 font-sans shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-white/10 w-full md:w-auto">
            <p className="font-serif text-stone-300 font-semibold text-xs">© 2026 Carole Staats Real Estate.</p>
            <p className="text-[10px] text-stone-500">All rights reserved.</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
            Design by{' '}
            <a
              href="https://thenexusdynamics.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-luxury-gold transition-colors duration-300"
            >
              thenexusdynamics.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
