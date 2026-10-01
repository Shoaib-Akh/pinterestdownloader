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
  Image as ImageIcon,
  Laptop,
  CheckCircle2,
  ChevronDown,
  Layers,
  Printer,
  Palette,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '@/providers/language-provider';

interface FAQItem {
  q: string;
  a: string;
}

const IMAGE_FAQS: FAQItem[] = [
  {
    q: 'Why should I use PintSave instead of simply right-clicking and saving an image from my browser?',
    a: 'When you browse Pinterest on the web or mobile app, the platform displays scaled-down preview images (such as 236px, 474px, or 736px width) to minimize network bandwidth. When you right-click or long-press an image, your browser saves that compressed preview rather than the original high-resolution master file. PintSave communicates directly with the underlying Akamai and Cloudflare CDNs to bypass downsampling and fetch the authentic, uncompressed 2K, 4K, or 8K master photo.',
  },
  {
    q: 'Can PintSave download all slides from a multi-image Pinterest Carousel pin?',
    a: 'Yes! When you input the URL of a Pinterest carousel pin, PintSave automatically inspects the pin manifest, separates each individual slide, and generates high-resolution direct download options for every single image in the carousel set. You can save specific slides or download the full collection in original resolution.',
  },
  {
    q: 'Are downloaded Pinterest images suitable for physical printing and posters?',
    a: 'Yes. Because PintSave retrieves the highest-resolution master file uploaded by the original creator (often at 300+ DPI and multi-megapixel dimensions), these files are ideal for high-quality physical poster printing, framed art prints, textile design, and physical vision boards without blurry compression artifacts.',
  },
  {
    q: 'What image formats does PintSave support?',
    a: 'PintSave delivers images in their authentic uploaded formats—primarily high-quality JPEG (.jpg), Lossless PNG (.png), and modern WebP (.webp). We never re-compress, convert, or strip the original color space metadata, ensuring that professional RGB and sRGB color gamuts remain intact.',
  },
  {
    q: 'Can PintSave upscale a low-resolution or blurry Pinterest image?',
    a: 'PintSave retrieves the exact master source file uploaded by the creator. If the original author uploaded a low-resolution image (such as 500x500 pixels), PintSave delivers that exact file without artificial AI hallucination or fake interpolation. However, in the vast majority of cases, creators upload high-resolution photography that Pinterest downscales for web viewing—which PintSave fully unlocks.',
  },
  {
    q: 'Does PintSave add watermarks, compression, or metadata stamps to photos?',
    a: 'Never. PintSave functions strictly as an automated direct retrieval proxy. We do not inject watermarks, logos, copyright stamps, or compression algorithms into any image. You receive the exact original digital asset.',
  },
  {
    q: 'How do I download original Pinterest images on iPhone and Android?',
    a: 'On mobile, tap the Share icon on your chosen pin, select Copy Link, open Safari or Chrome, and paste the URL into PintSave. Tap "Download HD". On iOS Safari, long-press the resulting image or tap the download prompt and choose "Save to Photos". On Android, the photo downloads directly to your device Downloads folder and displays instantly in your Gallery.',
  },
  {
    q: 'Can I use downloaded Pinterest photos in commercial design work?',
    a: 'Images on Pinterest are protected by international copyright laws owned by their respective photographers and creators. While downloading images for personal offline inspiration, study, and moodboarding is permissible under Fair Use, commercial reproduction, advertising use, or re-selling requires written authorization or licensing from the original copyright holder.',
  },
];

