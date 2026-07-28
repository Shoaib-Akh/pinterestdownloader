import Link from 'next/link';
import { Download, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';

interface CTABannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}

export default function CTABanner({
  title = "Ready to Save Your Favorite Pinterest Media in Full HD?",
  description = "Fast, 100% free, uncompressed 4K photo & 1080p MP4 video downloads with zero watermarks or account signups.",
  buttonText = "Try It Now — Download Free",
  href = "#downloader",
}: CTABannerProps) {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="relative rounded-3xl bg-stone-900 dark:bg-stone-900 border border-stone-800 p-8 sm:p-14 overflow-hidden text-center space-y-6 text-white shadow-2xl">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-400 border border-brand-500/30">
            <Sparkles className="w-3.5 h-3.5" /> High Speed HD Extractor
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Free & Fast
          </div>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
          {title}
        </h2>

        <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="pt-2">
          <Link href={href}>
            <Button size="lg" className="px-8 py-4 text-base font-bold flex items-center gap-2 mx-auto shadow-lg hover:scale-105 transition-all">
              <Download className="w-5 h-5" />
              <span>{buttonText}</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
