
import { useState, useEffect } from 'react';
import bsTranslations from '@/lang/bs.json';
import enTranslations from '@/lang/en.json';

type Language = 'bs' | 'en';
type Translations = typeof bsTranslations;

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('bs');
  const [translations, setTranslations] = useState<Translations>(bsTranslations);

  const initializeLanguage = () => {
    const savedLang = localStorage.getItem('webfokus-lang') as Language;
    const defaultLang = savedLang || 'bs';
    switchLanguage(defaultLang);
  };

  const switchLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    setTranslations(lang === 'bs' ? bsTranslations : enTranslations);
    localStorage.setItem('webfokus-lang', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: keyof Translations): string => {
    return translations[key] || key;
  };

  return {
    currentLanguage,
    switchLanguage,
    t,
    initializeLanguage
  };
};
