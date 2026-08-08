'use client';

import Link from 'next/link';
import { 
  ShieldCheck, 
  Zap, 
  Heart, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Lock, 
  Users, 
  Palette, 
  Layers, 
  HelpCircle,
  Award,
  Globe
} from 'lucide-react';
import CTABanner from '@/components/CTABanner';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/providers/language-provider';

export default function AboutPage() {
  const { t } = useLanguage();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About PintSave',
    description: 'PintSave is an independent web utility engine designed for extracting original resolution Pinterest photos, HD videos, and animated GIFs.',
    url: 'https://pintsave.app/about',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO HEADER */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider border border-brand-200 dark:border-brand-500/20">
          <Sparkles className="w-3.5 h-3.5" /> {t('bento_tag', 'OUR MISSION & STORY')}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-tight">
          {t('hero_title', 'Empowering Visual Creativity with PintSave')}
        </h1>
        <p className="text-base sm:text-xl text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
          {t('hero_subtitle', 'Built from the ground up to give creators, artists, designers, and visual researchers instant access to uncompressed Pinterest inspiration.')}
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-stone-600 dark:text-stone-300">
          <span className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-full">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t('hero_badge', '100% Free Forever')}
          </span>
          <span className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-full">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t('bento_safe_title', 'No Registration Required')}
          </span>
          <span className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-full">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t('bento_4k_title', 'Original 4K HD & 1080p MP4')}
          </span>
        </div>
      </div>

      {/* 2. ORIGIN STORY */}
      <section className="bg-white dark:bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <div className="space-y-3">
          <Badge variant="brand">{t('bento_tag', 'OUR ORIGIN')}</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-brand-500" />
            {t('nav_about', 'The Story Behind PintSave')}
          </h2>
        </div>
        <div className="prose dark:prose-invert max-w-none text-stone-600 dark:text-stone-300 space-y-4 text-base leading-relaxed">
          <p>
            {t('footer_desc', 'PintSave is indisputably one of the fastest visual media downloader utilities for Pinterest.')}
          </p>
          <p>
            {t('bento_subtitle', 'Designed as a lightweight, high-performance media extraction engine, PintSave enables anyone to paste a public Pinterest link and immediately download original, uncompressed source files in less than one second.')}
          </p>
        </div>
      </section>

      {/* 3. CORE ENGINEERING PRINCIPLES */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="brand">{t('bento_tag', 'OUR PHILOSOPHY')}</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            {t('bento_title', 'Core Engineering Pillars')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card hoverEffect className="p-8 space-y-4 border border-stone-200/80 dark:border-stone-800">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">{t('bento_fast_title', 'Direct CDN Master Extraction')}</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {t('bento_fast_desc', 'Our engine inspects pin metadata to locate the original source URL hosted on Pinterest CDN servers.')}
            </p>
          </Card>

          <Card hoverEffect className="p-8 space-y-4 border border-stone-200/80 dark:border-stone-800">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">{t('bento_safe_title', 'Privacy as a Fundamental Right')}</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {t('bento_safe_desc', 'PintSave requires zero user registration, stores no download logs, and collects no personal browsing history.')}
            </p>
          </Card>
        </div>
      </section>

      {/* 4. CLOSING CTA BANNER */}
      <CTABanner
        title={t('cta_title', 'Ready to Save Pinterest Media in Uncompressed HD?')}
        description={t('cta_subtitle', 'Try PintSave today—fast, 100% free, watermark-free, and no account required.')}
        buttonText={t('cta_btn', 'Try PintSave Downloader Now')}
      />
    </div>
  );
}
