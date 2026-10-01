'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import CTABanner from '@/components/CTABanner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Copy, 
  Sparkles, 
  Download, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  Infinity, 
  FileImage, 
  HelpCircle,
  Laptop,
  CheckCircle2,
  ChevronDown,
  Film,
  Presentation,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '@/providers/language-provider';

interface FAQItem {
  q: string;
  a: string;
}

const GIF_FAQS: FAQItem[] = [
  {
    q: 'Why did my saved Pinterest GIF freeze into a still photo when I saved it directly from my browser?',
    a: 'When you browse Pinterest on modern mobile devices or desktop browsers, the platform often serves a static first-frame preview or converts the animation into a lightweight WebP or MP4 loop to reduce network bandwidth. If you use standard browser right-click or mobile long-press gestures, your device merely saves the static initial thumbnail rather than the underlying multi-frame animated graphic. PintSave queries the direct CDN source to fetch the authentic, multi-frame animated GIF file with all animation frames preserved.',
  },
  {
    q: 'Does PintSave retain full animation frame rates and loop timing?',
    a: 'Yes. PintSave retrieves the original master animation file without altering frame delays, color quantization palettes, or loop markers. Whether the creator designed a smooth 60fps micro-interaction or a 24fps cinematic animation, the downloaded GIF will play with 100% frame timing fidelity.',
  },
  {
    q: 'Can I use downloaded Pinterest GIFs in Discord, Slack, and Microsoft PowerPoint?',
    a: 'Yes! Because PintSave downloads standard Compuserve GIF89a format files, they are universally compatible with Microsoft PowerPoint, Apple Keynote, Google Slides, Figma, Notion, Discord, Slack, Microsoft Teams, and email marketing platforms. They loop automatically without requiring third-party video players.',
  },
  {
    q: 'What is the technical difference between an animated GIF and a video pin on Pinterest?',
    a: 'An animated GIF is a sequence of indexed bitmap frames (supporting up to 256 colors per frame with optional transparent backgrounds) that loops continuously without an audio track. A video pin is an H.264/AAC MP4 video stream with millions of colors and stereo sound. If you need sound, use our Pinterest Video Downloader; if you need looping reaction graphics, sticker overlays, or UI motion, use the GIF Downloader.',
  },
  {
    q: 'Does PintSave support transparent animated GIFs and sticker pins?',
    a: 'Yes. If the original GIF was created with an alpha transparency channel (frequently used for graphic design overlays, Twitch stream alerts, and sticker animations), PintSave preserves the transparent background intact so you can place it seamlessly over other media layers.',
  },
  {
    q: 'Why are some animated GIF files larger than video files?',
    a: 'The GIF specification does not utilize modern temporal inter-frame video compression (such as keyframe delta encoding in H.264). Every frame in an animated GIF contains substantial uncompressed pixel data. For long animations, GIF file sizes can be relatively large. PintSave delivers the original creator file without artificial quality throttling.',
  },
  {
    q: 'How do I save animated Pinterest GIFs on an iPhone or iPad?',
    a: 'On iOS, copy the GIF pin link, paste it into PintSave in Safari, and tap "Download HD GIF". In the Safari prompt, tap Download, open the Safari Downloads menu, select the GIF, tap the Share icon, and select "Save Image". Apple Photos natively supports and loops animated GIFs in the "Animated" media album.',
  },
  {
    q: 'Can I download GIFs from private or secret Pinterest boards?',
    a: 'PintSave cannot access pins located in secret or private boards because external servers cannot authenticate against your private Pinterest account credentials. You can temporarily toggle the board visibility to public, perform the extraction on PintSave, and then restore the board to secret.',
  },
];