export default function PinterestImageDownloaderPage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
    description: 'Free online tool to download original 4K high-resolution photos and carousel pins from Pinterest without compression or watermarks.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: IMAGE_FAQS.map((faq) => ({
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
        badgeText="100% Free · Original 4K Quality · Uncompressed DPI · No Watermark"
        title={<>Download Pinterest Images in Original 4K Resolution</>}
        description="Bypass web thumbnail compression and download pristine, full-resolution master photos, wallpapers, and carousel pins directly from Pinterest to your device."
        placeholder="Paste Pinterest image link here (e.g. https://pin.it/... or https://pinterest.com/pin/...)..."
        previewImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
      />

      {/* 2. IN-DEPTH TECHNICAL GUIDE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-10 rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand">ORIGINAL DPI EXTRACTION ARCHITECTURE</Badge>
            <Badge variant="secondary">MASTER ASSET RETRIEVAL</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white leading-tight">
            Understanding Pinterest Image Downsampling and How PintSave Unlocks Master Files
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Pinterest is home to millions of world-class photographs, architectural sketches, digital art renders, and fashion photography. However, to maintain fast rendering speeds across millions of smartphone screens, Pinterest enforces an aggressive image optimization pipeline. When an artist uploads a pristine 4000x6000 pixel photograph, Pinterest generates multiple downsampled thumbnails:
          </p>

          {/* Hierarchy Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-500 uppercase">236px - 474px Grid</span>
              <h4 className="font-bold text-stone-900 dark:text-white text-sm">Feed Preview Tier</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">Heavily compressed thumbnail used for rapid scroll performance on mobile apps. Contains only ~15% of original pixel detail.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60 space-y-2">
              <span className="text-xs font-mono font-bold text-sky-500 uppercase">736px Lightbox</span>
              <h4 className="font-bold text-stone-900 dark:text-white text-sm">Modal Display Tier</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">The enlarged image displayed in web browsers. Standard right-click &quot;Save Image As&quot; downloads this compressed 736px file.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-500 uppercase">Originals (4K / 8K)</span>
              <h4 className="font-bold text-stone-900 dark:text-white text-sm">PintSave Master Source</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">The uncompressed, full-DPI source file hosted on CDN servers. PintSave extracts this exact master file directly.</p>
            </div>
          </div>

          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            By analyzing the asset manifest of each pin, PintSave queries the direct <code>/originals/</code> directory endpoint on the CDN. This bypasses the responsive web containers completely, delivering the original full-resolution JPG, PNG, or WebP photograph with 100% color accuracy, original EXIF metadata dimensions, and zero added watermarks.
          </p>
        </div>
      </section>

      {/* 3. PROFESSIONAL WORKFLOW INTEGRATION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand">CREATIVE USE CASES</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Engineered for Designers, Artists, and Visual Curators
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            Why professional creative agencies and visual researchers rely on uncompressed image downloads from PintSave.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Printer className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">300+ DPI Physical Printing</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Standard web thumbnails produce pixelated, blurry prints when enlarged for physical art frames, canvas posters, or design presentations. PintSave delivers master files with the high pixel count needed for crisp, gallery-ready physical printing.
            </p>
          </Card>

          <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Figma & Photoshop Moodboards</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              When curating branding moodboards, textile swatches, or UI/UX concepts in Figma, zooming into low-res screenshots reveals compression artifacts. Uncompressed 4K downloads allow your team to examine intricate design details seamlessly.
            </p>
          </Card>

          <Card hoverEffect className="p-8 border border-stone-200/60 dark:border-stone-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Multi-Slide Carousel Extraction</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Many creators publish step-by-step design carousels and comic panels. PintSave automatically detects carousel sequences, letting you download all individual slides at original fidelity with a single click.
            </p>
          </Card>
        </div>
      </section>

      {/* 4. STEP-BY-STEP INSTRUCTIONS SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="brand">HOW TO DOWNLOAD</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            How to Save Original Pinterest Photos in 3 Easy Steps
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            Extract high-DPI original photography in seconds on iOS, Android, macOS, or Windows.
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
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Step 1: Copy Image Pin Link</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Open Pinterest in the mobile app or browser. Find the photograph or artwork you want, tap the <strong>Share</strong> button (arrow icon), and tap <strong>Copy Link</strong> to copy the pin address to your clipboard.
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
                Open PintSave in Safari, Chrome, Edge, or Firefox. Paste the copied Pinterest link into the input box at the top of this page and click the <strong>Download</strong> button.
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
              <h3 className="font-bold text-xl text-stone-900 dark:text-stone-100">Step 3: Save Original 4K File</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                PintSave retrieves the master CDN image link. Click <strong>Download HD Image</strong> to save the pristine uncompressed photo directly to your phone gallery or desktop folder.
              </p>
            </div>
          </Card>
        </div>

        {/* Device Guidelines */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-brand-500 font-bold text-base">
              <Smartphone className="w-5 h-5" />
              <h4>Mobile Saving Instructions (iPhone & Android)</h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              On iOS Safari, tap &quot;Download HD Image&quot;, then tap the share sheet icon and select <strong>Save Image</strong> to transfer the full-resolution photo straight into your Apple Photos library. On Android, the photo automatically saves to your <code>/Downloads</code> directory and registers immediately in your Google Photos or Gallery app.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-brand-500 font-bold text-base">
              <Laptop className="w-5 h-5" />
              <h4>Desktop Saving Instructions (Mac & Windows)</h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              On desktop computers, copy the link from your browser address bar, paste it into PintSave, and click Download. Your operating system prompts you to save the file in your preferred directory at original uncompressed quality without browser resizing.
            </p>
          </div>
        </div>
      </section>

      {/* 5. LIMITATIONS & ETHICS NOTICE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-4">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-lg">
            <AlertTriangle className="w-5 h-5" />
            <h3>Important Guidelines for Image Extractions</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-amber-950 dark:text-amber-100">
            <div className="space-y-1">
              <strong>Source Quality Ceiling:</strong>
              <p>PintSave extracts the authentic master file uploaded by the original pin creator. If the original image was uploaded in low resolution, PintSave preserves that exact file without artificial AI generation.</p>
            </div>
            <div className="space-y-1">
              <strong>Private Board Access:</strong>
              <p>PintSave respects account privacy and cannot access secret boards. The board must be temporarily switched to public to extract image assets.</p>
            </div>
            <div className="space-y-1">
              <strong>Respect Original Creators:</strong>
              <p>Downloaded images should be used for personal visual study, inspiration boards, and non-commercial references. Always credit original artists and photographers.</p>
            </div>
            <div className="space-y-1">
              <strong>Zero Server Storage:</strong>
              <p>PintSave does not store, archive, or cache any images on its servers. All downloads are real-time streams directly from official content delivery networks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. IMAGE SPECIFIC FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="brand">FREQUENTLY ASKED QUESTIONS</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Pinterest Image Downloader FAQ
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            Clear answers about photo resolution, carousel sets, printing formats, and image file types.
          </p>
        </div>

        <div className="space-y-4">
          {IMAGE_FAQS.map((faq, idx) => (
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
          title="Ready to Save Pinterest Photos in Original 4K?"
          description="Bypass thumbnail compression and download high-DPI original images and carousels directly to your device in seconds."
          buttonText="Try PintSave Downloader Now"
          href="/"
        />
      </div>
    </div>
  );
}
