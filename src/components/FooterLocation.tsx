/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Building2, MapPin, ExternalLink } from 'lucide-react';
import Reveal from './Reveal';

const OFFICE_ADDRESS = '130 W. Main Street, Suite 138, Trappe, PA 19426';
const MAPS_QUERY = encodeURIComponent('130 W Main St, Trappe, PA 19426');
const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${MAPS_QUERY}&hl=en&z=15&output=embed`;
const MAPS_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

export default function FooterLocation() {
  return (
    <section
      id="office-location"
      aria-label="Office location and service area"
      className="section-padding bg-soft-ivory border-t border-champagne/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(199,164,108,0.05),transparent_55%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <Reveal>
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12 sm:mb-16">
            <span className="section-eyebrow">Visit Our Office</span>
            <h2 className="section-title">
              Local Expertise, Conveniently Located
            </h2>
            <p className="section-subtitle">
              Proudly serving buyers and sellers throughout Southeastern Pennsylvania.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">

          {/* Left: service area + office card */}
          <div className="flex flex-col gap-8 sm:gap-10 order-1 lg:order-1">

            <Reveal delay={80}>
              <div className="py-6 sm:py-8 border-y border-champagne/60 text-center">
                <p className="text-sm sm:text-base font-sans font-light text-stone-500 leading-relaxed max-w-lg mx-auto tracking-wide">
                  Proudly Servicing Montgomery County, Chester County, Delaware County, and the Greater Philadelphia Area.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="glass-card rounded-2xl p-7 sm:p-9 shadow-luxury-lg border border-champagne/50 hover:shadow-luxury-xl hover:border-luxury-gold/25 transition-all duration-500 group flex-grow">
                <div className="flex items-start gap-4">
                  <div className="bg-luxury-gold/10 border border-luxury-gold/20 p-3.5 rounded-xl shrink-0 group-hover:bg-luxury-gold/15 transition-colors duration-300">
                    <Building2 className="w-5 h-5 text-luxury-gold-dark" />
                  </div>
                  <div className="space-y-4 min-w-0">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-luxury-gold-dark font-bold mb-2">
                        Office Location
                      </p>
                      <p className="font-serif text-xl sm:text-2xl font-light text-charcoal tracking-tight">
                        CENTURY 21 Advantage Gold
                      </p>
                    </div>
                    <address className="not-italic text-sm text-stone-500 leading-relaxed font-sans font-light space-y-0.5">
                      <span className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-luxury-gold-dark mt-0.5 shrink-0" />
                        <span>
                          130 W. Main Street, Suite 138<br />
                          Trappe, PA 19426
                        </span>
                      </span>
                    </address>
                    <a
                      href={MAPS_LINK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-luxury-gold-dark hover:text-luxury-gold font-semibold transition-colors duration-300 group/link"
                    >
                      Get Directions
                      <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: map */}
          <Reveal delay={120} className="order-2 lg:order-2">
            <div className="h-full flex flex-col">
              <div className="rounded-2xl overflow-hidden border border-champagne/60 shadow-luxury-lg hover:shadow-luxury-xl transition-shadow duration-500 bg-white h-[280px] sm:h-[320px] lg:h-[400px] relative group">
                <div className="absolute top-4 left-4 z-10 glass-card-warm px-3 py-1.5 rounded-lg shadow-luxury pointer-events-none">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-stone-500 font-bold">Map</p>
                  <p className="text-xs font-serif text-charcoal">Trappe, PA</p>
                </div>
                <iframe
                  title="Century 21 Advantage Gold — 130 W Main St, Trappe, PA 19426"
                  src={MAPS_EMBED_URL}
                  className="w-full h-full border-0 grayscale-[20%] contrast-[1.02] group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p className="text-[10px] font-mono text-stone-400 text-center mt-3 tracking-wider uppercase">
                {OFFICE_ADDRESS}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
