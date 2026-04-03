import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import WhenToUse from "@/components/landing/WhenToUse";
import SafetyLimitations from "@/components/landing/SafetyLimitations";
import DoctorsTrust from "@/components/landing/DoctorsTrust";
import PrivacySection from "@/components/landing/PrivacySection";
import LeadCapture from "@/components/landing/LeadCapture";
import PhotoGuide from "@/components/landing/PhotoGuide";
import FAQSection from "@/components/landing/FAQSection";
import FinalCTA from "@/components/landing/FinalCTA";
import StickyMobileCTA from "@/components/landing/StickyMobileCTA";
import Footer from "@/components/landing/Footer";
import { useEffect } from "react";

const trackScroll = () => {
  let fired50 = false;
  let fired90 = false;
  const handler = () => {
    const pct = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
    if (pct > 0.5 && !fired50) {
      fired50 = true;
      (window as any).gtag?.("event", "scroll_50");
    }
    if (pct > 0.9 && !fired90) {
      fired90 = true;
      (window as any).gtag?.("event", "scroll_90");
    }
  };
  window.addEventListener("scroll", handler, { passive: true });
  return () => window.removeEventListener("scroll", handler);
};

export default function Index() {
  useEffect(() => {
    (window as any).gtag?.("event", "view_hero");
    return trackScroll();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <PhotoGuide />
        <WhenToUse />
        <SafetyLimitations />
        <DoctorsTrust />
        <PrivacySection />
        <LeadCapture />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
