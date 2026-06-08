/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { scrollToElement, scrollToConsultationFormAfterRender } from '../utils/scrollToElement';

interface HeaderProps {
  onOpenConsultation: (type?: string) => void;
}

export default function Header({ onOpenConsultation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (id === 'consultation-form') {
      scrollToConsultationFormAfterRender({ focusFirstField: true });
      return;
    }
    scrollToElement(id);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-warm-white/95 backdrop-blur-md shadow-luxury border-b border-champagne/50 py-3'
          : 'bg-warm-white/70 backdrop-blur-md py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer group flex flex-col"
          >
            <span className="font-serif tracking-[0.25em] text-lg font-light text-charcoal transition-colors duration-300">
              CAROLE STAATS
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] font-mono text-luxury-gold-dark font-medium">
              REALTOR®
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-[12px] uppercase tracking-widest font-sans font-medium">
            {[
              { id: 'meet-carole', label: 'Meet Carole' },
              { id: 'buyers-sellers', label: 'Buyers & Sellers' },
              { id: 'featured-listings', label: 'Properties' },
              { id: 'valuation-tool', label: 'Home Value' },
              { id: 'market-insights', label: 'Insights' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="transition-colors py-2 text-charcoal-light hover:text-luxury-gold-dark hover:underline hover:underline-offset-8"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <a
              href="tel:+15558902026"
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 border border-champagne rounded-full transition-all tracking-wider text-charcoal hover:bg-soft-ivory hover:border-luxury-gold/40"
            >
              <Phone className="w-3.5 h-3.5 text-luxury-gold-dark" />
              <span>555.890.2026</span>
            </a>
            <button
              onClick={() => onOpenConsultation('consultation')}
              className="bg-charcoal text-warm-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all hover:bg-luxury-gold hover:text-charcoal hover:shadow-luxury cursor-pointer"
            >
              Schedule Appointment
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <a
              href="tel:+15558902026"
              className="p-2.5 border border-champagne bg-white rounded-full text-charcoal shadow-luxury"
            >
              <Phone className="w-4 h-4 text-luxury-gold-dark" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 border border-champagne bg-white rounded-full text-charcoal focus:outline-none shadow-luxury"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-warm-white/98 backdrop-blur-lg border-b border-champagne/50 shadow-luxury-lg px-6 py-8 space-y-4 z-40">
          <div className="flex flex-col space-y-1 font-sans font-medium text-sm tracking-widest uppercase">
            {[
              { id: 'meet-carole', label: 'Meet Carole' },
              { id: 'buyers-sellers', label: 'Buyers & Sellers Hub' },
              { id: 'featured-listings', label: 'Featured Properties' },
              { id: 'valuation-tool', label: "What's Your Home Worth?" },
              { id: 'market-insights', label: 'Market Insights' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left py-3 text-charcoal-light hover:text-luxury-gold-dark border-b border-champagne/30"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation('consultation');
              }}
              className="w-full text-center bg-charcoal text-warm-white py-4 rounded-2xl text-xs font-semibold tracking-widest uppercase hover:bg-luxury-gold hover:text-charcoal transition-colors mt-4 shadow-luxury"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
