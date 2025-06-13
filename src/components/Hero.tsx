import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const Hero = () => {
  const { t, currentLanguage } = useTranslation();

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
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/hero_image.webp')" }}
    >
      {/* Subtle overlay for better image visibility */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm pointer-events-none"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg leading-tight">
            {t('hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 dark:text-white/80 mb-8 max-w-2xl mx-auto drop-shadow leading-relaxed">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg"
            >
              {t('hero_cta')}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={scrollToPortfolio}
              className="btn bg-white/80 dark:bg-white/10 text-gray-900 dark:text-white font-semibold rounded-lg shadow-lg border border-gray-300 dark:border-white/20"
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