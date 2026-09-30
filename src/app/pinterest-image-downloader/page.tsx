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
import AdBanner from '@/components/AdBanner';

export default function PinterestImageDownloaderPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-16">
      {/* INTRODUCTION & EDITORIAL GUIDE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-2 space-y-6">
        <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-4">
          <Badge variant="brand">UNCOMPRESSED DPI EXTRACTION</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
            How to Download Pinterest Images Without Sacrificing Resolution
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Pinterest delivers feed images inside responsive containers capped at 236px, 474px, or 736px display widths to preserve mobile bandwidth and speed up scrolling. Unfortunately, standard browser interactions like &quot;Save Image As&quot; merely download these downscaled thumbnails, producing pixelated results when enlarged for wallpapers, physical prints, or client design moodboards.
          </p>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            PintSave traverses Pinterest&apos;s asset manifest to locate the original master upload URL stored on the underlying Akamai and Cloudflare CDNs. By bypassing web display downsampling, you can retrieve the full 2K, 4K, and ultra-high-resolution original photography directly in JPG, PNG, or WebP format with 100% original color accuracy and zero added watermarks.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60">
              <h4 className="font-bold text-stone-900 dark:text-white text-sm">Master File Quality</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Retrieves the pristine high-resolution source file without aggressive browser re-compression.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60">
              <h4 className="font-bold text-stone-900 dark:text-white text-sm">Design & Print Ready</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Ideal for graphic designers, moodboard curation, desktop wallpapers, and physical printing.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60">
              <h4 className="font-bold text-stone-900 dark:text-white text-sm">Zero Data Retention</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Files are delivered directly through encrypted HTTPS streams without storing copies on our servers.</p>
            </div>
          </div>
        </div>
      </section>
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AdBanner />
      </div>

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
