import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Zap, 
  Heart, 
  Mail, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  Compass, 
  Lock, 
  Users, 
  Palette, 
  Layers, 
  HelpCircle,
  Award,
  Globe
} from 'lucide-react';
import CTABanner from '@/components/CTABanner';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About PintSave — High-Speed Pinterest Media Extraction Engine',
  description:
    'Discover the story behind PintSave, a free, privacy-first Pinterest downloader engine built to help creators, designers, and curators save original 4K photos and 1080p MP4 videos.',
  openGraph: {
    title: 'About PintSave — High-Speed Pinterest Media Extraction Engine',
    description:
      'Learn about PintSave, the fast, privacy-focused tool built to save uncompressed Pinterest images, MP4 videos, and animated GIFs.',
    url: 'https://pintsave.app/about',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About PintSave',
    description: 'PintSave is an independent web utility engine designed for extracting original resolution Pinterest photos, HD videos, and animated GIFs.',
    url: 'https://pintsave.app/about',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO HEADER */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider border border-brand-200 dark:border-brand-500/20">
          <Sparkles className="w-3.5 h-3.5" /> OUR MISSION & STORY
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-tight">
          Empowering Visual Creativity with <span className="text-brand-500">PintSave</span>
        </h1>
        <p className="text-base sm:text-xl text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
          Built from the ground up to give creators, artists, designers, and visual researchers instant access to uncompressed Pinterest inspiration—free from limits, ads, and login paywalls.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-stone-600 dark:text-stone-300">
          <span className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-full">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Free Forever
          </span>
          <span className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-full">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Registration Required
          </span>
          <span className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-full">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Original 4K HD & 1080p MP4
          </span>
        </div>
      </div>

      {/* 2. ORIGIN STORY */}
      <section className="bg-white dark:bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <div className="space-y-3">
          <Badge variant="brand">OUR ORIGIN</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-brand-500" />
            The Story Behind PintSave
          </h2>
        </div>
        <div className="prose dark:prose-invert max-w-none text-stone-600 dark:text-stone-300 space-y-4 text-base leading-relaxed">
          <p>
            Pinterest is indisputably one of the world's most vibrant visual search engines. Millions of artists, interior designers, architects, photographers, and home cooks turn to Pinterest every single day to discover moodboard concepts, recipe clips, fashion lookbooks, and DIY project guides.
          </p>
          <p>
            However, when creators attempted to save media files for offline study, client pitch decks, or personal reference archives, they ran into constant frustrating technical barriers. Standard web browsers only save downscaled 736px thumbnail images, while video pins lack a native "Save Video to Phone" button. Existing online downloaders were frequently clunky, loaded with intrusive popups, or forced users to create accounts and hand over personal email addresses.
          </p>
          <p>
            We built <strong>PintSave</strong> to solve these issues once and for all. Designed as a lightweight, high-performance media extraction engine, PintSave enables anyone to paste a public Pinterest link and immediately download original, uncompressed source files—in full 4K photo resolution or crisp 1080p MP4 video quality—in less than one second.
          </p>
        </div>
      </section>

      {/* 3. CORE ENGINEERING PRINCIPLES */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="brand">OUR PHILOSOPHY</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Core Engineering <span className="text-brand-500">Pillars</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            The technical values that guide every line of code we write.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card hoverEffect className="p-8 space-y-4 border border-stone-200/80 dark:border-stone-800">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">Direct CDN Master Extraction</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              PintSave does not re-compress files or apply extra encoding layers. Our engine inspects pin metadata to locate the original source URL hosted on Pinterest's Content Delivery Network, delivering original pixel-for-pixel files directly to your browser.
            </p>
          </Card>

          <Card hoverEffect className="p-8 space-y-4 border border-stone-200/80 dark:border-stone-800">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">Privacy as a Fundamental Right</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              We believe downloading public inspiration should not cost your privacy. PintSave requires zero user registration, stores no download logs, and collects no personal browsing history. Your creative research remains completely anonymous.
            </p>
          </Card>

          <Card hoverEffect className="p-8 space-y-4 border border-stone-200/80 dark:border-stone-800">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">Clean & Watermark-Free Downloads</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              We respect visual artwork and videography. PintSave never overlays logos, site watermarks, or quality-reducing brand stamps across your saved media files. You receive pure, clean original master files.
            </p>
          </Card>

          <Card hoverEffect className="p-8 space-y-4 border border-stone-200/80 dark:border-stone-800">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">Sub-Second Processing Speeds</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              We optimized our server backend to parse media links in under 1 second. Built on modern cloud infrastructure, PintSave eliminates waiting queues, slow conversion screens, and mandatory timer delays.
            </p>
          </Card>
        </div>
      </section>

      {/* 4. WHO USES PINTSAVE */}
      <section className="bg-white dark:bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <Badge variant="brand">OUR USER BASE</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
            Who Uses PintSave Daily?
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            PintSave serves thousands of visual professionals and everyday creators globally.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
            <div className="text-brand-500 font-bold text-lg flex items-center gap-2">
              <Palette className="w-5 h-5" /> Designers
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Sourcing high-resolution typography samples, color palettes, and texture references for Figma & Photoshop.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
            <div className="text-brand-500 font-bold text-lg flex items-center gap-2">
              <Layers className="w-5 h-5" /> Architects
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Extracting 300+ DPI photography for client pitch decks, interior moodboards, and physical prints.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
            <div className="text-brand-500 font-bold text-lg flex items-center gap-2">
              <Users className="w-5 h-5" /> Marketers
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Archiving video reel hooks, motion graphics tutorials, and visual campaign trends for strategy briefs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
            <div className="text-brand-500 font-bold text-lg flex items-center gap-2">
              <Globe className="w-5 h-5" /> Hobbyists
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Saving cooking recipes, fitness routines, and DIY woodworking clips to watch offline without Wi-Fi.
            </p>
          </div>
        </div>
      </section>

      {/* 5. COMMITMENT TO COPYRIGHT & DISCLAIMER */}
      <section className="rounded-3xl bg-stone-900 text-stone-100 p-8 sm:p-12 border border-stone-800 space-y-6 shadow-xl">
        <div className="space-y-3">
          <Badge variant="brand" className="bg-brand-500/20 text-brand-400 border-brand-500/30">
            CREATOR ETHICS & COMPLIANCE
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <Heart className="w-6 h-6 text-brand-400" />
            Copyright Respect & Legal Disclaimer
          </h2>
        </div>

        <div className="text-stone-300 text-sm leading-relaxed space-y-4">
          <p>
            PintSave is created strictly for personal reference, study, moodboarding, and offline backup storage under Fair Use guidelines. We deeply respect intellectual property rights and encourage all users to credit original creators, artists, and photographers whenever referencing saved visual media publicly.
          </p>
          <p className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/60 text-xs text-stone-300">
            <strong>Official Disclaimer:</strong> PintSave is an independent web utility software tool. PintSave is <strong>not affiliated with, associated with, authorized, endorsed by, or in any way officially connected to Pinterest, Inc.</strong> or any of its subsidiaries or affiliates. The official Pinterest website can be found at <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" className="text-brand-400 underline">https://www.pinterest.com</a>. All product names, logos, brands, and trademarks are property of their respective owners.
          </p>
        </div>
      </section>

      {/* 6. TEAM CONTACT & FAQ */}
      <section className="bg-white dark:bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-6">
          <div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">Have Feedback or Feature Suggestions?</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">Our engineering team reads every user inquiry.</p>
          </div>
          <Link
            href="/contacts-us"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-colors shadow-md shadow-brand-500/20 shrink-0"
          >
            <Mail className="w-4 h-4" /> Contact Support Team
          </Link>
        </div>

        <div className="space-y-4 pt-2">
          <h4 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-brand-500" /> Frequently Asked Questions
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-xs text-stone-600 dark:text-stone-400">
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-1">
              <strong className="text-stone-900 dark:text-stone-200">Is PintSave completely free?</strong>
              <p>Yes. PintSave is 100% free with unlimited downloads and no registration fees.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 space-y-1">
              <strong className="text-stone-900 dark:text-stone-200">Do you log my search history?</strong>
              <p>No. We process downloads on-the-fly without saving personal query logs or user IP tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLOSING CTA BANNER */}
      <CTABanner
        title="Ready to Save Pinterest Media in Uncompressed HD?"
        description="Try PintSave today—fast, 100% free, watermark-free, and no account required."
        buttonText="Try PintSave Downloader Now"
      />
    </div>
  );
}
