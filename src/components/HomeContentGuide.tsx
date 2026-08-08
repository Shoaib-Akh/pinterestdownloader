'use client';

import { CheckCircle2, ShieldCheck, Video, Image as ImageIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { useLanguage } from '@/providers/language-provider';

export default function HomeContentGuide() {
  const { t } = useLanguage();

  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-stone-900 text-stone-100 p-8 sm:p-12 border border-stone-800 space-y-10 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand" className="bg-brand-500/20 text-brand-400 border-brand-500/30">
            {t('bento_tag', 'COMPREHENSIVE PINTEREST MEDIA GUIDE')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t('how_title', 'Everything You Need to Know About Downloading Pinterest Content')}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t('how_subtitle', 'Pinterest is one of the world\'s richest visual discovery platforms. Here is how PintSave solves common downloader challenges.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 bg-stone-800/60 p-6 rounded-2xl border border-stone-700/60">
            <div className="flex items-center gap-3 text-brand-400 font-bold text-lg">
              <Video className="w-6 h-6 shrink-0" />
              <h3>{t('nav_video', 'Pinterest Video Downloader (MP4 Format)')}</h3>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              {t('step1_desc', 'PintSave extracts raw 1080p MP4 streams directly from Pinterest video servers with original audio bitrates.')}
            </p>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('bento_4k_desc', 'Extracts full-length MP4 video files with stereo audio')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('bento_fast_desc', 'Supports video pins, idea reels, and animated story pins')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('step3_desc', 'Save directly to iOS Camera Roll or Android Gallery')}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 bg-stone-800/60 p-6 rounded-2xl border border-stone-700/60">
            <div className="flex items-center gap-3 text-brand-400 font-bold text-lg">
              <ImageIcon className="w-6 h-6 shrink-0" />
              <h3>{t('nav_image', 'Original 4K Image Resolution Extraction')}</h3>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              {t('bento_4k_desc', 'Bypasses compressed web preview thumbnails to deliver uncompressed master resolution files directly to your device.')}
            </p>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('bento_4k_desc', 'Bypasses web preview compression down to original source resolution')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('bento_no_wm_desc', 'Extracts high-resolution JPG, PNG, and WebP format files')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('bento_safe_desc', 'Perfect for digital moodboards, posters, and graphic design')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
            {t('bento_safe_title', 'Ethical Media Usage & Copyright Etiquette')}
          </h3>
          <p className="text-stone-300 text-sm leading-relaxed max-w-4xl">
            {t('footer_rights', 'PintSave is created for personal visual inspiration, offline reference, study, and moodboarding. Respect original content authors and creators.')}
          </p>
        </div>
      </div>
    </section>
  );
}
