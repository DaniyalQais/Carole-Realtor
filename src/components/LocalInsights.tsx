/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TrendingUp, Clock, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

export default function LocalInsights() {
  const [selectedCity, setSelectedCity] = useState("Los Altos Hills");

  const cityData: Record<string, {
    avgPrice: string;
    yoyPrice: string;
    inventory: string;
    marketState: string;
    dom: string;
    chartValues: { year: string; val: number; label: string }[];
  }> = {
    "Los Altos Hills": {
      avgPrice: "$3,850,000",
      yoyPrice: "+5.1%",
      inventory: "1.2 Months",
      marketState: "Seller's Market",
      dom: "12 Days Avg",
      chartValues: [
        { year: "2024", val: 72, label: "$3.45M" },
        { year: "2025", val: 84, label: "$3.66M" },
        { year: "2026 (Live)", val: 100, label: "$3.85M" }
      ]
    },
    "Los Altos": {
      avgPrice: "$2,450,000",
      yoyPrice: "+4.4%",
      inventory: "1.4 Months",
      marketState: "Seller's Market",
      dom: "15 Days Avg",
      chartValues: [
        { year: "2024", val: 68, label: "$2.20M" },
        { year: "2025", val: 80, label: "$2.34M" },
        { year: "2026 (Live)", val: 100, label: "$2.45M" }
      ]
    },
    "Saratoga": {
      avgPrice: "$2,890,000",
      yoyPrice: "+4.8%",
      inventory: "1.1 Months",
      marketState: "Seller's Market",
      dom: "10 Days Avg",
      chartValues: [
        { year: "2024", val: 75, label: "$2.58M" },
        { year: "2025", val: 88, label: "$2.72M" },
        { year: "2026 (Live)", val: 100, label: "$2.89M" }
      ]
    }
  };

  const activeData = cityData[selectedCity];

  return (
    <section id="market-insights" className="py-24 sm:py-28 bg-warm-white text-charcoal border-b border-champagne/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="section-eyebrow">
                Local Market Knowledge
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal tracking-tight">
                Market Insights
              </h2>
              <p className="text-sm sm:text-base font-sans font-light text-stone-500 max-w-xl leading-relaxed">
                Understand what's happening in your neighborhood — pricing trends, inventory levels, and how quickly homes are selling.
              </p>
            </div>

            <div className="flex bg-soft-ivory p-1.5 rounded-2xl border border-champagne/50 self-start md:self-auto shadow-luxury">
              {Object.keys(cityData).map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-2.5 text-xs uppercase tracking-wider font-mono font-bold rounded-xl transition-all focus:outline-none cursor-pointer ${
                    selectedCity === city
                      ? 'bg-white text-charcoal shadow-luxury border border-champagne/40'
                      : 'text-stone-400 hover:text-charcoal-light'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            <Reveal delay={0}>
              <div className="card-luxury p-6 sm:p-7 flex items-center justify-between group bg-white/80">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">Average Home Price</span>
                  <p className="text-2xl sm:text-3xl font-serif text-charcoal font-light">{activeData.avgPrice}</p>
                </div>
                <div className="text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl font-mono font-bold border border-emerald-200/60">
                  {activeData.yoyPrice} YoY
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="card-luxury p-6 sm:p-7 flex flex-col gap-4 bg-white/80">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">Available Inventory</span>
                    <p className="text-xl sm:text-2xl font-serif text-charcoal font-light">{activeData.inventory}</p>
                  </div>
                  <span className="text-[10px] bg-luxury-gold/10 text-luxury-gold-dark border border-luxury-gold/20 font-mono uppercase tracking-wider px-3 py-1.5 rounded-lg font-bold">
                    {activeData.marketState}
                  </span>
                </div>
                <div className="space-y-2 pt-1">
                  <div className="h-2 w-full bg-champagne/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-luxury-gold rounded-full transition-all duration-700"
                      style={{ width: selectedCity === "Los Altos Hills" ? '24%' : selectedCity === "Los Altos" ? '28%' : '20%' }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-stone-400">
                    <span>Limited Supply</span>
                    <span>Balanced (6 Mo.)</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="card-luxury p-6 sm:p-7 flex flex-col gap-4 bg-white/80">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> Days on Market
                    </span>
                    <p className="text-xl sm:text-2xl font-serif text-charcoal font-light">{activeData.dom}</p>
                  </div>
                  <div className="bg-sky-50 text-sky-700 border border-sky-200/60 font-mono text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-lg font-bold">
                    Active Market
                  </div>
                </div>
                <div className="flex items-end justify-between h-12 pt-2 gap-1">
                  {[45, 80, 100, 70, 30, 15, 8].map((bar, idx) => (
                    <div key={idx} className="flex flex-col items-center w-[11%] h-full justify-end">
                      <div
                        className={`w-full rounded-t-md transition-all duration-700 ${
                          idx === 2 ? 'bg-luxury-gold' : 'bg-champagne'
                        }`}
                        style={{ height: `${bar}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[9px] font-mono text-stone-400 border-t border-champagne/40 pt-2">
                  <span>1–5 Days</span>
                  <span>6–15 Days</span>
                  <span>30+ Days</span>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-7">
            <div className="card-luxury rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full bg-white/80">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500">Price Growth</p>
                  <h3 className="font-serif text-xl font-light text-charcoal mt-1">Average Sale Price Over Time</h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">+11.5% Growth</span>
                </div>
              </div>

              <div className="flex items-end justify-around h-52 sm:h-60 pt-6">
                {activeData.chartValues.map((bar, idx) => (
                  <div key={idx} className="flex flex-col items-center w-1/4 h-full justify-end relative group">
                    <div className="absolute -top-2 text-sm font-semibold text-charcoal font-serif tracking-tight">
                      {bar.label}
                    </div>
                    <div
                      className={`w-14 sm:w-16 rounded-t-xl transition-all duration-1000 relative overflow-hidden ${
                        idx === 2
                          ? 'bg-charcoal border border-luxury-gold/30 shadow-luxury'
                          : 'bg-champagne group-hover:bg-champagne/80'
                      }`}
                      style={{ height: `${bar.val}%` }}
                    >
                      {idx === 2 && (
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(199,164,108,0.15)_25%,transparent_25%,transparent_50%,rgba(199,164,108,0.15)_50%,rgba(199,164,108,0.15)_75%,transparent_75%,transparent)] bg-[size:10px_10px]" />
                      )}
                    </div>
                    <span className="text-xs font-mono text-stone-500 mt-4 uppercase tracking-widest font-bold">{bar.year}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-champagne/50 pt-6 flex gap-4 items-start text-sm">
                <div className="bg-luxury-gold/10 p-2.5 rounded-xl border border-luxury-gold/20 shrink-0">
                  <Sparkles className="w-4 h-4 text-luxury-gold-dark" />
                </div>
                <p className="font-serif font-light text-stone-500 leading-relaxed italic">
                  "In <strong className="font-sans not-italic text-charcoal-light">{selectedCity}</strong>, well-staged and correctly priced homes continue to attract strong buyer interest. I'd love to discuss what this means for your specific property." — Carole Staats
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
