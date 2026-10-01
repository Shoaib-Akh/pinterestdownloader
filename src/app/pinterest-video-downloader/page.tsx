'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import CTABanner from '@/components/CTABanner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  HelpCircle,
  Laptop,
  CheckCircle2,
  ChevronDown,
  Volume2,
  Layers,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '@/providers/language-provider';

interface FAQItem {
  q: string;
  a: string;
}

const VIDEO_FAQS: FAQItem[] = [
  {
    q: 'Does PintSave preserve the original stereo audio on saved Pinterest videos?',
    a: 'Yes. PintSave queries the direct media manifest from Pinterest CDN servers, extracting the pristine MP4 stream containing both the progressive H.264 video track and synchronized AAC stereo audio channels. Unlike standard browser screen recorders that introduce audio drift or capture microphone background noise, our downloader delivers studio-quality digital audio directly from the source file.',
  },
  {
    q: 'Can I download Pinterest Idea Pins and multi-slide video stories?',
    a: 'Yes! Idea Pins (previously referred to as Story Pins) often contain multiple video clips and audio tracks. PintSave analyzes the full pin structure to extract the high-definition video slides and compiled audio, allowing you to save the complete story directly to your phone or desktop.',
  },
  {
    q: 'How do I transfer downloaded Pinterest MP4 videos into my iPhone Camera Roll?',
    a: 'On iOS, Apple Safari downloads files to the Files app / iCloud Drive folder by default. After tapping "Download HD" on PintSave, tap the Safari download icon (blue circle with an arrow in the address bar), select the downloaded video, tap the iOS Share icon at the bottom-left corner, and choose "Save Video". The MP4 file will instantly appear in your native Apple Photos Camera Roll.',
  },
  {
    q: 'What video resolutions and formats does PintSave extract?',
    a: 'PintSave extracts videos in the industry-standard MP4 container encoded in H.264 video with AAC audio. Resolution depends on the original creator upload—up to 1080p Full HD (1080x1920 for vertical reels or 1920x1080 for widescreen clips) and 720p HD. We always fetch the maximum bitrate stream available.',
  },
  {
    q: 'Why did my video link fail or show an extraction error?',
    a: 'The most common causes of extraction errors are: (1) The pin is located on a secret or private board that requires account authorization; (2) The copied link contains extraneous text from a third-party app; or (3) The pin has been removed by Pinterest. Make sure the board is set to public and copy the clean link directly using the Pinterest share button.',
  },
  {
    q: 'Does PintSave add watermarks, site logos, or branding to downloaded videos?',
    a: 'Never. PintSave does not apply any watermarks, intro splash screens, logos, or promotional overlays to your files. The MP4 video you receive is the exact, unblemished file uploaded by the creator.',
  },
  {
    q: 'Is it legal to download Pinterest videos for offline use?',
    a: 'Downloading public Pinterest videos for private offline study, personal visual moodboarding, archival backup, or educational reference is widely recognized under Fair Use principles. However, commercial re-distribution, sale, or claiming ownership of third-party videos without the creator’s explicit consent is strictly prohibited.',
  },
  {
    q: 'Why is saving via PintSave better than screen recording my smartphone screen?',
    a: 'Screen recording captures on-screen UI buttons, battery indicators, notifications, and downscaled playback streams subject to mobile network buffering. PintSave bypasses the device screen completely, downloading the pure master MP4 file at full resolution, original frame rate (30/60 FPS), and pristine digital audio.',
  },
];

