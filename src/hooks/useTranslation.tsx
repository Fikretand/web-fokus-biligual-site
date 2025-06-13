import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import bsTranslations from '@/lang/bs.json';
import enTranslations from '@/lang/en.json';

type Language = 'bs' | 'en';
type Translations = typeof bsTranslations;

interface TranslationContextProps {
  currentLanguage: Language;
  switchLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('bs');
  const [translations, setTranslations] = useState<Translations>(bsTranslations);

  useEffect(() => {
    const savedLang = localStorage.getItem('webfokus-lang') as Language;
    const defaultLang = savedLang || 'bs';
    setCurrentLanguage(defaultLang);
    setTranslations(defaultLang === 'bs' ? bsTranslations : enTranslations);
    document.documentElement.lang = defaultLang;
  }, []);

  const switchLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    setTranslations(lang === 'bs' ? bsTranslations : enTranslations);
    localStorage.setItem('webfokus-lang', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: keyof Translations): string => {
    return translations[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ currentLanguage, switchLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};