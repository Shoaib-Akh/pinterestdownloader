import { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import CTABanner from '@/components/CTABanner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Copy, 
  Sparkles, 
  Download, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  Infinity, 
  Film, 
  CheckCircle2, 
  HelpCircle,
  Monitor,
  Layers,
  Flame,
  MessageSquare,
  Smile,
  HeartHandshake
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Download Pinterest GIFs in HD — Fast & Free GIF Downloader | PintSave',
  description:
    'Free online Pinterest GIF Downloader. Save animated GIFs, motion graphics, and looping pins directly to iPhone, Android, PC, or Mac with full frame rate animation intact.',
  openGraph: {
    title: 'Download Pinterest GIFs in HD — Fast & Free GIF Downloader',
    description: 'Download animated Pinterest GIFs instantly with 100% motion frame rate retention. 100% free, watermark-free, no registration required.',
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
    description: 'Free online tool to download animated GIFs and looping motion pins from Pinterest without watermarks.',
  };

  return (
    <div className="space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <HeroSection
        badgeText="100% Free · No Watermark · Full Motion Retention"
        title={
          <>
            Download <span className="text-brand-500 underline decoration-brand-200 dark:decoration-brand-900">Pinterest GIFs</span> in HD — Fast & Free
          </>
        }
        description="Save animated GIFs, looping motion graphics, meme pins, and reaction clips from Pinterest with 100% full frame rate animation intact. No watermarks, no frozen still frames, and no login required."
        placeholder="Paste Pinterest GIF link here (e.g. https://pin.it/... or pinterest.com/pin/...)"
        previewImage="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80"
      />

      {/* 2. HOW IT WORKS SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand">SIMPLE 3-STEP GUIDE</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            How to Download <span className="text-brand-500">Pinterest Animated GIFs</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            Extract smooth looping GIFs in three simple steps without freezing the animation into static images.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hoverEffect className="p-8 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                  <Copy className="w-6 h-6" />
                </div>
                <span className="font-mono text-3xl font-extrabold text-stone-200 dark:text-stone-800">
                  01
                </span>
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Copy GIF Pin Link</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Open the Pinterest app on your smartphone or visit pinterest.com in your web browser. Find the animated GIF, looping graphics clip, or reaction pin you wish to save. Tap <strong>Share</strong> and select <strong>Copy Link</strong>.
              </p>
            </div>
          </Card>

          <Card hoverEffect className="p-8 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="font-mono text-3xl font-extrabold text-stone-200 dark:text-stone-800">
                  02
                </span>
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Paste URL into PintSave</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Paste your copied link into the search box above. PintSave's extraction engine inspects the pin binary, retrieves the original full-motion `.gif` asset, and prevents keyframe flattening.
              </p>
            </div>
          </Card>

          <Card hoverEffect className="p-8 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                  <Download className="w-6 h-6" />
                </div>
                <span className="font-mono text-3xl font-extrabold text-stone-200 dark:text-stone-800">
                  03
                </span>
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Save Animated GIF File</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Click <strong>Download HD</strong> to save the animated `.gif` file (or MP4 video alternative) straight to your iPhone Camera Roll, Android Gallery, or computer downloads directory.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* FRAME RETENTION COMPARISON SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="brand">FRAME RATE PRESERVATION</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white flex items-center justify-center gap-2">
              <Layers className="w-6 h-6 text-brand-500" />
              Why Saving GIFs Directly Freezes Animation
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              When right-clicking or long-pressing animated pins in browsers, Pinterest often serves static thumbnail previews. Here is how PintSave fixes it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-900 dark:text-white text-base text-rose-500">
                  Standard Right-Click / Long Press
                </h3>
                <span className="text-xs font-mono bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded">FROZEN FRAME</span>
              </div>
              <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-2.5">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span>Saves only the static first frame of the animation as a flat image</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span>Loss of motion, frame rate, and looping animation playback</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span>Forces users to resort to low-quality screen recordings</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-brand-50/50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-900 dark:text-white text-base text-brand-500 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> PintSave GIF Extractor
                </h3>
                <span className="text-xs font-mono bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 px-2 py-0.5 rounded">FULL MOTION</span>
              </div>
              <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-2.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Preserves 100% full-motion animation frames and original FPS</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Offers dual download formats: native `.gif` or lightweight `.mp4`</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Instant single-click download directly into Photos or Downloads</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY FEATURES SECTION */}
      <section className="py-16 bg-stone-50/50 dark:bg-stone-900/30 border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="brand">KEY FEATURES & ADVANTAGES</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              Why Choose Our <span className="text-brand-500">Pinterest GIF Downloader</span>
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
              Engineered specifically to solve frozen keyframe saves and preserve smooth looping animations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">100% Motion Retention</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Prevents animated GIFs from freezing into static pictures. Your downloaded files retain every single animation frame and smooth looping transition.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">100% Watermark-Free</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                We never place logos, watermarks, or quality-reducing brand overlays on your saved GIFs. You receive pristine original files.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">GIF & MP4 Format Options</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Download as native `.gif` for messaging apps or convert to lightweight `.mp4` video format for Instagram, TikTok, and video editors.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Works on All Devices</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Compatible with iOS Safari, Android Chrome, Windows PC, macOS, and Linux. Save animated media directly to your Photos or Gallery.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">No Signup or Account Required</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Download animated media completely anonymously. No registration, email collection, or browser extension installation needed.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <Infinity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-purple-400">Unlimited Free Downloads</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Save as many motion graphics, reaction GIFs, and meme clips as you like. No daily download caps or hidden subscription fees.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. BENEFITS & USE CASES SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand">REAL-WORLD BENEFITS</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Why Download <span className="text-brand-500">Pinterest GIFs?</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            Animated GIFs are essential for modern digital communication. Here is how saving motion pins enhances creative projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">Sharing in Discord, WhatsApp & Slack</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Expressing ideas with animated reaction GIFs is standard across community platforms like Discord, WhatsApp, iMessage, and Slack. PintSave allows you to save Pinterest reaction clips directly for easy sharing in chat groups.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Film className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">UI/UX Animators & Motion Designers</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Motion designers and UI/UX artists study animated micro-interactions, loading spinners, and interface transitions found on Pinterest. Downloading high-framerate GIFs lets you study animation curves frame-by-frame in After Effects or Principle.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">Meme Creators & Social Marketers</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Content creators and meme curators quickly harvest trending animation templates and pop culture motion loops from Pinterest to edit into viral social posts and video essays.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">Offline Access & Personal Collections</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Avoid losing access to your favorite animated pins if a creator deletes them or sets their board to secret. Download local copies of animated artwork to enjoy offline anytime.
            </p>
          </div>
        </div>
      </section>

      {/* 5. SUPPORTED FORMATS & COMPATIBILITY SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-stone-900 text-stone-100 p-8 sm:p-12 border border-stone-800 space-y-8 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <Badge variant="brand" className="bg-brand-500/20 text-brand-400 border-brand-500/30">
              FORMATS & DEVICE COMPATIBILITY
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Supported Animation Formats & Operating Systems
            </h2>
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
              PintSave offers flexible format choices for universal device and application support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-800/70 p-6 rounded-2xl border border-stone-700/60 space-y-3">
              <div className="flex items-center gap-2 text-brand-400 font-bold">
                <Film className="w-5 h-5" />
                <h3>GIF & MP4 Formats</h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Save as native animated `.gif` for chat apps or lightweight `.mp4` video container for video editing software and social media uploads.
              </p>
            </div>

            <div className="bg-stone-800/70 p-6 rounded-2xl border border-stone-700/60 space-y-3">
              <div className="flex items-center gap-2 text-brand-400 font-bold">
                <Smartphone className="w-5 h-5" />
                <h3>iOS & Android Mobile</h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Directly supported in iOS Safari and Android Chrome. Use the native browser download manager to store animated media in your Photos app or Gallery.
              </p>
            </div>

            <div className="bg-stone-800/70 p-6 rounded-2xl border border-stone-700/60 space-y-3">
              <div className="flex items-center gap-2 text-brand-400 font-bold">
                <Monitor className="w-5 h-5" />
                <h3>PC, Mac & Tablets</h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Playable across all desktop web browsers including Chrome, Safari, Edge, Firefox, and Opera on Windows, macOS, and Linux.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight flex items-center justify-center gap-2">
            <HelpCircle className="w-7 h-7 text-brand-500" />
            Pinterest GIF Downloader FAQ
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            Got questions about saving animated Pinterest GIFs? Here are clear, straightforward answers.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              Why does saving GIFs directly from Pinterest turn them into static pictures?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              When you long-press or right-click a GIF on Pinterest, the browser often saves the first static keyframe preview thumbnail. PintSave inspects the pin source and extracts the complete multi-frame `.gif` file with full animation intact.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              Can I convert a Pinterest GIF into an MP4 video format?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Yes! Pinterest encodes many animated pins into lightweight MP4 video streams. PintSave gives you direct links to download either the native `.gif` file or the compact `.mp4` video format.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              Is PintSave GIF Downloader 100% free with no hidden fees?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Yes! PintSave is 100% free with unlimited downloads. There are no daily download limits, hidden subscription charges, or mandatory user accounts.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              How do I save animated GIFs to my iPhone Camera Roll or Android Gallery?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              On Android, downloaded GIFs save straight to your Downloads folder and Gallery. On iOS Safari, tap "Download", open the Safari Downloads manager, tap Share, and choose "Save Image" to place the animated clip straight into your Photos app.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              Can I download private Pinterest GIFs or secret board pins?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              No. PintSave only supports public Pinterest pins. GIFs stored in secret boards or private accounts cannot be extracted due to privacy security protocols.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              Does PintSave add watermarks or logos to downloaded GIFs?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              No. We never add watermarks, site logos, or quality-reducing overlays to your downloaded GIFs. You receive clean, original animated files.
            </p>
          </div>
        </div>
      </section>

      {/* 7. CLOSING CTA SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <CTABanner
          title="Ready to Save Animated Pinterest GIFs in HD?"
          description="Fast, 100% free, full-motion animation extractions with zero watermarks or account signups."
          buttonText="Try It Now — Download Animated GIF Free"
        />
      </div>
    </div>
  );
}
