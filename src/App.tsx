/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LocalMarketSnapshot from './components/LocalMarketSnapshot';
import PersonalBrand from './components/PersonalBrand';
import BuyersSellersHub from './components/BuyersSellersHub';
import FeaturedShowcase from './components/FeaturedShowcase';
import HomeValueEstimator from './components/HomeValueEstimator';
import WhyChooseCarole from './components/WhyChooseCarole';
import SuccessStories from './components/SuccessStories';
import LocalInsights from './components/LocalInsights';
import ConsultationCTA from './components/ConsultationCTA';
import FooterLocation from './components/FooterLocation';
import Footer from './components/Footer';
import MobileStickyCTA from './components/MobileStickyCTA';
import { scrollToConsultationFormAfterRender } from './utils/scrollToElement';

export default function App() {
  const [selectedConsultationType, setSelectedConsultationType] = useState("consultation");
  const [prefilledAddress, setPrefilledAddress] = useState("");
  const [showMobileCTA, setShowMobileCTA] = useState(false);

  const handleMobileCTAVisibility = useCallback((visible: boolean) => {
    setShowMobileCTA(visible);
  }, []);

  const handleOpenConsultation = (type: string = "consultation") => {
    setSelectedConsultationType(type);
    scrollToConsultationFormAfterRender({ focusFirstField: true });
  };

  const handleScrollToValuation = () => {
    const element = document.getElementById("valuation-tool");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScheduledShowing = (propertyAddress: string) => {
    setSelectedConsultationType("buyer");
    setPrefilledAddress(propertyAddress);
    scrollToConsultationFormAfterRender({ focusFirstField: true, delayMs: 200 });
  };

  const handleScheduledValuation = (propertyAddress: string) => {
    setSelectedConsultationType("valuation");
    setPrefilledAddress(propertyAddress);
    scrollToConsultationFormAfterRender({ focusFirstField: true, delayMs: 200 });
  };

  const handleClearPrefill = () => {
    setPrefilledAddress("");
    setSelectedConsultationType("consultation");
  };

  const HERO_IMAGE_REF = "hero_luxury_home_1780911684969";
  const PORTRAIT_IMAGE_REF = "carole_staats_portrait_1780911705876";
  const INTERIOR_IMAGE_REF = "luxury_interior_1780911728480";

  return (
    <div className={`min-h-screen bg-warm-white overflow-x-hidden flex flex-col justify-between font-sans md:pb-0 transition-[padding] duration-300 ${showMobileCTA ? 'pb-20' : 'pb-0'}`}>

      <Header onOpenConsultation={handleOpenConsultation} />

      <Hero
        onOpenConsultation={handleOpenConsultation}
        heroImageName={HERO_IMAGE_REF}
      />

      <LocalMarketSnapshot />

      <PersonalBrand
        portraitImageName={PORTRAIT_IMAGE_REF}
        onOpenConsultation={handleOpenConsultation}
      />

      <BuyersSellersHub onOpenConsultation={handleOpenConsultation} />

      <FeaturedShowcase
        onScheduleShowing={handleScheduledShowing}
        heroImageName={HERO_IMAGE_REF}
        interiorImageName={INTERIOR_IMAGE_REF}
      />

      <HomeValueEstimator
        onScheduleValuation={handleScheduledValuation}
        portraitImageName={PORTRAIT_IMAGE_REF}
      />

      <WhyChooseCarole />

      <SuccessStories />

      <LocalInsights />

      <ConsultationCTA
        selectedType={selectedConsultationType}
        prefilledAddress={prefilledAddress}
        onClearPrefill={handleClearPrefill}
      />

      <FooterLocation />

      <Footer />

      <MobileStickyCTA
        onBookConsultation={() => handleOpenConsultation("consultation")}
        onGetHomeValue={handleScrollToValuation}
        onVisibilityChange={handleMobileCTAVisibility}
      />

    </div>
  );
}
