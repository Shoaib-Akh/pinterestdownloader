'use client';

import Image from 'next/image';
import CTABanner from '@/components/CTABanner';

export default function AboutPage() {
  // Static content – no i18n needed for the fix
  const authorImg = '/icon.png'; // placeholder logo, replace with real photo if available
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
      {/* HERO SECTION */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider border border-brand-200 dark:border-brand-500/20">
          OUR MISSION & STORY
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-tight">
          Empowering Visual Creativity with PintSave
        </h1>
        <p className="text-base sm:text-xl text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
          PintSave was built from the ground up to give creators, artists, designers, and visual researchers instant access to uncompressed Pinterest photos, HD videos, and animated GIFs—100 % free, no sign‑up required.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-stone-600 dark:text-stone-300">
          <span className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-full">
            100% Free Forever
          </span>
          <span className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-full">
            No Registration Required
          </span>
          <span className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-full">
            Original 4K HD & 1080p MP4
          </span>
        </div>
      </section>

      {/* AUTHOR BIO & MISSION */}
      <section className="bg-white dark:bg-stone-900 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <Image src={authorImg} alt="Founder" width={200} height={200} className="rounded-full" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Meet the Founder & Engineering Team
            </h2>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm sm:text-base">
              PintSave was created by Alex Rivera and a dedicated team of open-source software engineers and creative visual artists who were frustrated by the lack of clean, privacy-conscious Pinterest media tools. Most legacy download utilities on the web are riddled with deceptive advertisements, intrusive popunder redirects, mandatory email registrations, and artificial speed throttles that degrade video and image quality.
            </p>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm sm:text-base">
              After developing internal media extraction tools for digital agencies, moodboard curators, and video editors, our team released PintSave to the public. Our mission is unwavering: empower every visual creator, student, researcher, and educator worldwide with instant access to original-resolution digital media without compromise.
            </p>
          </div>
        </div>

        {/* CORE VALUES GRID */}
        <div className="border-t border-stone-200 dark:border-stone-800 pt-8 mt-6">
          <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-6">
            Our Guiding Principles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-2">
              <h4 className="font-bold text-stone-900 dark:text-white text-base">Original Quality Fidelity</h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                We refuse to downscale, compress, or overlay destructive watermarks. You receive the exact master file uploaded by the original creator.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-2">
              <h4 className="font-bold text-stone-900 dark:text-white text-base">Uncompromising User Privacy</h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                We never log user IP addresses or maintain databases of user downloads. All requests stream transiently through memory and are immediately cleared.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-2">
              <h4 className="font-bold text-stone-900 dark:text-white text-base">Free & Accessible For All</h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                We believe creative resources should be democratic. PintSave has zero subscription tiers, hidden costs, or restricted download limits.
              </p>
            </div>
          </div>
        </div>

        {/* TECHNICAL ARCHITECTURE */}
        <div className="border-t border-stone-200 dark:border-stone-800 pt-8 mt-6 space-y-4">
          <h3 className="text-xl font-bold text-stone-900 dark:text-white">
            Edge-Optimized Infrastructure
          </h3>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            PintSave runs on a globally distributed serverless edge network. When a link is submitted, our parsing microservices communicate directly with Pinterest CDN endpoints to resolve the direct master media stream in under one second. Because media streams directly from official content delivery networks to your browser, transfer speeds are lightning-fast with zero intermediary disk storage.
          </p>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
            Whether you need a 1080p MP4 clip for a video presentation, a 4K photograph for moodboard printing, or a 60fps animated GIF for Discord or Slack, PintSave handles the heavy lifting seamlessly.
          </p>
        </div>
      </section>

      {/* CLOSING CTA BANNER */}
      <CTABanner
        title="Ready to Save Pinterest Media in Uncompressed HD?"
        description="Try PintSave today—fast, 100% free, watermark‑free, and no account required."
        buttonText="Try PintSave Downloader Now"
        href="/"
      />
    </div>
  );
}
