'use client';

import { useLanguage } from '@/providers/language-provider';
import { TOP_4_LANGUAGES, LanguageCode } from '@/lib/translations';

export default function TopLanguagesBar() {
  const { language, setLanguage, languages } = useLanguage();

  const topLangs = languages.filter((l) => (TOP_4_LANGUAGES as LanguageCode[]).includes(l.code));

  return (
    <div className="flex items-center gap-1.5 bg-stone-100/80 dark:bg-stone-800/80 p-1 rounded-xl border border-stone-200/60 dark:border-stone-700/60">
      {topLangs.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
              isActive
                ? 'bg-brand-500 text-white shadow-sm scale-105'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-700/60'
            }`}
            title={`Switch to ${lang.name}`}
          >
            <span>{lang.flag}</span>
            <span className="uppercase font-mono">{lang.code}</span>
          </button>
        );
      })}
    </div>
  );
}
