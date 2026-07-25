import Link from 'next/link';
import { Download, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export default function CTABanner() {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="relative rounded-3xl bg-stone-900 dark:bg-stone-900 border border-stone-800 p-8 sm:p-14 overflow-hidden text-center space-y-6 text-white shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-400 border border-brand-500/30">
          <Sparkles className="w-3.5 h-3.5" /> High Speed HD Extractor
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
          Ready to save your favorite Pinterest media?
        </h2>

        <p className="text-stone-400 text-sm sm:text-base max-w-xl mx-auto">
          Start downloading uncompressed 4K photos, 1080p MP4 videos, and GIFs instantly.
        </p>

        <div className="pt-2">
          <Link href="#downloader">
            <Button size="lg" className="px-8 py-4 text-base">
              <Download className="w-5 h-5" />
              <span>Start Downloading Now</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
