import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import CTABanner from '@/components/CTABanner';
import { Sparkles, CheckCircle2, HelpCircle, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pinterest Image Downloader — Save Original 4K HD Photos Free',
  description:
    'Free Pinterest Image Downloader tool. Save 4K, uncompressed, original resolution Pinterest photos, infographics, wallpaper, and board art instantly.',
  openGraph: {
    title: 'Pinterest Image Downloader — Original HD Photo Saver',
    description: 'Download uncompressed original Pinterest images in 4K resolution directly to your device.',
    url: 'https://pinflow.app/pinterest-image-downloader',
  },
};

export default function PinterestImageDownloaderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PinFlow Pinterest Image Downloader',
    operatingSystem: 'All',
    applicationCategory: 'MultimediaApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free online tool to download uncompressed 4K images and photos from Pinterest.',
  };

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection
        badgeText="Dedicated Image Downloader"
        title={
          <>
            Pinterest <span className="text-brand-500 underline decoration-brand-200 dark:decoration-brand-900">Image Downloader</span>
          </>
        }
        description="Download full resolution 4K photos, aesthetic wallpapers, design illustrations, and moodboard artwork directly from Pinterest without browser thumbnail compression."
        placeholder="Paste Pinterest Photo Link (e.g. https://pin.it/...)"
        previewImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
      />

      {/* Resolution Comparison Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white flex items-center justify-center gap-2">
              <Layers className="w-5 h-5 text-brand-500" />
              Why Standard Right-Clicking Reduces Image Quality
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              How PinFlow bypasses compressed client thumbnails to unlock master 4K source files.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-3">
              <h3 className="font-bold text-stone-900 dark:text-white text-base text-rose-500">
                Standard Right-Click Save
              </h3>
              <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-2">
                <li>• Saves 236px or 736px compressed preview thumbnails</li>
                <li>• Blurry pixelation when used on 4K displays or prints</li>
                <li>• Loss of metadata and color gamut fidelity</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-brand-50/50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 space-y-3">
              <h3 className="font-bold text-stone-900 dark:text-white text-base text-brand-500 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> PinFlow HD Extractor
              </h3>
              <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Resolves 100% uncompressed /originals/ source photo file
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Full 4K / 8K resolution intact for wallpapers & design
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Instant single-click JPG/PNG download
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Image FAQs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 pb-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-500" />
            Pinterest Image Downloader FAQ
          </h2>
          <p className="text-xs text-stone-500">Common questions about photo downloads.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">Can I download multiple images from a Carousel Pin?</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Yes! When you input a Carousel or multi-image pin URL, PinFlow extracts all individual high-resolution slides so you can download them separately.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">What image format will my photo download in?</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Images are saved in their original native uploaded format, typically uncompressed JPG, PNG, or WebP.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">Is there a limit on how many photos I can download?</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              No. PinFlow provides unlimited free photo downloads without rate caps or daily limits.
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