export default function PinterestGifDownloaderPage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
    description: 'Free online tool to download full-motion animated GIFs and looping clips from Pinterest without frame freezing or watermarks.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GIF_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. HERO SECTION */}
      <HeroSection
        badgeText="100% Free · Full Frame Continuity · Smooth Loops · Zero Watermarks"
        title={<>Download Animated Pinterest GIFs in High Quality</>}
        description="Save smooth animated GIFs, reaction loops, motion graphics, and UI stickers directly from Pinterest to your device without freezing animation frames or watermarks."
        placeholder="Paste Pinterest GIF link here (e.g. https://pin.it/... or https://pinterest.com/pin/...)..."
        previewImage="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80"
      />

      {/* 2. TECHNICAL GUIDE: WHY BROWSER GIF SAVES FREEZE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-10 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand">FRAME CONTINUITY ARCHITECTURE</Badge>
            <Badge variant="secondary">GIF89A & ALPHA TRANSPARENCY</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white leading-tight">
            Why Standard Right-Click Saving Breaks Pinterest Animated GIFs
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Pinterest is an exceptional treasure trove for animated UI prototypes, retro pixel art, 3D looping animations, and reaction memes. However, saving an animated GIF from Pinterest using conventional browser methods is notoriously frustrating.
          </p>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            To speed up page rendering and conserve mobile user bandwidth, Pinterest automatically converts animated graphics inside web feeds into static WebP keyframes or compressed preview loops. When you right-click and choose &quot;Save Image As&quot; or long-press on a mobile smartphone, your browser only captures the static keyframe thumbnail. The result is a broken still image that completely loses its motion and vibrancy.
          </p>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            <strong>PintSave solves this problem directly.</strong> Our automated engine queries Pinterest&apos;s source content delivery networks (CDNs) to locate the authentic, multi-frame animated GIF file. By communicating directly with the origin server, PintSave delivers the master file with full frame rate continuity (up to 60fps), original 256-color palette tables, transparent alpha channels, and infinite loop markers preserved.
          </p>

          {/* Technical Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-500 uppercase">Browser Direct Save</span>
              <h4 className="font-bold text-stone-900 dark:text-white text-sm">Frozen Keyframe</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">Captures only the first static preview frame. The file does not animate when opened offline or inserted into presentation software.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-500 uppercase">Screen Capture</span>
              <h4 className="font-bold text-stone-900 dark:text-white text-sm">Choppy Playback</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">Captures display stutter, frame-rate mismatch, mobile UI buttons, and requires manual post-cropping.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-500 uppercase">PintSave Extraction</span>
              <h4 className="font-bold text-stone-900 dark:text-white text-sm">Full 60fps Motion</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">Extracts the uncompressed multi-frame master file with authentic loop markers, palette tables, and transparency intact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. APPLICATION & WORKFLOW INTEGRATION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand">WORKFLOW COMPATIBILITY</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Universal Compatibility with Modern Creative Tools
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            Downloaded GIFs are saved in standard Compuserve GIF89a format, ensuring immediate compatibility with your design and communication tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Presentation className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Keynote & PowerPoint Decks</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Elevate client presentations and design pitches by embedding looping animations directly into slide decks. GIFs run automatically without third-party video codecs or external player dependencies.
            </p>
          </Card>

          <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Film className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Motion Graphics & Timing Reference</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Import downloaded animations into Adobe After Effects, Premiere Pro, or Figma as reference layers. Analyze frame easing curves, timing intervals, and visual pacing frame-by-frame.
            </p>
          </Card>

          <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Discord, Slack & Team Messaging</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Add customized reaction memes, UI micro-interactions, and team stickers directly to Slack workspaces, Discord servers, Notion documentation, and company knowledge bases.
            </p>
          </Card>
        </div>
      </section>

      {/* 4. STEP-BY-STEP INSTRUCTIONS SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand">SIMPLE 3-STEP PROCESS</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            How to Download Animated Pinterest GIFs
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            Follow these straightforward steps to extract animated GIFs in full frame rate without installing software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hoverEffect className="p-8 relative flex flex-col justify-between border border-stone-200/60 dark:border-stone-800">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                  <Copy className="w-6 h-6" />
                </div>
                <span className="font-mono text-3xl font-extrabold text-stone-200 dark:text-stone-800">01</span>
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Step 1: Copy GIF Pin Link</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Open Pinterest in your browser or smartphone app. Find the animated GIF you want, click the <strong>Share</strong> button, and tap <strong>Copy Link</strong> to place the URL on your clipboard.
              </p>
            </div>
          </Card>

          <Card hoverEffect className="p-8 relative flex flex-col justify-between border border-stone-200/60 dark:border-stone-800">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="font-mono text-3xl font-extrabold text-stone-200 dark:text-stone-800">02</span>
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Step 2: Paste into PintSave</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Open PintSave in Safari, Chrome, Edge, or Firefox. Paste the copied link into the search bar at the top of this page and click the <strong>Download</strong> button.
              </p>
            </div>
          </Card>

          <Card hoverEffect className="p-8 relative flex flex-col justify-between border border-stone-200/60 dark:border-stone-800">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                  <Download className="w-6 h-6" />
                </div>
                <span className="font-mono text-3xl font-extrabold text-stone-200 dark:text-stone-800">03</span>
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Step 3: Save Animated File</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                PintSave resolves the direct CDN animation stream. Click <strong>Download HD GIF</strong> to save the multi-frame animated file straight to your phone gallery or computer.
              </p>
            </div>
          </Card>
        </div>

        {/* Operating System Guidelines */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-brand-500 font-bold text-base">
              <Smartphone className="w-5 h-5" />
              <h4>Mobile Instructions (iOS & Android)</h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              On iOS Safari, tap &quot;Download HD GIF&quot;, open Safari Downloads, tap the file, tap Share, and select <strong>Save Image</strong>. The animation will play smoothly inside Apple Photos under the &quot;Animated&quot; album. On Android, the GIF automatically downloads to your <code>/Downloads</code> directory and plays inside Google Photos and default gallery apps.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-brand-500 font-bold text-base">
              <Laptop className="w-5 h-5" />
              <h4>Desktop Instructions (Mac & Windows)</h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              On macOS and Windows, paste your pin link into PintSave and click Download. The browser immediately triggers your operating system&apos;s file save prompt, allowing you to store the uncompressed animated GIF file directly in your design assets folder.
            </p>
          </div>
        </div>
      </section>

      {/* 5. LIMITATIONS & ETHICS NOTICE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-4">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-lg">
            <AlertTriangle className="w-5 h-5" />
            <h3>Important Notes for Animated GIF Downloads</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-amber-950 dark:text-amber-100">
            <div className="space-y-1">
              <strong>File Size Considerations:</strong>
              <p>Because GIFs do not utilize modern temporal video compression, high-frame-rate animated files can be substantially larger than static photos. Ensure you have adequate storage space.</p>
            </div>
            <div className="space-y-1">
              <strong>Audio Limitations:</strong>
              <p>The Compuserve GIF specification does not support audio tracks. If you are downloading a video clip with speech or music, use our dedicated Pinterest Video Downloader.</p>
            </div>
            <div className="space-y-1">
              <strong>Private Pin Access:</strong>
              <p>PintSave cannot access pins stored within private or secret boards. Make sure the pin is public before pasting its link.</p>
            </div>
            <div className="space-y-1">
              <strong>Respect Original Creators:</strong>
              <p>All downloaded animations should be used for personal inspiration, private study, or reference. Respect copyright rules when utilizing media publicly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GIF SPECIFIC FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="brand">FREQUENTLY ASKED QUESTIONS</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Pinterest GIF Downloader FAQ
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about animated GIF preservation, loop markers, file sizes, and mobile viewing.
          </p>
        </div>

        <div className="space-y-4">
          {GIF_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left font-bold text-stone-900 dark:text-white flex items-center justify-between gap-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition"
              >
                <span className="text-base sm:text-lg">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-brand-500' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="p-6 pt-0 text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed border-t border-stone-100 dark:border-stone-800/50 mt-1">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. CLOSING CTA BANNER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <CTABanner
          title="Ready to Save Animated Pinterest GIFs?"
          description="Extract full-motion, high-frame-rate animated GIFs with smooth looping directly to your device in seconds."
          buttonText="Try PintSave Downloader Now"
          href="/"
        />
      </div>
    </div>
  );
}
