/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Home } from 'lucide-react';

interface MobileStickyCTAProps {
  onBookConsultation: () => void;
  onGetHomeValue: () => void;
  onVisibilityChange?: (visible: boolean) => void;
}

export default function MobileStickyCTA({ onBookConsultation, onGetHomeValue, onVisibilityChange }: MobileStickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const show = !entry.isIntersecting;
        setIsVisible(show);
        onVisibilityChange?.(show);
      },
      { threshold: 0, rootMargin: '-10% 0px 0px 0px' }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [onVisibilityChange]);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-warm-white via-warm-white/95 to-transparent pointer-events-none transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      aria-hidden={!isVisible}
    >
      <div className={`grid grid-cols-2 gap-2.5 max-w-lg mx-auto transition-opacity duration-300 ${isVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <button
          onClick={onBookConsultation}
          className="flex flex-col items-center justify-center gap-1 bg-charcoal text-warm-white rounded-2xl py-3.5 px-3 min-h-[52px] shadow-luxury-xl border border-luxury-gold/20 transition-all active:scale-[0.97] hover:bg-charcoal-light cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-luxury-gold" />
          <span className="text-[10px] font-bold uppercase tracking-wider leading-tight text-center">
            Book Consultation
          </span>
        </button>
        <button
          onClick={onGetHomeValue}
          className="flex flex-col items-center justify-center gap-1 bg-luxury-gold text-charcoal rounded-2xl py-3.5 px-3 min-h-[52px] shadow-luxury-xl border border-luxury-gold-dark/20 transition-all active:scale-[0.97] hover:bg-luxury-gold-dark cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider leading-tight text-center">
            Home Value Estimate
          </span>
        </button>
      </div>
    </div>
  );
}
