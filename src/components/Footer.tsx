
import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";

const Footer = () => {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Web Fokus</h3>
            <p className="text-muted-foreground mb-4">
              {t('footer_tagline')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer_services_title')}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">{t('footer_web_design')}</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">{t('footer_seo')}</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">{t('footer_hosting')}</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">{t('footer_maintenance')}</button></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer_company_title')}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-primary transition-colors">{t('footer_portfolio')}</button></li>
              <li><button onClick={() => scrollToSection('process')} className="hover:text-primary transition-colors">{t('footer_process')}</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="hover:text-primary transition-colors">{t('footer_pricing')}</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">{t('footer_contact')}</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('contact_title')}</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>Sarajevo, Bosnia and Herzegovina</p>
              <p>info@webfokus.ba</p>
              <p>+387 61 234 567</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Web Fokus. {t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
