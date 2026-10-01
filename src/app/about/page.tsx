import type { Metadata } from 'next';
import Link from 'next/link';
import CTABanner from '@/components/CTABanner';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  ShieldCheck, 
  Server, 
  Users, 
  Heart, 
  Mail, 
  CheckCircle2, 
  FileCheck, 
  EyeOff, 
  Zap,
  Globe
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About PintSave — High-Performance Pinterest Media Extraction',
  description:
    'Learn about PintSave, our mission to make Pinterest media preservation accessible, our zero-storage privacy model, and how our distributed edge architecture works.',
  alternates: {
    canonical: 'https://pintsave.site/about',
  },
  openGraph: {
    title: 'About PintSave — High-Performance Pinterest Media Extraction',
    description:
      'Learn about PintSave, our mission to make Pinterest media preservation accessible, our zero-storage privacy model, and how our distributed edge architecture works.',
    url: 'https://pintsave.site/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
      {/* 1. HERO SECTION */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="brand">ABOUT PINTSAVE</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-tight">
          Empowering Visual Creativity with Fast, Clean Media Tools
        </h1>
        <p className="text-base sm:text-xl text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
          PintSave was engineered to provide visual designers, students, researchers, and creators with an honest, privacy-conscious tool to save uncompressed Pinterest photos, 1080p HD videos, and animated GIFs without watermarks or forced signups.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-stone-600 dark:text-stone-300 pt-2">
          <span className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-stone-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 100% Free Forever
          </span>
          <span className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-stone-700">
            <EyeOff className="w-3.5 h-3.5 text-brand-500" /> No Account or Login Required
          </span>
          <span className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-stone-700">
            <Zap className="w-3.5 h-3.5 text-amber-500" /> Original Quality Master Files
          </span>
        </div>
      </section>

      {/* 2. OUR PURPOSE & WHAT WE DO */}
      <section className="bg-white dark:bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
            What PintSave Does
          </h2>
          <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm sm:text-base">
            Pinterest is one of the world&apos;s most expansive platforms for visual discovery, curation, and inspiration. Every day, millions of users curate design boards, interior decor concepts, culinary recipes, and motion graphics. However, extracting this media for offline educational reference, client moodboards, or printing is often hampered by web browser thumbnail downsampling and mobile app limitations.
          </p>
          <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm sm:text-base">
            PintSave serves as a lightweight, browser-based media utility. When you submit a public Pinterest URL, our system resolves the direct asset endpoint located on Pinterest&apos;s Content Delivery Network (Akamai and Cloudflare). It presents the pristine master file—progressive 1080p MP4 with stereo audio, uncompressed 4K photography, or multi-frame animated GIFs—directly to your browser for fast, local saving.
          </p>
        </div>

        {/* What PintSave Does NOT Do (Transparency) */}
        <div className="border-t border-stone-200 dark:border-stone-800 pt-8 space-y-4">
          <h3 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-500" />
            What PintSave Does NOT Do (Our Strict Privacy Commitment)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
              <h4 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero Media Hosting or Storage
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                PintSave does not host, cache, or permanently store any user videos, images, or GIFs on our servers. All downloads are real-time, encrypted pass-through streams between official CDN endpoints and your device.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
              <h4 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Personal Data Collection
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                We never require registration, email addresses, passwords, or social profile logins. We do not track individual user download histories or compile personal behavioral dossiers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
              <h4 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Artificial Paywalls or Speed Caps
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                PintSave is completely free. We never throttle download speeds, cap daily extraction quotas, or demand subscription upgrades to download high-resolution files.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
              <h4 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Watermark-Free
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                We respect the visual integrity of creators&apos; artwork. PintSave never adds logos, brand overlays, or intro slides over your downloaded content.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="border-t border-stone-200 dark:border-stone-800 pt-8 space-y-4">
          <h3 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-brand-500" />
            Distributed Edge Architecture
          </h3>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            PintSave is deployed across globally distributed serverless edge nodes. When you submit a request, edge workers communicate with public media servers nearest to your location, extracting metadata manifests in under 500 milliseconds. This ensures high reliability, instant response times, and resilience against network congestion.
          </p>
        </div>

        {/* Ethical Use & DMCA Compliance */}
        <div className="border-t border-stone-200 dark:border-stone-800 pt-8 space-y-4">
          <h3 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-brand-500" />
            Ethical Media Usage & Copyright Compliance
          </h3>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            PintSave is built for legitimate personal Fair Use—including private study, offline inspiration, archival research, and creative moodboarding. We urge all users to honor the intellectual property rights of original photographers, video creators, and artists.
          </p>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Content creators who wish to request URL exclusion from our extraction tools can submit a formal notice via our <Link href="/dmca" className="text-brand-500 underline font-semibold hover:text-brand-600">DMCA Copyright Policy</Link>. We expeditiously honor all valid takedown requests.
          </p>
        </div>

        {/* Contact & Support Section */}
        <div className="border-t border-stone-200 dark:border-stone-800 pt-8 space-y-4">
          <h3 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-brand-500" />
            Contact & Support Channels
          </h3>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            We are committed to maintaining a reliable, clean, and helpful utility. If you experience an issue downloading a specific pin, wish to report a bug, or have a suggestion, our support team is readily reachable:
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Link 
              href="/contacts-us"
              className="inline-flex items-center gap-2 font-semibold text-sm bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-xl transition shadow-sm"
            >
              <Mail className="w-4 h-4" /> Open Contact Form
            </Link>
            <a 
              href="mailto:support@pintsave.site" 
              className="inline-flex items-center gap-2 font-mono text-sm text-stone-700 dark:text-stone-300 hover:text-brand-500 bg-stone-100 dark:bg-stone-800 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 transition"
            >
              support@pintsave.site
            </a>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Support tickets and email inquiries are answered promptly within 24 hours, Monday through Sunday.
          </p>
        </div>
      </section>

      {/* 3. CLOSING CTA BANNER */}
      <CTABanner
        title="Ready to Save Pinterest Media in Uncompressed HD?"
        description="Try PintSave today—fast, 100% free, watermark-free, and with zero registration required."
        buttonText="Try PintSave Downloader Now"
        href="/"
      />
    </div>
  );
}
