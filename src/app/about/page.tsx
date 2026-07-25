import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Zap, Heart, Mail, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import CTABanner from '@/components/CTABanner';

export const metadata: Metadata = {
  title: 'About PinFlow — Free HD Pinterest Downloader Engine',
  description:
    'Learn about PinFlow, the web application created to help content creators, designers, and visual artists save original resolution Pinterest media safely and fast.',
  openGraph: {
    title: 'About PinFlow — Free HD Pinterest Downloader Engine',
    description:
      'Learn about PinFlow, the fast, privacy-focused tool built to save uncompressed Pinterest images, MP4 videos, and animated GIFs.',
    url: 'https://pinflow.app/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full space-y-12">
      {/* Header Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider border border-brand-200 dark:border-brand-500/20">
          <Sparkles className="w-3.5 h-3.5" /> Our Mission & Vision
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Empowering Visual Creativity with <span className="text-brand-500">PinFlow</span>
        </h1>
        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
          PinFlow was engineered from the ground up to give creators, artists, and designers instant access to high-definition Pinterest inspiration without barriers.
        </p>
      </div>

      {/* Content Section */}
      <div className="space-y-8 bg-white dark:bg-stone-900 p-6 sm:p-10 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
        {/* What is PinFlow */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-500" />
            What is PinFlow?
          </h2>
          <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
            PinFlow is a specialized online media extraction engine built for downloading videos, full 4K images, story pins, and animated GIFs from Pinterest. Whether you are building a physical moodboard for your home renovation, sourcing design references for graphic projects, or archiving tutorial videos for offline viewing, PinFlow ensures you get direct access to original master files.
          </p>
          <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
            Unlike traditional save methods that compress photos into low-resolution browser thumbnails, PinFlow bypasses web client thumbnail limits to fetch 100% uncompressed \`/originals/\` media directly from CDN servers.
          </p>
        </section>

        <hr className="border-stone-100 dark:border-stone-800" />

        {/* How It Works */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-brand-500" />
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
              <div className="text-brand-500 font-bold text-lg mb-1">01. Paste</div>
              <p className="text-xs text-stone-600 dark:text-stone-400">Copy any public pin link from the Pinterest app or website.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
              <div className="text-brand-500 font-bold text-lg mb-1">02. Process</div>
              <p className="text-xs text-stone-600 dark:text-stone-400">Our parser locates the original uncompressed source stream.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
              <div className="text-brand-500 font-bold text-lg mb-1">03. Save</div>
              <p className="text-xs text-stone-600 dark:text-stone-400">Download high-bitrate MP4 or 4K JPG directly to your device.</p>
            </div>
          </div>
        </section>

        <hr className="border-stone-100 dark:border-stone-800" />

        {/* Core Values */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-500" />
            Why PinFlow?
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-stone-600 dark:text-stone-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 dark:text-white">100% Free Forever:</strong> No subscription plans, paywalls, or hidden tier limits.
              </div>
            </li>
            <li className="flex items-start gap-3 text-sm text-stone-600 dark:text-stone-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 dark:text-white">Zero Account Requirement:</strong> Download anonymously without signing up or exposing personal email credentials.
              </div>
            </li>
            <li className="flex items-start gap-3 text-sm text-stone-600 dark:text-stone-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 dark:text-white">Privacy Focused:</strong> We do not log downloaded media contents or track personal search queries.
              </div>
            </li>
          </ul>
        </section>

        <hr className="border-stone-100 dark:border-stone-800" />

        {/* Disclaimer & Contact */}
        <section className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs leading-relaxed space-y-2">
          <h3 className="font-bold flex items-center gap-1.5 text-sm text-amber-800 dark:text-amber-300">
            <Heart className="w-4 h-4" /> Disclaimer
          </h3>
          <p>
            PinFlow is an independent utility tool. PinFlow is <strong>not affiliated with, associated with, endorsed by, or in any way officially connected to Pinterest, Inc.</strong> or any of its subsidiaries. All Pinterest trademarks, names, and logos belong to their respective owners.
          </p>
        </section>

        <div className="pt-4 flex items-center justify-between">
          <span className="text-xs text-stone-500">Have feedback or suggestions?</span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 text-white font-semibold text-xs hover:bg-brand-600 transition-colors shadow-md shadow-brand-500/20"
          >
            <Mail className="w-4 h-4" /> Contact Support Team
          </Link>
        </div>
      </div>

      <CTABanner />
    </div>
  );
}
