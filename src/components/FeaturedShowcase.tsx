/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Eye, Calendar, Sparkles, MapPin, CheckCircle, X, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import Reveal from './Reveal';

interface FeaturedShowcaseProps {
  onScheduleShowing: (propertyAddress: string) => void;
  heroImage: string;
  interiorImage: string;
}

function getStatusStyle(status: string) {
  const s = status.toLowerCase();
  if (s.includes('active')) return 'bg-emerald-700/90 text-white border-emerald-400/30';
  if (s.includes('pending')) return 'bg-luxury-gold-dark/90 text-white border-luxury-gold/30';
  if (s.includes('sold')) return 'bg-charcoal/90 text-luxury-gold border-luxury-gold/30';
  return 'bg-charcoal/85 text-luxury-gold border-luxury-gold/30';
}

export default function FeaturedShowcase({ onScheduleShowing, heroImage, interiorImage }: FeaturedShowcaseProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/featured-listings");
        if (res.ok) setProperties(await res.json());
      } catch (err) {
        console.error("Failed to fetch listings: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const resolvePropertyImage = (imgRef: string) => {
    if (imgRef === "hero_luxury_home") return heroImage;
    if (imgRef === "luxury_interior") return interiorImage;
    return imgRef;
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <section id="featured-listings" className="section-padding bg-warm-white text-charcoal border-b border-champagne/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 sm:mb-16">
            <div className="space-y-4">
              <span className="section-eyebrow">Curated Portfolio</span>
              <h2 className="section-title">Featured Properties</h2>
              <p className="section-subtitle max-w-xl">
                Handpicked homes representing Carole's standards of location, architecture, and design.
              </p>
            </div>
            <button
              onClick={() => onScheduleShowing("General Request - Off Market List")}
              className="group flex items-center gap-2 text-charcoal border-b-2 border-luxury-gold hover:border-charcoal hover:text-luxury-gold-dark transition-colors py-2 text-xs uppercase tracking-widest font-mono font-bold whitespace-nowrap cursor-pointer tap-target"
            >
              Off-Market Inventory
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </Reveal>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-5 animate-pulse">
                <div className="bg-champagne/40 aspect-[5/4] rounded-3xl" />
                <div className="h-7 bg-champagne/30 rounded w-2/3" />
                <div className="h-12 bg-champagne/30 rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {properties.map((property, idx) => (
              <Reveal key={property.id} delay={idx * 80}>
                <article className="bg-white border border-champagne/50 rounded-3xl overflow-hidden shadow-luxury hover:shadow-[0_20px_60px_-12px_rgba(31,41,55,0.15),0_8px_24px_-8px_rgba(199,164,108,0.2)] hover:border-luxury-gold/35 transition-all duration-500 flex flex-col group hover:-translate-y-2">

                  <div className="relative aspect-[5/4] overflow-hidden bg-champagne/30">
                    <img
                      src={resolvePropertyImage(property.image)}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className={`backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] tracking-widest font-mono font-bold uppercase border ${getStatusStyle(property.status)}`}>
                        {property.status}
                      </span>
                      {property.type && (
                        <span className="bg-white/90 backdrop-blur-md text-charcoal border border-champagne/60 px-3 py-1.5 rounded-full text-[10px] tracking-widest font-mono font-bold uppercase">
                          {property.type}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-grow flex flex-col space-y-5">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">Listed At</p>
                      <p className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight group-hover:text-luxury-gold-dark transition-colors duration-300">
                        {formatCurrency(property.price)}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-serif text-xl font-medium text-charcoal leading-snug">
                        {property.title}
                      </h3>
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 text-luxury-gold-dark shrink-0" />
                        <span className="text-xs text-stone-500 leading-relaxed">{property.address}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-soft-ivory border border-champagne/50 rounded-xl px-5 py-3.5 text-xs text-charcoal-light font-mono">
                      <span><strong className="text-charcoal">{property.beds}</strong> Bd</span>
                      <span className="text-champagne">|</span>
                      <span><strong className="text-charcoal">{property.baths}</strong> Ba</span>
                      <span className="text-champagne">|</span>
                      <span><strong className="text-charcoal">{new Intl.NumberFormat().format(property.sqft)}</strong> Sq Ft</span>
                    </div>

                    <p className="font-sans font-light text-sm text-stone-500 line-clamp-2 leading-relaxed flex-grow">
                      {property.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        onClick={() => setSelectedProperty(property)}
                        className="border border-champagne hover:border-charcoal text-charcoal font-semibold px-4 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:bg-soft-ivory btn-press tap-target"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Details
                      </button>
                      <button
                        onClick={() => onScheduleShowing(property.address)}
                        className="bg-charcoal hover:bg-luxury-gold text-warm-white hover:text-charcoal font-semibold px-4 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-luxury hover:shadow-luxury-lg btn-press tap-target"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        Tour
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {selectedProperty && (
        <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedProperty(null)}>
          <div className="bg-warm-white border border-champagne/50 rounded-3xl w-full max-w-3xl overflow-hidden shadow-luxury-xl relative max-h-[90vh] flex flex-col animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-5 right-5 z-10">
              <button onClick={() => setSelectedProperty(null)} className="bg-charcoal/80 text-white hover:bg-luxury-gold hover:text-charcoal p-2.5 rounded-full transition-colors shadow-luxury cursor-pointer tap-target">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-y-auto flex-grow">
              <div className="relative aspect-[16/9] bg-champagne/30">
                <img src={resolvePropertyImage(selectedProperty.image)} alt={selectedProperty.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-warm-white space-y-2">
                  <span className={`inline-block backdrop-blur-md px-3 py-1 rounded-full text-[9px] uppercase font-mono font-bold tracking-widest border ${getStatusStyle(selectedProperty.status)}`}>
                    {selectedProperty.status}
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-light">{selectedProperty.title}</h4>
                  <p className="text-stone-200 text-xs flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-luxury-gold" />{selectedProperty.address}</p>
                </div>
              </div>
              <div className="p-6 sm:p-8 space-y-6">
                <div className="bg-soft-ivory border border-champagne/50 p-6 rounded-2xl">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-stone-500">Listing Price</p>
                  <p className="font-serif text-4xl text-charcoal font-semibold mt-1">{formatCurrency(selectedProperty.price)}</p>
                </div>
                <p className="text-sm sm:text-base text-stone-500 leading-relaxed">{selectedProperty.description}</p>
                <div className="space-y-3">
                  <h5 className="font-serif text-lg font-semibold flex items-center gap-2"><Sparkles className="w-4 h-4 text-luxury-gold-dark" />Features</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProperty.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 p-3.5 bg-soft-ivory border border-champagne/40 rounded-xl">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-sm text-stone-600">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-champagne/50 p-6 bg-soft-ivory flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-stone-500 text-center sm:text-left">Schedule a private walkthrough with Carole Staats.</p>
              <button onClick={() => { setSelectedProperty(null); onScheduleShowing(selectedProperty.address); }} className="btn-luxury btn-press text-xs px-7 py-3.5 shrink-0 tap-target">
                Schedule Private Tour
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
