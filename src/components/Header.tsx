'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from '@/providers/theme-provider';
import { useLanguage } from '@/providers/language-provider';
import LanguageSelector from './LanguageSelector';
import TopLanguagesBar from './TopLanguagesBar';
import {
  Moon,
  Sun,
  Sparkles,
  Menu,
  X,
  Video,
  Image as ImageIcon,
  FileImage,
  BookOpen,
  HelpCircle,
  Info,
  Mail,
  ArrowRight,
  LucideIcon
} from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isDark = resolvedTheme === 'dark' || theme === 'dark';

  const navLinks: NavItem[] = [
    { href: '/pinterest-video-downloader', label: 'Video', icon: Video, badge: 'HD' },
    { href: '/pinterest-image-downloader', label: 'Image', icon: ImageIcon, badge: '4K' },
    { href: '/pinterest-gif-downloader', label: 'GIF', icon: FileImage, badge: 'Fast' },
    { href: '/blog', label: t('nav_blog', 'Blog'), icon: BookOpen },
    { href: '/faq', label: t('nav_faq', 'FAQ'), icon: HelpCircle },
    { href: '/about', label: t('nav_about', 'About'), icon: Info },
    { href: '/contacts-us', label: t('nav_contact', 'Contact'), icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/90 dark:bg-stone-950/90 border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200 border border-stone-200 dark:border-stone-800 bg-stone-900 flex items-center justify-center">
            <Image
              src="/icon.png"
              alt="PintSave Logo"
              width={36}
              height={36}
              className="w-full h-full object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tight text-stone-900 dark:text-white">
              Pint<span className="text-brand-500">Save</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-500/20 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              {t('hd_media', 'HD Media')}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-2.5 py-1.5 text-xs xl:text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-950/40'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/60'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md font-bold uppercase leading-none shrink-0 ${
                      isActive
                        ? 'bg-brand-500 text-white'
                        : 'bg-stone-200/80 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-brand-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Top 4 Quick Languages */}
          <div className="hidden xl:block">
            <TopLanguagesBar />
          </div>

          {/* Language Selector Dropdown */}
          <LanguageSelector variant="navbar" />

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={t('toggle_theme', 'Toggle Theme')}
            title={t('toggle_theme', 'Toggle Theme')}
            className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800/90 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200/80 dark:border-stone-700/80 transition-all shadow-sm active:scale-95 shrink-0"
          >
            {mounted && isDark ? (
              <Sun className="w-4 h-4 text-amber-400 rotate-0 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-stone-700 transition-transform duration-300" />
            )}
          </button>

          {/* Fast Save Action Button */}
          <Link href="/#downloader" className="hidden sm:inline-block">
            <Button size="sm" className="shadow-brand-500/25 hover:shadow-brand-500/40 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>{t('fast_save', 'Fast Save')}</span>
            </Button>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t('close', 'Close') : t('menu', 'Menu')}
            className="lg:hidden p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-800 transition-all active:scale-95 shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-brand-500" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white/95 dark:bg-stone-950/95 backdrop-blur-2xl border-b border-stone-200 dark:border-stone-800"
          >
            <div className="max-w-7xl mx-auto px-4 py-5 space-y-5">
              
              {/* Quick Languages Bar in Mobile */}
              <div>
                <div className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2 px-1">
                  Quick Languages
                </div>
                <TopLanguagesBar />
              </div>

              {/* Downloader Tools Header */}
              <div>
                <div className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2 px-1">
                  Download Tools
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {navLinks.slice(0, 3).map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                          isActive
                            ? 'bg-brand-50 dark:bg-brand-950/40 border-brand-200 dark:border-brand-500/30 text-brand-600 dark:text-brand-400 font-semibold'
                            : 'bg-stone-50 dark:bg-stone-900 border-stone-200/80 dark:border-stone-800/80 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-850'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-lg ${isActive ? 'bg-brand-500 text-white' : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold">{link.label}</span>
                        </div>
                        {link.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-500 font-bold">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Links Grid */}
              <div>
                <div className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2 px-1">
                  Pages & Info
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {navLinks.slice(3).map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-brand-500 text-white font-semibold'
                            : 'bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-stone-400" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Language Grid */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                <LanguageSelector variant="drawer" />
              </div>

              {/* CTA Action in Mobile Menu */}
              <div className="pt-2">
                <Link
                  href="/#downloader"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-500/25 hover:bg-brand-600 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{t('fast_save', 'Fast Save')}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
