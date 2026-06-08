/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Sparkles, RefreshCw, CheckCircle2, ChevronRight, Calendar, Minus, Plus, Shield, Lock } from 'lucide-react';
import { EvaluationResult } from '../types';
import Reveal from './Reveal';

interface HomeValueEstimatorProps {
  onScheduleValuation: (address: string) => void;
  portraitImageName: string;
}

const propertyTypes = [
  { id: 'Single Family Residence', label: 'Single Family', icon: '🏡' },
  { id: 'Contemporary Estate', label: 'Estate', icon: '🏛️' },
  { id: 'Luxury Condominium', label: 'Condo', icon: '🏢' },
  { id: 'Townhouse', label: 'Townhouse', icon: '🏘️' },
];

export default function HomeValueEstimator({ onScheduleValuation, portraitImageName }: HomeValueEstimatorProps) {
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("Single Family Residence");
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2.5);
  const [addressFocused, setAddressFocused] = useState(false);

  const [loadingStep, setLoadingStep] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const steps = [
    "Locating your property...",
    "Reviewing recent neighborhood sales...",
    "Analyzing local market trends...",
    "Applying Carole's pricing expertise...",
    "Preparing your personalized estimate..."
  ];

  const formProgress = [
    address.length > 5,
    !!propertyType,
    bedrooms > 0,
  ].filter(Boolean).length;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isEvaluating) {
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= steps.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 700);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isEvaluating, steps.length]);

  const handleSubmitValuation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      setErrorMsg("Please enter a valid property street address.");
      return;
    }
    setErrorMsg("");
    setIsEvaluating(true);
    setEvaluationResult(null);

    try {
      const res = await fetch("/api/home-evaluation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, propertyType, bedrooms, bathrooms }),
      });

      if (res.ok) {
        const data = await res.json();
        setTimeout(() => {
          setEvaluationResult(data);
          setIsEvaluating(false);
        }, 3600);
      } else {
        setErrorMsg("Unable to connect to valuation service. Please try again.");
        setIsEvaluating(false);
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setIsEvaluating(false);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const progressPercent = isEvaluating
    ? Math.round(((loadingStep + 1) / steps.length) * 100)
    : 0;

  const adjustBeds = (delta: number) => setBedrooms((b) => Math.min(7, Math.max(1, b + delta)));
  const adjustBaths = (delta: number) => setBathrooms((b) => Math.min(5, Math.max(1, b + delta * 0.5)));

  return (
    <section id="valuation-tool" className="section-padding bg-soft-ivory text-charcoal border-b border-champagne/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(199,164,108,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <Reveal>
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12 sm:mb-16">
            <span className="section-eyebrow">Premium Home Valuation</span>
            <h2 className="section-title lg:text-[3.25rem]">What's Your Home Worth?</h2>
            <p className="section-subtitle">
              Get an instant, data-driven estimate — with personal insights reviewed by Carole Staats.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-champagne/50 rounded-3xl shadow-luxury-xl relative overflow-hidden">

              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-luxury-gold/40 via-luxury-gold to-luxury-gold/40" />
              <div className="absolute -top-24 -right-24 w-56 h-56 bg-luxury-gold/6 rounded-full blur-3xl pointer-events-none" />

              <div className="p-6 sm:p-10 lg:p-12 relative z-10">

                {!isEvaluating && !evaluationResult && (
                  <form onSubmit={handleSubmitValuation} className="space-y-8">

                    <div className="flex items-center justify-between gap-4 pb-2 border-b border-champagne/40">
                      <div className="flex items-center gap-3">
                        <img
                          src={`/src/assets/images/${portraitImageName}.png`}
                          alt="Carole Staats"
                          className="w-10 h-10 rounded-full object-cover border-2 border-luxury-gold/40"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="text-xs font-semibold text-charcoal">Carole Staats, REALTOR®</p>
                          <p className="text-[10px] text-stone-500 font-mono">Your estimate, personally reviewed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-stone-400">Form Progress</p>
                        <div className="flex gap-1 mt-1 justify-end">
                          {[1, 2, 3].map((step) => (
                            <div
                              key={step}
                              className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                                step <= formProgress ? 'bg-luxury-gold' : 'bg-champagne'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block font-bold">
                        Property Address
                      </label>
                      <div className={`input-field-wrap py-4 sm:py-5 transition-all duration-300 ${addressFocused ? 'scale-[1.01] border-luxury-gold' : ''}`}>
                        <MapPin className={`input-field-icon w-[18px] h-[18px] ${addressFocused ? 'text-luxury-gold' : ''}`} />
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          onFocus={() => setAddressFocused(true)}
                          onBlur={() => setAddressFocused(false)}
                          placeholder="130 W Main St, Trappe, PA"
                          className="text-base sm:text-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block font-bold">
                        Property Type
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {propertyTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setPropertyType(type.id)}
                            className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all duration-300 tap-target btn-press cursor-pointer ${
                              propertyType === type.id
                                ? 'border-luxury-gold bg-luxury-gold/10 shadow-luxury'
                                : 'border-champagne/60 bg-soft-ivory hover:border-luxury-gold/40 hover:bg-white'
                            }`}
                          >
                            <span className="text-xl">{type.icon}</span>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-charcoal">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block font-bold">Bedrooms</label>
                        <div className="flex items-center gap-3 bg-soft-ivory border border-champagne rounded-2xl p-2">
                          <button type="button" onClick={() => adjustBeds(-1)} className="tap-target flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-champagne hover:border-luxury-gold transition-colors cursor-pointer">
                            <Minus className="w-4 h-4 text-charcoal" />
                          </button>
                          <span className="flex-grow text-center font-serif text-2xl text-charcoal">{bedrooms}</span>
                          <button type="button" onClick={() => adjustBeds(1)} className="tap-target flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-champagne hover:border-luxury-gold transition-colors cursor-pointer">
                            <Plus className="w-4 h-4 text-charcoal" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block font-bold">Bathrooms</label>
                        <div className="flex items-center gap-3 bg-soft-ivory border border-champagne rounded-2xl p-2">
                          <button type="button" onClick={() => adjustBaths(-1)} className="tap-target flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-champagne hover:border-luxury-gold transition-colors cursor-pointer">
                            <Minus className="w-4 h-4 text-charcoal" />
                          </button>
                          <span className="flex-grow text-center font-serif text-2xl text-charcoal">{bathrooms}</span>
                          <button type="button" onClick={() => adjustBaths(1)} className="tap-target flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-champagne hover:border-luxury-gold transition-colors cursor-pointer">
                            <Plus className="w-4 h-4 text-charcoal" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {errorMsg && <p className="text-xs font-semibold text-rose-600">{errorMsg}</p>}

                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-2 text-[10px] font-mono uppercase tracking-wider text-stone-400">
                      <span className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-luxury-gold" /> Confidential</span>
                      <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-luxury-gold" /> No Obligation</span>
                      <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-luxury-gold" /> Instant Results</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-luxury-gold hover:bg-luxury-gold-dark text-charcoal py-4 sm:py-5 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all shadow-luxury-lg hover:shadow-luxury-xl btn-press shimmer-gold cursor-pointer tap-target"
                    >
                      Get My Home Value Estimate
                    </button>
                  </form>
                )}

                {isEvaluating && (
                  <div className="py-8 sm:py-12 flex flex-col items-center justify-center space-y-10">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-2 border-champagne border-t-luxury-gold animate-spin flex items-center justify-center">
                        <Compass className="w-8 h-8 text-luxury-gold-dark" />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-luxury-gold/5 animate-pulse" />
                    </div>

                    <div className="text-center space-y-6 max-w-md w-full">
                      <h4 className="font-serif text-2xl sm:text-3xl font-light text-charcoal">
                        Analyzing Your Property
                      </h4>

                      <div className="w-full bg-champagne/40 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <p className="text-xs font-mono text-luxury-gold-dark font-semibold">{progressPercent}% complete</p>

                      <div className="space-y-3 text-left">
                        {steps.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full border-2 transition-all shrink-0 ${
                              idx < loadingStep ? 'bg-luxury-gold border-luxury-gold-dark scale-100'
                              : idx === loadingStep ? 'bg-white border-luxury-gold animate-ping scale-110'
                              : 'bg-soft-ivory border-champagne scale-90'
                            }`} />
                            <span className={`text-xs font-mono tracking-wide transition-all ${
                              idx < loadingStep ? 'text-stone-400 line-through'
                              : idx === loadingStep ? 'text-charcoal font-semibold'
                              : 'text-stone-300'
                            }`}>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {evaluationResult && !isEvaluating && (
                  <div className="space-y-8 animate-fade-in">

                    <div className="text-center p-8 sm:p-10 bg-gradient-to-br from-soft-ivory to-champagne/30 border border-champagne/50 rounded-3xl shadow-luxury relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/10 rounded-full blur-2xl" />
                      <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-500 mb-3">Your Estimated Value</p>
                      <p className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-semibold tracking-tight leading-none">
                        {evaluationResult.estimatedValue}
                      </p>
                      <p className="text-sm text-stone-500 mt-3">
                        Midpoint: <span className="font-semibold text-charcoal">{formatCurrency(evaluationResult.midValue)}</span>
                      </p>
                      <div className={`inline-flex items-center gap-1.5 mt-4 px-4 py-1.5 rounded-full text-xs font-mono font-bold ${
                        evaluationResult.confidence === 'High'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-luxury-gold/10 text-luxury-gold-dark border border-luxury-gold/25'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {evaluationResult.confidence} Confidence
                      </div>
                    </div>

                    <div className="flex gap-4 items-start bg-white border border-champagne/50 rounded-2xl p-5 sm:p-6 shadow-luxury">
                      <img
                        src={`/src/assets/images/${portraitImageName}.png`}
                        alt="Carole Staats"
                        className="w-14 h-14 rounded-full object-cover border-2 border-luxury-gold/40 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-luxury-gold-dark font-bold mb-2">
                          Personal Note from Carole
                        </p>
                        <p className="display-quote text-base sm:text-lg">
                          "{evaluationResult.commentary}"
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-serif text-base font-semibold text-charcoal">Recent Comparable Sales</h4>
                      <div className="overflow-x-auto border border-champagne/50 rounded-2xl shadow-luxury">
                        <table className="min-w-full divide-y divide-champagne/40 text-left text-xs sm:text-sm">
                          <thead className="bg-soft-ivory font-mono text-[10px] uppercase tracking-widest text-stone-500">
                            <tr>
                              <th className="px-5 py-4">Address</th>
                              <th className="px-5 py-4 text-center">Specs</th>
                              <th className="px-5 py-4 text-right">Sold</th>
                              <th className="px-5 py-4 text-right hidden sm:table-cell">Distance</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-champagne/30 bg-white">
                            {evaluationResult.comps.map((comp, index) => (
                              <tr key={index} className="hover:bg-soft-ivory/60 transition-colors">
                                <td className="px-5 py-4 font-medium text-charcoal">{comp.address}</td>
                                <td className="px-5 py-4 text-center text-stone-500">{comp.beds}Bd / {comp.baths}Ba</td>
                                <td className="px-5 py-4 text-right font-serif font-bold text-charcoal">{comp.price}</td>
                                <td className="px-5 py-4 text-right text-stone-400 font-mono text-xs hidden sm:table-cell">{comp.distance}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {evaluationResult.regionalInsights.map((insight, idx) => (
                        <div key={idx} className="flex gap-3 items-start bg-soft-ivory p-4 border border-champagne/40 rounded-xl hover:border-luxury-gold/25 transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-luxury-gold-dark mt-0.5 shrink-0" />
                          <span className="text-sm font-light text-stone-600 leading-relaxed">{insight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-champagne/40 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                      <button
                        onClick={() => { setEvaluationResult(null); setAddress(""); }}
                        className="text-stone-500 hover:text-charcoal font-bold tracking-widest font-mono text-xs uppercase flex items-center justify-center gap-1.5 tap-target cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-luxury-gold-dark" />
                        Try Another Address
                      </button>
                      <button
                        onClick={() => onScheduleValuation(address)}
                        className="bg-charcoal hover:bg-luxury-gold text-warm-white hover:text-charcoal font-semibold px-8 py-4 rounded-2xl text-xs uppercase tracking-widest shadow-luxury-lg btn-press inline-flex items-center justify-center gap-2 cursor-pointer tap-target shimmer-gold"
                      >
                        <Calendar className="w-4 h-4" />
                        Schedule In-Person Appraisal
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
