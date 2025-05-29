
import React from 'react';
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const Hero = () => {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 pt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            {t('hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {t('hero_cta')}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToPortfolio}
              className="btn"
            >
              {t('hero_portfolio')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
