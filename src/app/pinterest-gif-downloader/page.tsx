import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import CTABanner from '@/components/CTABanner';
import { Zap, CheckCircle2, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pinterest GIF Downloader — Save Animated GIFs in High Quality',
  description:
    'Free online Pinterest GIF Downloader. Save animated GIFs and motion pins directly to your phone or desktop in original full-motion quality.',
  openGraph: {
    title: 'Pinterest GIF Downloader — Free Animated GIF Saver',
    description: 'Download animated Pinterest GIFs instantly with 100% full motion frame retention.',
    url: 'https://pintsave.app/pinterest-gif-downloader',
  },
};

export default function PinterestGifDownloaderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PintSave Pinterest GIF Downloader',
    operatingSystem: 'All',
    applicationCategory: 'MultimediaApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free online tool to save animated GIFs and motion pins from Pinterest.',
  };

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection
        badgeText="Dedicated GIF Downloader"
        title={
          <>
            Pinterest <span className="text-brand-500 underline decoration-brand-200 dark:decoration-brand-900">GIF Downloader</span>
          </>
        }
        description="Save animated GIFs, looping motion graphics, and meme pins from Pinterest with full frame rate animation intact."
        placeholder="Paste Pinterest GIF Link (e.g. https://pin.it/...)"
        previewImage="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80"
      />

      {/* Feature Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-brand-500" />
              Full Frame Rate Motion Preservation
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Why pinSsavee is the best choice for saving animated GIFs from Pinterest.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
              <h3 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Motion Retention
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Prevents animated GIFs from being flattened into frozen still images.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
              <h3 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cross-Platform Ready
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Playable across iOS, Android, Discord, WhatsApp, and social networks seamlessly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
              <h3 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Original Quality Stream
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Extracts direct original GIF binaries directly from Pinterest servers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GIF FAQs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 pb-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-500" />
            Pinterest GIF Downloader FAQ
          </h2>
          <p className="text-xs text-stone-500">Common questions about animated GIF downloads.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">Why does saving GIFs directly turn them into static pictures?</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Browsers often save the first keyframe thumbnail of a GIF. pinSsavee extracts the complete animated .gif file.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">Can I convert Pinterest GIF to MP4 video?</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              When Pinterest encodes GIFs into lightweight video streams, pinSsavee gives you the option to save as either MP4 or native GIF.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">Is pinSsavee GIF Downloader free?</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Yes, 100% free with unlimited downloads and no registration required.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <CTABanner />
      </div>
    </div>
  );
}
