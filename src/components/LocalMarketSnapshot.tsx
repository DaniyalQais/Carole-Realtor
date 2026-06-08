/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TrendingUp, Clock, Home, Activity } from 'lucide-react';
import Reveal from './Reveal';

const metrics = [
  {
    icon: TrendingUp,
    label: 'Median Price',
    value: '$1,895,000',
    change: '+4.8% YoY',
    changePositive: true,
  },
  {
    icon: Clock,
    label: 'Days on Market',
    value: '14 Days',
    change: 'Fast Velocity',
    changePositive: true,
  },
  {
    icon: Home,
    label: 'Inventory Levels',
    value: '1.2 Months',
    change: "Seller's Market",
    changePositive: true,
  },
  {
    icon: Activity,
    label: 'Market Activity',
    value: '48 Closed',
    change: 'Last 12 Months',
    changePositive: true,
  },
];

export default function LocalMarketSnapshot() {
  return (
    <section
      id="market-snapshot"
      aria-label="Local market snapshot"
      className="bg-charcoal text-warm-white py-5 sm:py-6 border-y border-luxury-gold/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(199,164,108,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-4 sm:mb-0">
            <div className="shrink-0">
              <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-luxury-gold font-bold">
                Silicon Valley
              </p>
              <p className="font-serif text-sm sm:text-base font-light text-warm-white/90 mt-0.5">
                Local Market Snapshot
              </p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-luxury-gold/25 shrink-0" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 flex-grow">
              {metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 sm:gap-4 group"
                >
                  <div className="bg-luxury-gold/10 border border-luxury-gold/20 p-2 rounded-xl shrink-0 group-hover:bg-luxury-gold/20 transition-colors duration-300">
                    <metric.icon className="w-4 h-4 text-luxury-gold" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-stone-400 truncate">
                      {metric.label}
                    </p>
                    <p className="font-serif text-base sm:text-lg font-light text-warm-white tracking-tight">
                      {metric.value}
                    </p>
                    <p className={`text-[9px] font-mono font-semibold mt-0.5 ${
                      metric.changePositive ? 'text-emerald-400' : 'text-stone-400'
                    }`}>
                      {metric.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
