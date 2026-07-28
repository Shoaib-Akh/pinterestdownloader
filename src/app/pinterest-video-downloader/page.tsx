import { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import CTABanner from '@/components/CTABanner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Copy, 
  Sparkles, 
  Download, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  Infinity, 
  FileVideo, 
  CheckCircle2, 
  HelpCircle,
  Monitor,
  Video,
  Clapperboard,
  HeartHandshake
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Download Pinterest Videos in HD — Fast & Free MP4 Downloader | PintSave',
  description:
    'Free online Pinterest Video Downloader. Save 1080p HD MP4 videos, reels, and story pins directly to iPhone, Android, PC, or Mac without watermark or login.',
  openGraph: {
    title: 'Download Pinterest Videos in HD — Fast & Free MP4 Downloader',
    description: 'Download Pinterest video pins instantly in HD MP4 format. 100% free, watermark-free, no registration required.',
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
    description: 'Free online tool to download high bitrate MP4 videos and reels from Pinterest without watermarks.',
  };

  return (
    <div className="space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <HeroSection
        badgeText="100% Free · No Watermark · 1080p MP4"
        title={
          <>
            Download <span className="text-brand-500 underline decoration-brand-200 dark:decoration-brand-900">Pinterest Videos</span> in HD — Fast & Free
          </>
        }
        description="Extract high-bitrate MP4 videos, recipe clips, fashion reels, and DIY tutorials from Pinterest directly to your device. No watermarks, no account signup, and 100% free."
        placeholder="Paste Pinterest video link here (e.g. https://pin.it/... or pinterest.com/pin/...)"
        previewImage="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80"
      />

      {/* 2. HOW IT WORKS SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand">SIMPLE 3-STEP GUIDE</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            How to Download <span className="text-brand-500">Pinterest Videos</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            Save any public video pin or reel in three quick steps without installing extra apps or extensions.
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
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Copy Video Pin Link</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Open the Pinterest app on your smartphone or browse pinterest.com on desktop. Find the video pin, recipe clip, or reel you want to save. Tap the <strong>Share</strong> button (or three dots) and tap <strong>Copy Link</strong>.
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
                Paste your copied video URL into the input field at the top of this page. Our engine automatically checks the link structure and fetches the original direct MP4 video stream from Pinterest's servers.
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
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Save HD MP4 File</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Click <strong>Download HD</strong> to store the original high-bitrate MP4 video straight onto your iPhone Camera Roll, Android Gallery, or computer hard drive. Watch offline with full audio.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. KEY FEATURES SECTION */}
      <section className="py-16 bg-stone-50/50 dark:bg-stone-900/30 border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="brand">WHY CHOOSE OUR TOOL</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              Powerful Features for <span className="text-brand-500">Pinterest Video Downloading</span>
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
              Designed specifically to overcome playback buffering, slow download queues, and low-quality screen recordings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <FileVideo className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Original 1080p HD MP4</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                We extract the master high-bitrate MP4 video stream uploaded by the creator. You get crisp H.264 video playback with clear stereo audio intact.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">100% Watermark-Free</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                PintSave never places logos, watermarks, or quality-reducing brand overlays over your videos. Your saved files remain clean and original.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Sub-Second Conversion Speed</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Our extraction engine directly queries Pinterest CDN endpoints to generate your download links in under 1 second. No waiting in slow queues.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Universal Mobile & Desktop</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Works seamlessly on iPhone (Safari), Android (Chrome), macOS, Windows, and Linux. Save videos directly to your Camera Roll or Gallery.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">No App or Account Required</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                You do not need to install browser add-ons, APKs, or register an account. Download media completely anonymously in your browser.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <Infinity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Unlimited Free Downloads</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Save as many cooking tutorials, DIY clips, and fitness reels as you like. There are zero daily caps or hidden subscription paywalls.
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
            Why Download <span className="text-brand-500">Pinterest Videos?</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            Pinterest is home to millions of short-form educational videos. Here is how offline video saving benefits different users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">Offline Viewing Without Buffering</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Never lose access to your favorite cooking recipes, workout routines, or DIY crafting steps when traveling or in areas with poor internet connection. Saving videos directly to your device lets you replay them smoothly anytime without ad interruptions or buffering delays.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Clapperboard className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">For Content Creators & Video Marketers</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Video creators and social media marketers use PintSave to archive inspiration clips, analyze video hook techniques, observe visual editing styles, and build reference moodboards for client creative briefs.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">For Home Decorators & DIY Enthusiasts</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Keep detailed woodworking guides, home organization tutorials, and gardening clips saved locally on your tablet while working in the garage, garden, or workshop where Wi-Fi might not reach.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">Personal Backup & Archiving</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Pinterest pins can sometimes be deleted or made private by original uploaders. Downloading MP4 copies ensures your personal collection of saved video tutorials remains accessible forever.
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
              Supported Video Formats & Operating Systems
            </h2>
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
              PintSave delivers standard MP4 files formatted for maximum compatibility across all major platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-800/70 p-6 rounded-2xl border border-stone-700/60 space-y-3">
              <div className="flex items-center gap-2 text-brand-400 font-bold">
                <FileVideo className="w-5 h-5" />
                <h3>MP4 Video Format</h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Standard H.264 video encoding paired with AAC audio. Plays seamlessly in Apple QuickTime, Windows Media Player, VLC, and mobile video players.
              </p>
            </div>

            <div className="bg-stone-800/70 p-6 rounded-2xl border border-stone-700/60 space-y-3">
              <div className="flex items-center gap-2 text-brand-400 font-bold">
                <Smartphone className="w-5 h-5" />
                <h3>iOS & Android Mobile</h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Directly supported in iOS Safari and Android Chrome. Use the native browser share feature to save video files directly into your Photos app or device gallery.
              </p>
            </div>

            <div className="bg-stone-800/70 p-6 rounded-2xl border border-stone-700/60 space-y-3">
              <div className="flex items-center gap-2 text-brand-400 font-bold">
                <Monitor className="w-5 h-5" />
                <h3>PC, Mac & Linux</h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Compatible with all modern web browsers including Chrome, Edge, Safari, Firefox, and Opera on macOS, Windows, and Linux operating systems.
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
            Pinterest Video Downloader FAQ
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            Got questions about downloading Pinterest video pins? Here are clear, straightforward answers.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              Can I download private Pinterest videos or videos from secret boards?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              No. PintSave only supports public Pinterest pins and reels. Videos stored in private accounts or secret boards cannot be extracted due to privacy security protocols.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              What video quality and resolutions are supported?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              PintSave extracts the highest resolution video stream available from Pinterest CDN servers for that specific pin. Most video reels and tutorials are available in 720p HD or 1080p Full HD MP4 format.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              Is there any download limit on how many videos I can save?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              No! PintSave is completely free with unlimited downloads. You can save as many video pins, idea clips, and tutorials as you like without daily caps or payment requests.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              Does PintSave work on mobile devices like iPhone and Android?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Yes! On Android, downloaded MP4 files save directly to your Downloads folder. On iOS Safari, tap "Download", open Safari Downloads, tap Share, and choose "Save Video" to store the clip straight in your iPhone Camera Roll.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              Does PintSave add watermarks to downloaded videos?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              No. We never add watermarks, branding overlays, or logos to your downloaded MP4 videos. You receive clean, original video files.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              Do downloaded Pinterest videos include sound and audio?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Yes! PintSave extracts complete MP4 video containers that preserve original stereo audio tracks alongside high-definition video frames.
            </p>
          </div>
        </div>
      </section>

      {/* 7. CLOSING CTA SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <CTABanner
          title="Ready to Download Pinterest Videos in Full HD?"
          description="Fast, 100% free, 1080p MP4 video downloads with zero watermarks or account signups required."
          buttonText="Try It Now — Download HD Video Free"
        />
      </div>
    </div>
  );
}
