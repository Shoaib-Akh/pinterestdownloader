'use client';

import HeroSection from '@/components/HeroSection';
import CTABanner from '@/components/CTABanner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Copy, 
  Sparkles, 
  Download, 
  FileImage
} from 'lucide-react';
import { useLanguage } from '@/providers/language-provider';

export default function PinterestGifDownloaderPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-16">
      {/* 1. HERO SECTION */}
      <HeroSection
        badgeText={t('hero_badge', '100% Free · Animated GIFs · Original Quality')}
        title={
          <>
            {t('hero_title', 'Download Animated Pinterest GIFs in High Quality')}
          </>
        }
        description={t('hero_subtitle', 'Save smooth animated GIFs and short motion clips directly from Pinterest to your device.')}
        placeholder={t('paste_placeholder', 'Paste Pinterest GIF link here...')}
        previewImage="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80"
      />

      {/* 2. HOW IT WORKS SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand">{t('how_tag', 'SIMPLE 3-STEP GUIDE')}</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            {t('how_title', 'How to Download Pinterest GIFs')}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            {t('how_subtitle', 'Save animated GIFs in full frame rate in three quick steps.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hoverEffect className="p-8 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                  <Copy className="w-6 h-6" />
                </div>
                <span className="font-mono text-3xl font-extrabold text-stone-200 dark:text-stone-800">
                  01
                </span>
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{t('step1_title', 'Copy GIF Pin Link')}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('step1_desc', 'Open Pinterest app or browser and copy the link of the animated GIF pin.')}
              </p>
            </div>
          </Card>

          <Card hoverEffect className="p-8 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="font-mono text-3xl font-extrabold text-stone-200 dark:text-stone-800">
                  02
                </span>
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{t('step2_title', 'Paste URL into PintSave')}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('step2_desc', 'Paste your copied GIF link into the search input above.')}
              </p>
            </div>
          </Card>

          <Card hoverEffect className="p-8 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                  <Download className="w-6 h-6" />
                </div>
                <span className="font-mono text-3xl font-extrabold text-stone-200 dark:text-stone-800">
                  03
                </span>
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{t('step3_title', 'Save GIF File')}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('step3_desc', 'Click Download HD to save the animated GIF directly to your device gallery.')}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. CLOSING CTA SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <CTABanner
          title={t('cta_title', 'Ready to Save Animated Pinterest GIFs?')}
          description={t('cta_subtitle', 'Fast, 100% free GIF downloads with zero watermarks or account signups.')}
          buttonText={t('cta_btn', 'Try It Now — Download GIF Free')}
        />
      </div>
    </div>
  );
}
