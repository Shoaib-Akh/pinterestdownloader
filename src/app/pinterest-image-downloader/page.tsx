'use client';

import HeroSection from '@/components/HeroSection';
import CTABanner from '@/components/CTABanner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Copy, 
  Sparkles, 
  Download, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  Infinity, 
  Image as ImageIcon,
  HeartHandshake
} from 'lucide-react';
import { useLanguage } from '@/providers/language-provider';

export default function PinterestImageDownloaderPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-16">
      {/* 1. HERO SECTION */}
      <HeroSection
        badgeText={t('hero_badge', '100% Free · No Watermark · Original 4K')}
        title={
          <>
            {t('hero_title', 'Download Pinterest Images in Original 4K Resolution')}
          </>
        }
        description={t('hero_subtitle', 'Bypass thumbnail compression and download high-resolution master photos directly from Pinterest.')}
        placeholder={t('paste_placeholder', 'Paste Pinterest image link here...')}
        previewImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
      />

      {/* 2. HOW IT WORKS SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand">{t('how_tag', 'SIMPLE 3-STEP GUIDE')}</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            {t('how_title', 'How to Save Pinterest Images')}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            {t('how_subtitle', 'Save uncompressed photos in original DPI in three quick steps.')}
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
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{t('step1_title', 'Copy Image Pin Link')}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('step1_desc', 'Open Pinterest app or web browser and copy the link of the photo pin you want.')}
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
                {t('step2_desc', 'Paste your copied image link into the input field above.')}
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
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{t('step3_title', 'Save 4K Image')}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('step3_desc', 'Click Download HD to save the original high resolution file directly to your device.')}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. CLOSING CTA SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <CTABanner
          title={t('cta_title', 'Ready to Save Pinterest Photos in Original 4K?')}
          description={t('cta_subtitle', 'Fast, 100% free, uncompressed photo downloads with zero watermarks or account signups.')}
          buttonText={t('cta_btn', 'Try It Now — Download Image Free')}
        />
      </div>
    </div>
  );
}
