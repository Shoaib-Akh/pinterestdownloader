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
  Image as ImageIcon, 
  CheckCircle2, 
  HelpCircle,
  Monitor,
  Layers,
  Palette,
  Briefcase,
  Printer,
  HeartHandshake
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Download Pinterest Images in HD — Fast & Free Photo Downloader | PintSave',
  description:
    'Free Pinterest Image Downloader tool. Save uncompressed 4K photos, wallpapers, aesthetic art, and infographics directly to iPhone, Android, PC, or Mac without watermark.',
  openGraph: {
    title: 'Download Pinterest Images in HD — Fast & Free Photo Downloader',
    description: 'Download original resolution Pinterest images in 4K JPG and PNG format. 100% free, watermark-free, no registration required.',
    url: 'https://pintsave.app/pinterest-image-downloader',
  },
};

export default function PinterestImageDownloaderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PintSave Pinterest Image Downloader',
    operatingSystem: 'All',
    applicationCategory: 'MultimediaApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free online tool to download uncompressed 4K images and original photos from Pinterest without watermarks.',
  };

  return (
    <div className="space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <HeroSection
        badgeText="100% Free · No Watermark · Original 4K HD"
        title={
          <>
            Download <span className="text-brand-500 underline decoration-brand-200 dark:decoration-brand-900">Pinterest Images</span> in HD — Fast & Free
          </>
        }
        description="Extract uncompressed original 4K photos, aesthetic wallpapers, graphic design artwork, and infographics from Pinterest directly to your device. No watermarks, no login required."
        placeholder="Paste Pinterest image link here (e.g. https://pin.it/... or pinterest.com/pin/...)"
        previewImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
      />

      {/* 2. HOW IT WORKS SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand">SIMPLE 3-STEP GUIDE</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            How to Download <span className="text-brand-500">Pinterest Photos</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            Extract master resolution images in three quick steps without quality degradation or annoying popups.
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
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Copy Image Pin Link</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Open the Pinterest app on your phone or browse pinterest.com in your web browser. Find the photo, wallpaper, or infographic pin you want to save. Tap the <strong>Share</strong> icon and click <strong>Copy Link</strong>.
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
                Paste your copied image link into the search box above. PintSave immediately inspects the pin payload, bypasses compressed web preview thumbnails, and locates the direct source file.
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
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Save JPG / PNG File</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Click <strong>Download HD</strong> to store the original uncompressed photo (JPG/PNG format) straight onto your iPhone Camera Roll, Android Gallery, or computer hard drive in maximum DPI.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* THUMBNAIL VS MASTER COMPARISON SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="brand">RESOLUTION BREAKDOWN</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white flex items-center justify-center gap-2">
              <Layers className="w-6 h-6 text-brand-500" />
              Why Standard Right-Clicking Lowers Photo Quality
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              When you right-click photos on Pinterest grids, browsers only save compressed preview thumbnails. Here is how PintSave restores true original image fidelity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-900 dark:text-white text-base text-rose-500">
                  Standard Browser Right-Click
                </h3>
                <span className="text-xs font-mono bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded">COMPRESSED</span>
              </div>
              <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-2.5">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span>Saves downscaled 236px or 736px grid preview thumbnails</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span>Noticeable blur and compression pixelation when printed or viewed on 4K displays</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span>Loss of fine details, original color gamut, and image sharpness</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-brand-50/50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-900 dark:text-white text-base text-brand-500 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> PintSave 4K HD Extractor
                </h3>
                <span className="text-xs font-mono bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 px-2 py-0.5 rounded">MASTER QUALITY</span>
              </div>
              <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-2.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Resolves 100% uncompressed source file from the <code className="bg-stone-200 dark:bg-stone-800 px-1 py-0.5 rounded text-[11px]">/originals/</code> CDN folder</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Full 4K / 8K resolution intact for printing, posters, and wallpaper</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Instant single-click original JPG, PNG, or WebP file download</span>
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
            <Badge variant="brand">KEY FEATURES & HIGHLIGHTS</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              Why Choose Our <span className="text-brand-500">Pinterest Image Downloader</span>
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
              Built specifically for visual artists, designers, and curators who require uncompressed source files.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Original 4K HD Resolution</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Extract the original pixel-for-pixel master photo uploaded by creators. Enjoy crisp lines and zero compression artifacts.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">100% Watermark-Free</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                We never add logos, site watermarks, or quality-reducing brand overlays to your saved images. You get clean original master files.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Supports JPG, PNG & WebP</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Save photos in their native image format—whether uncompressed JPG, lossless PNG illustrations, or lightweight WebP files.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Works on All Devices</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Compatible with iOS Safari, Android Chrome, Windows PC, macOS, and iPadOS. Save directly into your device Photos app or Gallery.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">No Account or Login Required</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Download images completely anonymously. No email registration, social media logins, or tracking cookies stored.
              </p>
            </Card>

            <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <Infinity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Unlimited Free Downloads</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Save as many visual assets, aesthetic wallpapers, and design inspirations as you need. No daily caps or hidden subscription fees.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. BENEFITS & USE CASES SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand">PRACTICAL BENEFITS & USE CASES</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Why Download <span className="text-brand-500">Pinterest Images?</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            Pinterest is the largest creative search engine in the world. Here is how downloading HD images supercharges creative workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">Designers & Artists Saving Inspiration</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Graphic designers, illustrators, and interior architects use PintSave to collect crisp, uncompressed visual references for Photoshop, Figma, and Canva. Full resolution ensures your moodboards and client pitch decks look professional and sharp.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">Marketers & Brand Curators</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Social media managers and digital marketers collect visual trend references, color palette inspirations, and typography samples to plan marketing campaigns and social media aesthetic guides.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Printer className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">High DPI Physical Printing</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Planning to print a poster, aesthetic room wall art, or physical vision board? Standard browser right-clicks produce blurry 72DPI files. PintSave extracts 300+ DPI source files ideal for physical print shop production.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-white">Offline Access & Personal Archiving</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Pins can occasionally be removed or deleted by creators. Downloading high-resolution backup copies guarantees your personal aesthetic collections and reference boards remain accessible offline forever.
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
              Supported Image Formats & Device Compatibility
            </h2>
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
              PintSave delivers native image files formatted for seamless cross-platform usage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-800/70 p-6 rounded-2xl border border-stone-700/60 space-y-3">
              <div className="flex items-center gap-2 text-brand-400 font-bold">
                <ImageIcon className="w-5 h-5" />
                <h3>JPG, PNG & WebP Output</h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Extract original photography JPGs, transparent artwork PNGs, and modern WebP formats in their native pixel dimensions.
              </p>
            </div>

            <div className="bg-stone-800/70 p-6 rounded-2xl border border-stone-700/60 space-y-3">
              <div className="flex items-center gap-2 text-brand-400 font-bold">
                <Smartphone className="w-5 h-5" />
                <h3>iOS & Android Mobile</h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Save HD photos directly into your iPhone Photos app via Safari Downloads or your Android phone gallery in a couple of quick taps.
              </p>
            </div>

            <div className="bg-stone-800/70 p-6 rounded-2xl border border-stone-700/60 space-y-3">
              <div className="flex items-center gap-2 text-brand-400 font-bold">
                <Monitor className="w-5 h-5" />
                <h3>PC, Mac & Tablets</h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Compatible with all desktop and tablet web browsers including Chrome, Safari, Edge, Firefox, and Opera on Windows, macOS, and iPadOS.
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
            Pinterest Image Downloader FAQ
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            Clear, straightforward answers about downloading Pinterest photos and artwork.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              Can I download private Pinterest images or secret board pins?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              No. PintSave only works with public Pinterest pins. Photos stored in private accounts or secret boards cannot be extracted due to privacy protection settings.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              What image quality and resolution will my downloaded photo have?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              PintSave automatically fetches the original, uncompressed source image uploaded by the creator (often 2000px to 4000px+ wide), bypassing the compressed 736px web thumbnails.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              Is there any daily limit on how many images I can save?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              No! PintSave is 100% free with unlimited image downloads. You can save as many photos, aesthetic wallpapers, and infographics as you like without daily caps or fees.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              Does PintSave work on mobile browsers like iPhone Safari and Android Chrome?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Yes! On Android, downloaded images save straight to your device Gallery. On iOS Safari, tap "Download", open Safari Downloads, tap Share, and choose "Save Image" to place it directly into your Photos app.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              Can I download multiple images from a Carousel Pin?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Yes! When you input a carousel pin link, PintSave parses all items in the carousel, enabling you to preview and save each individual high-resolution image slide separately.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-sm">
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
              Does PintSave add watermarks to downloaded photos?
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              No. PintSave never adds watermarks, logos, or quality-reducing overlays to your downloaded images. You get clean original master files.
            </p>
          </div>
        </div>
      </section>

      {/* 7. CLOSING CTA SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <CTABanner
          title="Ready to Save Uncompressed 4K Pinterest Images?"
          description="Fast, 100% free, original resolution photo extractions with zero watermarks or account signups."
          buttonText="Try It Now — Download 4K Photo Free"
        />
      </div>
    </div>
  );
}
