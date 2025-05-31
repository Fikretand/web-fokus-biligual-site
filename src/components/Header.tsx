
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, Menu, X } from "lucide-react";

const Header = () => {
  const { currentLanguage, switchLanguage, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'portfolio', 'process', 'pricing', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { key: 'hero', label: t('nav_home') },
    { key: 'services', label: t('nav_services') },
    { key: 'portfolio', label: t('nav_portfolio') },
    { key: 'process', label: t('nav_process') },
    { key: 'pricing', label: t('nav_pricing') },
    { key: 'reviews', label: t('nav_reviews') },
    { key: 'contact', label: t('nav_contact') }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png" // ili "/logo.png"
              alt="Web Fokus logo"
              className="h-16 w-auto" // visina 36px, širina automatska
              style={{ maxWidth: 100, maxHeight: 64 }} // maksimalna širina 100px, maksimalna visina 64px
            />
            <span className="text-2xl font-bold text-primary">Web Fokus</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.key)}
                className={`nav-link transition-colors hover:text-primary ${
                  activeSection === item.key ? 'active-link text-primary' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => switchLanguage(currentLanguage === 'bs' ? 'en' : 'bs')}
              className="lang-toggle"
            >
              {currentLanguage === 'bs' ? 'EN' : 'BS'}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="nav-menu md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className={`nav-link text-left transition-colors hover:text-primary ${
                    activeSection === item.key ? 'active-link text-primary' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
