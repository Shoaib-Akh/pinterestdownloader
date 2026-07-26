import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import CTABanner from '@/components/CTABanner';
import { Play, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pinterest Video Downloader — Save Pinterest Videos in 100% HD MP4',
  description:
    'Free online Pinterest Video Downloader. Save high quality 1080p MP4 videos, reels, and story pins directly to iPhone, Android, PC, or Mac without watermark.',
  openGraph: {
    title: 'Pinterest Video Downloader — Fast & Free 1080p MP4 Saver',
    description: 'Download Pinterest video pins instantly in HD MP4 format. 100% free, no registration required.',
    url: 'https://pintsave.app/pinterest-video-downloader',
  },
};

export default function PinterestVideoDownloaderPage() {
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
    description: 'Free online tool to download high bitrate MP4 videos and reels from Pinterest.',
  };

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Identical Hero Section with Video Customization */}
      <HeroSection
        badgeText="Dedicated Video Downloader"
        title={
          <>
            Pinterest <span className="text-brand-500 underline decoration-brand-200 dark:decoration-brand-900">Video Downloader</span>
          </>
        }
        description="Extract high-bitrate MP4 videos, cooking tutorials, DIY clips, and video reels from Pinterest in 720p or 1080p Full HD resolution without watermarks."
        placeholder="Paste Pinterest Video URL (e.g. https://pin.it/...)"
        previewImage="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80"
      />

      {/* Video Guide Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white flex items-center justify-center gap-2">
              <Play className="w-5 h-5 text-brand-500 fill-brand-500" />
              How to Save Pinterest Videos in 3 Easy Steps
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Works on iOS iPhone, iPad, Android smartphones, Windows PC, and Mac browsers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="font-bold text-stone-900 dark:text-white text-base">Copy Video Link</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Open the Pinterest app or website, tap the Share icon on your target video pin, and select <strong>Copy Link</strong>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="font-bold text-stone-900 dark:text-white text-base">Paste into PintSave</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Paste the URL into the input field above and hit the <strong>Download</strong> button to begin processing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="font-bold text-stone-900 dark:text-white text-base">Save MP4 Video</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Choose your preferred video quality and tap <strong>Download MP4 Video</strong> to store it directly on your device gallery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Specific FAQs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 pb-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-500" />
            Pinterest Video Downloader FAQ
          </h2>
          <p className="text-xs text-stone-500">Common questions about video pin extractions.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">What resolution will downloaded videos have?</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              PintSave extracts the highest available H.264 MP4 bitrate video stream directly from Pinterest servers, offering original 720p or 1080p HD quality.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">Can I save Pinterest videos to iPhone Camera Roll?</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Yes! On iOS Safari, tap Download MP4 Video, open your Safari downloads manager, tap Share, and select Save Video to transfer directly to Photos.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">Does PintSave add watermarks to downloaded videos?</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              No. PintSave never alters video streams or embeds watermarks. You receive clean, original MP4 files.
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
