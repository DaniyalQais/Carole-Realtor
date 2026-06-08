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
import { siteImages } from './assets/siteImages';

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

  return (
    <div className={`min-h-screen bg-warm-white overflow-x-hidden flex flex-col justify-between font-sans md:pb-0 transition-[padding] duration-300 ${showMobileCTA ? 'pb-20' : 'pb-0'}`}>

      <Header onOpenConsultation={handleOpenConsultation} />

      <Hero
        onOpenConsultation={handleOpenConsultation}
        heroImage={siteImages.hero}
      />

      <LocalMarketSnapshot />

      <PersonalBrand
        portraitImage={siteImages.portrait}
        onOpenConsultation={handleOpenConsultation}
      />

      <BuyersSellersHub onOpenConsultation={handleOpenConsultation} />

      <FeaturedShowcase
        onScheduleShowing={handleScheduledShowing}
        heroImage={siteImages.hero}
        interiorImage={siteImages.interior}
      />

      <HomeValueEstimator
        onScheduleValuation={handleScheduledValuation}
        portraitImage={siteImages.portrait}
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
