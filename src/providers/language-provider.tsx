'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, TRANSLATIONS, Language, LanguageCode } from '@/lib/translations';

interface LanguageContextType {
  language: LanguageCode;
  currentLanguage: Language;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'pintsave_preferred_language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (saved && LANGUAGES.some((l) => l.code === saved)) {
      setLanguageState(saved);
    } else {
      // Try detecting browser language
      const browserLang = navigator.language?.split('-')[0] as LanguageCode;
      if (browserLang && LANGUAGES.some((l) => l.code === browserLang)) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, code);
      const selected = LANGUAGES.find((l) => l.code === code);
      document.documentElement.lang = code;
      document.documentElement.dir = selected?.dir || 'ltr';
    }
  };

  useEffect(() => {
    if (mounted) {
      const selected = LANGUAGES.find((l) => l.code === language);
      document.documentElement.lang = language;
      document.documentElement.dir = selected?.dir || 'ltr';
    }
  }, [language, mounted]);

  const currentLanguage = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const t = (key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    if (TRANSLATIONS['en'][key]) {
      return TRANSLATIONS['en'][key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, currentLanguage, setLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
