'use client';

import { Zap, ShieldCheck, Smartphone, Sparkles } from 'lucide-react';
import { BentoGrid, BentoCard } from './ui/bento-grid';
import { Badge } from './ui/badge';
import { useLanguage } from '@/providers/language-provider';

export default function FeaturesBento() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-20 bg-stone-50/50 dark:bg-stone-900/30 border-y border-stone-200/80 dark:border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="brand">{t('bento_tag', 'KEY FEATURES & ADVANTAGES')}</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            {t('bento_title', 'Why Choose Our Pinterest Downloader')}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            {t('bento_subtitle', 'Built specifically to solve low-resolution downloads and slow speeds.')}
          </p>
        </div>

        <BentoGrid>
          {/* Card 1: Large 2-column card */}
          <BentoCard colSpan={2} rowSpan={1}>
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <Badge variant="success">INSTANT EXTRACTION</Badge>
            </div>
            <div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-white mb-2">
                {t('bento_fast_title', 'Sub-Second Direct Media Extraction')}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 max-w-lg leading-relaxed">
                {t('bento_fast_desc', 'Instant direct URL extraction powered by high-speed engines.')}
              </p>
            </div>
          </BentoCard>

          {/* Card 2: 1-column card */}
          <BentoCard colSpan={1} rowSpan={1}>
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-2">
                {t('bento_safe_title', '100% Safe & Secure')}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('bento_safe_desc', 'No registration, login, or personal data tracking required.')}
              </p>
            </div>
          </BentoCard>

          {/* Card 3: 1-column card */}
          <BentoCard colSpan={1} rowSpan={1}>
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-2">
                {t('bento_4k_title', 'Uncompressed 4K Quality')}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {t('bento_4k_desc', 'Save photos and videos in full original resolution without loss.')}
              </p>
            </div>
          </BentoCard>

          {/* Card 4: 2-column wide card */}
          <BentoCard colSpan={2} rowSpan={1}>
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <Badge variant="mono">100% PRIVATE</Badge>
            </div>
            <div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-white mb-2">
                {t('bento_no_wm_title', 'No Watermarks')}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 max-w-lg leading-relaxed">
                {t('bento_no_wm_desc', 'Get clean downloads without added branding or watermarks.')}
              </p>
            </div>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  );
}
