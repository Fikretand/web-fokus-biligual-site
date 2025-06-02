
import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PortfolioOptimized from "@/components/PortfolioOptimized";
import Process from "@/components/Process";
import PricingOptimized from "@/components/PricingOptimized";
import Reviews from "@/components/Reviews";
import FAQOptimized from "@/components/FAQOptimized";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { useSEO } from "@/hooks/useSEO";
import { useTranslation } from "@/hooks/useTranslation";

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const WebFokusHome = () => {
  const { initializeTheme } = useTheme();
  const { currentLanguage } = useTranslation();

  // SEO optimization based on current language
  const seoData = {
    title: currentLanguage === 'bs' 
      ? 'Web Fokus - Brzi i povoljni web-sajtovi za mali biznis | Sarajevo'
      : 'Web Fokus - Fast & Affordable Websites for Small Business | Sarajevo',
    description: currentLanguage === 'bs'
      ? 'Profesionalni web sajtovi za male biznise u BiH. Brza isporuka, povoljne cijene, uključen hosting i domena. Započnite već od 250 KM. Izrada web stranica Sarajevo.'
      : 'Professional websites for small businesses in BiH. Fast delivery, affordable prices, hosting and domain included. Starting from 250 KM. Web design Sarajevo.',
    keywords: currentLanguage === 'bs'
      ? 'izrada web stranica, web dizajn Sarajevo, moderni sajtovi za firme, responzivne web stranice, web fokus, web stranice bosnia'
      : 'web design Bosnia, affordable websites for businesses, responsive web development, modern websites, web design Sarajevo',
    ogTitle: currentLanguage === 'bs'
      ? 'Web Fokus - Profesionalni web sajtovi za mali biznis'
      : 'Web Fokus - Professional websites for small business',
    ogDescription: currentLanguage === 'bs'
      ? 'Izradimo vam moderan, responzivan web sajt već od 250 KM. Uključen hosting, domena i SEO optimizacija.'
      : 'We create modern, responsive websites starting from 250 KM. Hosting, domain and SEO optimization included.',
    ogImage: 'https://webfokus.ba/hero_image.webp',
    canonical: 'https://webfokus.ba',
    lang: currentLanguage
  };

  useSEO(seoData);

  useEffect(() => {
    initializeTheme();
  }, []);

  // Track page view with proper error handling
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: seoData.title,
          page_location: window.location.href
        });
      } catch (error) {
        console.warn('Google Analytics tracking failed:', error);
      }
    }
  }, [currentLanguage, seoData.title]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Services />
        <PortfolioOptimized />
        <Process />
        <PricingOptimized />
        <Reviews />
        <FAQOptimized />
        <Contact />
      </main>
      <Footer />
      
      {/* WhatsApp Float Button with enhanced accessibility */}
      <a 
        href="https://wa.me/38761234567?text=Zdravo%21%20Zainteresovan%20sam%20za%20izradu%20web%20sajta." 
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        aria-label={currentLanguage === 'bs' ? 'Kontaktirajte nas putem WhatsApp-a' : 'Contact us via WhatsApp'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.215"/>
        </svg>
      </a>
    </div>
  );
};

export default WebFokusHome;
