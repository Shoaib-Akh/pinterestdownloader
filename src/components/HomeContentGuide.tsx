'use client';

import { CheckCircle2, ShieldCheck, Video, Image as ImageIcon, Film, Smartphone, Laptop, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { useLanguage } from '@/providers/language-provider';

export default function HomeContentGuide() {
  const { t } = useLanguage();

  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-stone-900 text-stone-100 p-8 sm:p-12 border border-stone-800 space-y-12 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand" className="bg-brand-500/20 text-brand-400 border-brand-500/30">
            {t('guide_tag', 'COMPREHENSIVE PINTEREST MEDIA GUIDE')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t('guide_title', 'Everything You Need to Know About Downloading Pinterest Content')}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t('guide_subtitle', "Pinterest is one of the world's richest visual discovery platforms. Here is how PintSave solves common downloader challenges.")}
          </p>
        </div>

        {/* 3 Main Media Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 bg-stone-800/60 p-6 rounded-2xl border border-stone-700/60">
            <div className="flex items-center gap-3 text-brand-400 font-bold text-lg">
              <Video className="w-6 h-6 shrink-0" />
              <h3>{t('guide_video_title', 'Pinterest Video Downloader (MP4 Format)')}</h3>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              {t('guide_video_desc', 'PintSave extracts raw 1080p MP4 streams directly from Pinterest video servers with original audio bitrates.')}
            </p>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('guide_video_bullet_1', 'Extracts full-length MP4 video files with stereo audio')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('guide_video_bullet_2', 'Supports video pins, idea reels, and animated story pins')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('guide_video_bullet_3', 'Save directly to iOS Camera Roll or Android Gallery')}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 bg-stone-800/60 p-6 rounded-2xl border border-stone-700/60">
            <div className="flex items-center gap-3 text-brand-400 font-bold text-lg">
              <ImageIcon className="w-6 h-6 shrink-0" />
              <h3>{t('guide_image_title', 'Original 4K Image Resolution Extraction')}</h3>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              {t('guide_image_desc', 'Bypasses compressed web preview thumbnails to deliver uncompressed master resolution files directly to your device.')}
            </p>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('guide_image_bullet_1', 'Bypasses web preview compression down to original source resolution')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('guide_image_bullet_2', 'Extracts high-resolution JPG, PNG, and WebP format files')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('guide_image_bullet_3', 'Perfect for digital moodboards, posters, and graphic design')}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 bg-stone-800/60 p-6 rounded-2xl border border-stone-700/60">
            <div className="flex items-center gap-3 text-brand-400 font-bold text-lg">
              <Film className="w-6 h-6 shrink-0" />
              <h3>Full-Motion Animated GIFs</h3>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              Maintains complete multi-frame animation loops without flattening into static first frames or degraded web preview thumbnails.
            </p>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% animation frame continuity and original loop timing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct import into Figma, PowerPoint, Keynote, and Notion</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ready to share on Discord, Slack, and messaging apps</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Operating System Instructions Breakdown */}
        <div className="border-t border-stone-800 pt-8 space-y-6">
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <Sparkles className="w-5 h-5 text-brand-400" />
            <h3>Platform-Specific Downloading Instructions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-800/40 p-5 rounded-2xl border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-brand-300 font-semibold text-base">
                <Smartphone className="w-5 h-5" />
                <h4>iOS & Android Mobile Workflow</h4>
              </div>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                On mobile, tap the <strong>Share</strong> button on any Pinterest pin and tap <strong>Copy Link</strong>. In Safari or Chrome, navigate to PintSave, paste the link, and tap <strong>Download HD</strong>. On iOS Safari, tap <em>Download</em> in the browser prompt, open Safari Downloads, tap Share, and select <em>Save Video</em> or <em>Save Image</em> to transfer the file straight to your Camera Roll. On Android, files automatically save directly to your Downloads folder and Gallery.
              </p>
            </div>

            <div className="bg-stone-800/40 p-5 rounded-2xl border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-brand-300 font-semibold text-base">
                <Laptop className="w-5 h-5" />
                <h4>macOS & Windows Desktop Workflow</h4>
              </div>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                When using desktop browsers (Chrome, Edge, Firefox, or Safari), copy the pin URL directly from your browser address bar. Paste it into the PintSave input box and click <strong>Download</strong>. Your operating system immediately prompts you to save the file in your preferred downloads directory, fully preserving the original pixel dimensions and bitrates without re-compression.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright & Ethics Notice */}
        <div className="border-t border-stone-800 pt-8 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
            {t('guide_ethics_title', 'Ethical Media Usage & Copyright Etiquette')}
          </h3>
          <p className="text-stone-300 text-sm leading-relaxed max-w-4xl">
            {t('guide_ethics_desc', 'PintSave is created for personal visual inspiration, offline reference, study, and moodboarding. Respect original content authors and creators.')} PintSave does not host or store any media on its servers. Always credit original creators when using media for public creative reference, and never redistribute third-party intellectual property for commercial purposes without explicit authorization from copyright holders.
          </p>
        </div>
      </div>
    </section>
  );
}