export default function PinterestVideoDownloaderPage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
    description: 'Free online tool to download 1080p Full HD MP4 videos and reels from Pinterest with synchronized stereo audio and zero watermarks.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: VIDEO_FAQS.map((faq) => ({
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
        badgeText="100% Free · 1080p Full HD MP4 · Stereo Audio · No Watermark"
        title={<>Download Pinterest Videos in 1080p HD with Audio</>}
        description="Extract high-bitrate MP4 videos, recipe clips, fashion reels, and DIY tutorials from Pinterest directly to your mobile phone or desktop without watermarks or software installation."
        placeholder="Paste Pinterest video link here (e.g. https://pin.it/... or https://pinterest.com/pin/...)..."
        previewImage="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80"
      />

      {/* 2. IN-DEPTH EDITORIAL & TECHNICAL EXPLANATION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-10 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand">TECHNICAL GUIDE & ARCHITECTURE</Badge>
            <Badge variant="secondary">H.264 / AAC CODECS</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white leading-tight">
            How PintSave Preserves Full 1080p Video Bitrates and Synchronized Stereo Audio
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Pinterest delivers video content—including video pins, idea pins, and promotional reels—using adaptive bitrate streaming protocols such as HTTP Live Streaming (HLS) and m3u8 playlist manifests. When you stream a video in the Pinterest app or mobile browser, the media player continuously measures your Wi-Fi or cellular connection. If network congestion occurs, the player automatically drops playback quality to 480p or 360p to prevent buffering.
          </p>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            When users attempt to preserve these video pins using smartphone screen recorders or generic web capture tools, the recorded file suffers from severe quality degradation: dropped frames, washed-out colors, muffled mono audio, and distracting user-interface overlays.
          </p>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            <strong>PintSave resolves this fundamental limitation.</strong> Our serverless extraction architecture queries the underlying video manifest directly on Pinterest&apos;s Content Delivery Network (Akamai and Cloudflare). PintSave identifies and extracts the master progressive MP4 stream uploaded by the original creator. This guarantees that your downloaded file retains maximum 1080p Full HD clarity, vibrant color grading, high bitrate video encoding, and crystal-clear stereo audio tracks.
          </p>

          {/* Technical Specs Comparison Table */}
          <div className="pt-4 overflow-x-auto">
            <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-3 flex items-center gap-2">
              <FileVideo className="w-5 h-5 text-brand-500" />
              Technical Format Specifications
            </h3>
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400">
                  <th className="py-2.5 pr-4 font-semibold">Parameter</th>
                  <th className="py-2.5 pr-4 font-semibold">PintSave Master Extraction</th>
                  <th className="py-2.5 font-semibold">Screen Recording / Generic Tool</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60 text-stone-700 dark:text-stone-300">
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Container Format</td>
                  <td className="py-2.5 pr-4 text-emerald-600 dark:text-emerald-400 font-bold">Standard MP4 (.mp4)</td>
                  <td className="py-2.5 text-stone-500">MOV / WebM (Inconsistent)</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Video Codec</td>
                  <td className="py-2.5 pr-4 text-emerald-600 dark:text-emerald-400 font-bold">H.264 / AVC (Universal compatibility)</td>
                  <td className="py-2.5 text-stone-500">HEVC / Variable (Limited support)</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Audio Bitrate & Sync</td>
                  <td className="py-2.5 pr-4 text-emerald-600 dark:text-emerald-400 font-bold">AAC Stereo (Synchronized 48 kHz)</td>
                  <td className="py-2.5 text-stone-500">Audio lag or microphone hum</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Max Resolution</td>
                  <td className="py-2.5 pr-4 text-emerald-600 dark:text-emerald-400 font-bold">1080p Full HD (1080x1920 / 1920x1080)</td>
                  <td className="py-2.5 text-stone-500">Capped to screen viewport (~720p)</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-medium">Watermarks & Logos</td>
                  <td className="py-2.5 pr-4 text-emerald-600 dark:text-emerald-400 font-bold">100% Clean / Zero Watermarks</td>
                  <td className="py-2.5 text-stone-500">UI buttons, scrubber bars, logos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP INSTRUCTIONS SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand">STEP-BY-STEP TUTORIAL</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            How to Download Pinterest Videos on Any Device
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            Follow these simple instructions to save high-bitrate MP4 videos in seconds without installing third-party apps.
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
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Step 1: Copy Video URL</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Open Pinterest on your smartphone or browser. Locate the video pin or reel you wish to download, tap the <strong>Share</strong> button (arrow icon), and select <strong>Copy Link</strong> to copy the URL to your clipboard.
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
                Navigate to PintSave in your browser (Safari, Chrome, Firefox, or Edge). Paste your copied link into the search box at the top of this page and click the <strong>Download</strong> button.
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
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Step 3: Save Full HD MP4</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                PintSave analyzes the manifest and generates the direct stream link in less than one second. Click <strong>Download HD Video</strong> to save the uncompressed MP4 directly to your device storage.
              </p>
            </div>
          </Card>
        </div>

        {/* Operating System Specific Steps */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-brand-500 font-bold text-base">
              <Smartphone className="w-5 h-5" />
              <h4>Detailed iOS iPhone / iPad Guide</h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              When downloading on iOS Safari, tapping &quot;Download HD&quot; will prompt a native confirmation modal: <em>&quot;Do you want to download pintsave_video.mp4?&quot;</em>. Tap <strong>Download</strong>. Then tap the blue downward arrow in your Safari address bar, tap the downloaded video, tap the iOS <strong>Share</strong> button, and tap <strong>Save Video</strong>. The file immediately saves to your Apple Photos app.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-brand-500 font-bold text-base">
              <Laptop className="w-5 h-5" />
              <h4>Detailed Android & Desktop Guide</h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              On Android (Chrome or Samsung Internet), clicking &quot;Download HD Video&quot; automatically downloads the MP4 file directly into your device&apos;s <code>/Downloads</code> directory and registers it instantly in Google Photos and your Gallery app. On Mac and Windows PCs, the browser prompts your native file system save window.
            </p>
          </div>
        </div>
      </section>

      {/* 4. PRACTICAL LIMITATIONS & TROUBLESHOOTING */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-4">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-lg">
            <AlertTriangle className="w-5 h-5" />
            <h3>Practical Limitations & Extraction Guidelines</h3>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
            While PintSave is engineered to handle almost all public Pinterest video pins, keep these operational boundaries in mind:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-950 dark:text-amber-100">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Private & Secret Boards:</strong> PintSave respects user privacy and cannot access pins saved in secret boards. The board must be temporarily set to public to extract media.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Temporary CDN Access Tokens:</strong> Pinterest CDN URLs contain temporary authorization tokens that expire after several hours. Do not leave download links idle for long periods.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Multi-Clip Idea Pins:</strong> Idea Pins containing several video pages are stitched together seamlessly. Large story pins may take an extra 2-3 seconds to process.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Fair Use Personal Archiving:</strong> Downloaded files are intended for personal inspiration, study, and offline moodboarding. Respect creator copyright.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 5. VIDEO SPECIFIC FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="brand">ANSWERS TO COMMON QUESTIONS</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Pinterest Video Downloader FAQ
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about video resolutions, audio synchronization, and mobile saving.
          </p>
        </div>

        <div className="space-y-4">
          {VIDEO_FAQS.map((faq, idx) => (
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

      {/* 6. CLOSING CTA BANNER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <CTABanner
          title="Ready to Download Pinterest Videos in 1080p HD?"
          description="Extract watermark-free MP4 videos with full audio sync directly to your iPhone, Android, or PC in seconds."
          buttonText="Try PintSave Downloader Now"
          href="/"
        />
      </div>
    </div>
  );
}
