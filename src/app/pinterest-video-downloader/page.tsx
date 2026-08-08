'use client';

import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import CTABanner from '@/components/CTABanner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Copy, 
  Sparkles, 
  Download, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  Infinity, 
  FileVideo, 
  HelpCircle,
  Monitor,
  Video,
  Clapperboard,
  HeartHandshake
} from 'lucide-react';
import { useLanguage } from '@/providers/language-provider';

export default function PinterestVideoDownloaderPage() {
  const { t } = useLanguage();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PintSave Pinterest Video Downloader',
    operatingSystem: 'All',
    applicationCategory: 'MultimediaApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free online tool to download high bitrate MP4 videos and reels from Pinterest without watermarks.',
  };

  return (
    <div className="space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <HeroSection
        badgeText={t('hero_badge', '100% Free · No Watermark · 1080p MP4')}
        title={
          <>
            {t('hero_title', 'Download Pinterest Videos in HD — Fast & Free')}
          </>
        }
        description={t('hero_subtitle', 'Extract high-bitrate MP4 videos, recipe clips, fashion reels, and DIY tutorials from Pinterest directly to your device.')}
        placeholder={t('paste_placeholder', 'Paste Pinterest video link here...')}
        previewImage="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80"
      />

      {/* 2. HOW IT WORKS SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand">{t('how_tag', 'SIMPLE 3-STEP GUIDE')}</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            {t('how_title', 'How to Download Pinterest Videos')}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            {t('how_subtitle', 'Save any public video pin or reel in three quick steps without installing extra apps or extensions.')}
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
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{t('step1_title', 'Copy Video Pin Link')}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('step1_desc', 'Open the Pinterest app on your smartphone or browse pinterest.com on desktop and copy link.')}
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
                {t('step2_desc', 'Paste your copied video URL into the input field at the top of this page.')}
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
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{t('step3_title', 'Save HD MP4 File')}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('step3_desc', 'Click Download HD to store the original high-bitrate MP4 video directly onto your device.')}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. KEY FEATURES SECTION */}
      <section className="py-16 bg-stone-50/50 dark:bg-stone-900/30 border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="brand">{t('bento_tag', 'WHY CHOOSE OUR TOOL')}</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              {t('bento_title', 'Powerful Features for Pinterest Video Downloading')}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
              {t('bento_subtitle', 'Designed specifically to overcome playback buffering and low-quality downloads.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <FileVideo className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{t('bento_4k_title', 'Original 1080p HD MP4')}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('bento_4k_desc', 'We extract the master high-bitrate MP4 video stream uploaded by the creator with stereo audio.')}
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{t('bento_no_wm_title', '100% Watermark-Free')}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('bento_no_wm_desc', 'PintSave never places logos or watermarks over your saved videos.')}
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{t('bento_fast_title', 'Sub-Second Speed')}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('bento_fast_desc', 'Our extraction engine queries direct CDN endpoints in under 1 second.')}
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{t('bento_safe_title', 'Universal Mobile & Desktop')}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('bento_safe_desc', 'Works seamlessly on iPhone, Android, Mac, and Windows browsers.')}
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{t('bento_safe_title', 'No Account Required')}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('bento_safe_desc', 'No registration, email, or login required. Completely anonymous.')}
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <Infinity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">{t('bento_no_wm_title', 'Unlimited Free Downloads')}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('bento_no_wm_desc', 'Save as many pins and video reels as your creative projects require.')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. CLOSING CTA SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <CTABanner
          title={t('cta_title', 'Ready to Download Pinterest Videos in Full HD?')}
          description={t('cta_subtitle', 'Fast, 100% free, 1080p MP4 video downloads with zero watermarks or account signups.')}
          buttonText={t('cta_btn', 'Try It Now — Download HD Video Free')}
        />
      </div>
    </div>
  );
}
