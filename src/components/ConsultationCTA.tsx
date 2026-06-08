/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Clock, Compass, Shield, User, MessageSquare, CheckCircle, FileText } from 'lucide-react';
import Reveal from './Reveal';

interface ConsultationCTAProps {
  selectedType: string;
  prefilledAddress: string;
  onClearPrefill: () => void;
}

export default function ConsultationCTA({ selectedType, prefilledAddress, onClearPrefill }: ConsultationCTAProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("consultation");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResponse, setBookingResponse] = useState<Record<string, string> | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (selectedType) {
      setType(selectedType);
    }
  }, [selectedType]);

  useEffect(() => {
    if (prefilledAddress) {
      let customMsg = `Hello! I'd like to schedule a consultation regarding the property at: "${prefilledAddress}". Please send over some available times.`;
      if (selectedType === "valuation") {
        customMsg = `Hello! I would like to schedule an in-person appraisal for my home at: "${prefilledAddress}". Please contact me to set a date.`;
      }
      setMessage(customMsg);
    }
  }, [prefilledAddress, selectedType]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!email && !phone) {
      setErrorMsg("Please provide at least one contact method (email or phone).");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/book-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          type,
          message,
          propertyDetails: prefilledAddress ? { address: prefilledAddress } : undefined
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setBookingResponse(data);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        onClearPrefill();
      } else {
        setErrorMsg("Unable to submit your request. Please try again.");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const trustPoints = [
    {
      icon: <Clock className="w-4 h-4 text-luxury-gold" />,
      title: "Quick Personal Response",
      text: "Carole responds personally within one business day."
    },
    {
      icon: <Compass className="w-4 h-4 text-luxury-gold" />,
      title: "Tailored To Your Goals",
      text: "No generic pitches — just honest guidance for your specific situation."
    },
    {
      icon: <Shield className="w-4 h-4 text-luxury-gold" />,
      title: "Complete Confidentiality",
      text: "Your information and property details are always kept private."
    }
  ];

  return (
    <section id="consultation-form" className="py-24 sm:py-28 bg-charcoal text-warm-white border-b border-charcoal-light relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(199,164,108,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

          <div className="lg:col-span-5 flex flex-col justify-between space-y-10 order-2 lg:order-1">
            <Reveal>
              <div className="space-y-5">
                <span className="text-[11px] uppercase tracking-[0.4em] font-mono text-luxury-gold font-bold block">
                  Let's Connect
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-warm-white tracking-tight leading-[1.1]">
                  Ready to Talk About Your Next Move?
                </h2>
                <p className="font-sans font-light text-sm sm:text-base text-stone-400 leading-relaxed max-w-md">
                  Whether you're buying, selling, or simply exploring your options — a conversation with Carole is the best place to start.
                </p>
              </div>
            </Reveal>

            <div className="space-y-6">
              {trustPoints.map((point, idx) => (
                <Reveal key={idx} delay={idx * 80}>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl shrink-0">
                      {point.icon}
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-warm-white">{point.title}</h4>
                      <p className="text-xs text-stone-400 leading-relaxed mt-1">{point.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={250}>
              <div className="pt-6 border-t border-white/10 max-w-md">
                <p className="text-xs text-stone-500 font-mono uppercase tracking-widest font-semibold">Direct Contact</p>
                <p className="text-sm font-semibold text-warm-white mt-2">
                  <a href="tel:+15558902026" className="text-luxury-gold hover:text-luxury-gold-light transition-colors">555.890.2026</a>
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  <a href="mailto:carolestaats.c21ag@gmail.com" className="hover:text-luxury-gold transition-colors">carolestaats.c21ag@gmail.com</a>
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-7 order-1 lg:order-2">
            <div
              id="consultation-form-card"
              className="bg-warm-white border border-champagne/30 rounded-3xl p-6 sm:p-10 shadow-luxury-xl relative flex flex-col justify-center text-charcoal scroll-mt-24 scroll-mb-24"
            >

              {!bookingResponse ? (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <h3 className="font-serif text-2xl font-light text-charcoal border-b border-champagne/50 pb-4">
                    Schedule Your Consultation
                  </h3>

                  {prefilledAddress && (
                    <div className="bg-luxury-gold/10 border border-luxury-gold/25 rounded-xl p-4 flex justify-between items-center text-xs">
                      <div className="space-y-0.5">
                        <span className="font-mono text-[9px] uppercase font-bold text-luxury-gold-dark block">Property Focus</span>
                        <p className="font-medium text-charcoal font-sans">{prefilledAddress}</p>
                      </div>
                      <button
                        type="button"
                        onClick={onClearPrefill}
                        className="bg-champagne/60 hover:bg-champagne text-charcoal px-3 py-1.5 rounded-lg text-[10px] font-mono font-medium focus:outline-none cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block font-bold">Full Name</label>
                    <div className="input-field-wrap">
                      <User className="input-field-icon" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block font-bold">Email</label>
                      <div className="input-field-wrap">
                        <Mail className="input-field-icon" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block font-bold">Phone</label>
                      <div className="input-field-wrap">
                        <Phone className="input-field-icon" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="555-123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block font-bold">Consultation Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="input-luxury text-sm cursor-pointer"
                    >
                      <option value="consultation">General Real Estate Consultation</option>
                      <option value="valuation">Home Valuation & Appraisal</option>
                      <option value="buyer">Buyer Advisory</option>
                      <option value="seller">Seller Marketing Consultation</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block font-bold">Your Message</label>
                    <div className="input-field-wrap input-field-wrap--textarea">
                      <MessageSquare className="input-field-icon" />
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your goals, timeline, or questions..."
                      />
                    </div>
                  </div>

                  {errorMsg && <p className="text-xs font-semibold text-rose-600">{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-luxury-gold hover:bg-luxury-gold-dark text-charcoal py-4 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all shadow-luxury-lg hover:shadow-luxury-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Request My Consultation"}
                  </button>
                </form>
              ) : (
                <div className="space-y-6 text-center py-6 animate-fade-in">
                  <div className="flex justify-center">
                    <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-full text-emerald-600">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-serif text-2xl font-light text-charcoal leading-tight">
                      Request Received
                    </h4>
                    <p className="text-sm font-sans font-light text-stone-500 max-w-md mx-auto">
                      {bookingResponse.message}
                    </p>
                  </div>

                  <div className="border border-luxury-gold/25 rounded-2xl p-5 bg-soft-ivory text-left space-y-3 max-w-md mx-auto relative overflow-hidden">
                    <div className="flex gap-2 items-center text-luxury-gold-dark font-mono text-[9px] uppercase font-bold tracking-widest pb-2 border-b border-champagne/50">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Confirmation Details</span>
                    </div>
                    <div className="grid grid-cols-2 gap-y-3 text-xs font-sans">
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400 block">Reference</span>
                        <span className="font-semibold text-charcoal">{bookingResponse.requestId}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400 block">Date</span>
                        <span className="font-semibold text-charcoal">{bookingResponse.submissionDate}</span>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-champagne/40">
                        <p className="text-[9px] font-mono uppercase tracking-wider text-stone-400">Next Steps</p>
                        <p className="text-[11px] text-stone-600 leading-relaxed mt-1">{bookingResponse.details}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingResponse(null)}
                    className="text-stone-500 hover:text-charcoal font-bold tracking-widest font-mono text-[10px] uppercase border-b-2 border-champagne hover:border-luxury-gold transition-colors pb-1 focus:outline-none cursor-pointer"
                  >
                    Book Another Consultation
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
