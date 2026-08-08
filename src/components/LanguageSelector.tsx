'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/providers/language-provider';
import { Globe, ChevronDown, Check, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageCode } from '@/lib/translations';

interface LanguageSelectorProps {
  variant?: 'navbar' | 'drawer' | 'select';
  className?: string;
}

export default function LanguageSelector({ variant = 'navbar', className = '' }: LanguageSelectorProps) {
  const { currentLanguage, setLanguage, languages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
    setSearchQuery('');
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // Pure Native HTML Select Dropdown variant
  if (variant === 'select') {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <Globe className="w-4 h-4 text-brand-500 absolute left-3 pointer-events-none z-10" />
        <select
          value={currentLanguage.code}
          onChange={(e) => handleSelect(e.target.value as LanguageCode)}
          aria-label={t('language', 'Language')}
          className="appearance-none pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-stone-100 dark:bg-stone-800/90 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-700/80 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 py-1">
              {lang.flag} {lang.nativeName} ({lang.name})
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 pointer-events-none z-10" />
      </div>
    );
  }

  // Drawer variant for mobile menu grid
  if (variant === 'drawer') {
    return (
      <div className={`w-full space-y-3 ${className}`}>
        <div className="flex items-center justify-between text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-1">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-brand-500" />
            {t('language', 'Language')}
          </span>
          <span className="text-[11px] font-normal text-stone-400">
            {currentLanguage.flag} {currentLanguage.nativeName}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-stone-300 dark:scrollbar-thumb-stone-700">
          {languages.map((lang) => {
            const isSelected = lang.code === currentLanguage.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20 font-bold'
                    : 'bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700/80'
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <span className="text-sm leading-none">{lang.flag}</span>
                  <span className="truncate">{lang.nativeName}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Navbar Popover Dropdown with Search Bar & Flag Items
  return (
    <div className={`relative z-50 inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-label={t('language', 'Language')}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-stone-100 dark:bg-stone-800/90 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-700/80 transition-all shadow-sm active:scale-95 cursor-pointer"
      >
        <Globe className="w-4 h-4 text-brand-500 shrink-0 pointer-events-none" />
        <span className="flex items-center gap-1.5 pointer-events-none">
          <span className="text-sm leading-none">{currentLanguage.flag}</span>
          <span className="hidden sm:inline-block font-mono text-xs uppercase font-bold tracking-wide">
            {mounted ? currentLanguage.code : 'EN'}
          </span>
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 pointer-events-none ${
            isOpen ? 'rotate-180 text-brand-500' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-64 sm:w-72 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl shadow-stone-950/20 dark:shadow-black/60 z-[100] overflow-hidden"
          >
            {/* Search Header */}
            <div className="p-2.5 border-b border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 absolute left-3 text-stone-400 pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('search_language', 'Search language...')}
                  className="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 p-0.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Language Options List */}
            <div className="max-h-64 overflow-y-auto p-1.5 space-y-0.5 scrollbar-thin scrollbar-thumb-stone-200 dark:scrollbar-thumb-stone-800">
              {filteredLanguages.length === 0 ? (
                <div className="p-4 text-center text-xs text-stone-400">No language found</div>
              ) : (
                filteredLanguages.map((lang) => {
                  const isSelected = lang.code === currentLanguage.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleSelect(lang.code)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-semibold border border-brand-200 dark:border-brand-500/30'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/80 border border-transparent'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-base leading-none">{lang.flag}</span>
                        <span className="flex flex-col text-left">
                          <span className="font-semibold text-stone-900 dark:text-stone-100">
                            {lang.nativeName}
                          </span>
                          <span className="text-[10px] text-stone-400">{lang.name}</span>
                        </span>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 uppercase font-bold">
                          {lang.code}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-brand-500 shrink-0" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
