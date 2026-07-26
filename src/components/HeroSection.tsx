'use client';

import { useState } from 'react';
import { Sparkles, ShieldCheck, Zap, Loader2, Play, FileVideo, Image as ImageIcon, Film, Layers } from 'lucide-react';
import DownloaderForm from './DownloaderForm';
import { Badge } from './ui/badge';
import { MediaResult } from '@/lib/api';

interface HeroSectionProps {
  badgeText?: string;
  title?: React.ReactNode;
  description?: string;
  placeholder?: string;
  previewImage?: string;
}

export default function HeroSection({
  badgeText = '100% Free · No Signup',
  title = (
    <>
      Save any <span className="text-brand-500 underline decoration-brand-200 dark:decoration-brand-900">Pinterest pin</span> in high definition.
    </>
  ),
  description = 'Directly extract uncompressed original photos, high-bitrate MP4 videos, and animated GIFs without quality loss or watermarks.',
  placeholder = 'Paste Pinterest link here (e.g. https://pin.it/...)',
  previewImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
}: HeroSectionProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MediaResult | null>(null);

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline & Form */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand">
              <Sparkles className="w-3.5 h-3.5" /> {badgeText}
            </Badge>
            <Badge variant="secondary">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Original 4K HD
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-[1.1]">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-xl font-normal leading-relaxed">
            {description}
          </p>

          <div className="pt-2">
            <DownloaderForm 
              placeholder={placeholder} 
              onLoadingChange={setLoading}
              onResultChange={setResult}
            />
          </div>
        </div>

        {/* Right Column: Visual Mockup / Live Preview Card */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="relative rounded-3xl bg-gradient-to-tr from-brand-500/10 via-stone-100 to-transparent dark:from-brand-500/10 dark:via-stone-900 dark:to-transparent p-6 border border-stone-200/80 dark:border-stone-800 shadow-2xl">
            <div className="rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <Badge variant="mono">
                  {loading ? 'EXTRACTING...' : result ? 'READY TO DOWNLOAD' : 'LIVE PREVIEW'}
                </Badge>
              </div>

              <div className="h-64 rounded-xl bg-stone-100 dark:bg-stone-800 relative overflow-hidden flex items-center justify-center">
                {loading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-50 dark:bg-stone-900 gap-3 animate-pulse">
                    <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Extracting media links...</span>
                  </div>
                ) : result ? (
                  <>
                    <img
                      src={result.thumbnail || result.mediaUrl}
                      alt={result.title || 'Pinterest Pin Preview'}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    
                    {/* Video Play Overlay */}
                    {result.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-white/95 dark:bg-stone-900/95 shadow-md flex items-center justify-center text-stone-950 dark:text-white">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                      <span className="text-white text-xs font-bold truncate w-full mb-1">
                        {result.title || 'Pinterest Media Pin'}
                      </span>
                      <div className="text-white/80 text-[10px] font-semibold flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-brand-500" />
                        <span>Uncompressed Original Resolution</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={previewImage}
                      alt="Pinterest Pin Preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                      <div className="text-white text-xs font-semibold flex items-center gap-2">
                        <Zap className="w-4 h-4 text-brand-500" />
                        <span>Uncompressed Original Resolution</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-mono">
                <span>
                  {loading ? 'FORMAT: DETECTING...' : result ? `FORMAT: ${result.type?.toUpperCase()}` : 'FORMAT: MP4 / JPG / GIF'}
                </span>
                {result ? (
                  <span className="text-brand-500 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 animate-bounce" /> READY
                  </span>
                ) : (
                  <span className="text-emerald-500 font-bold">✓ 100% WATERMARK FREE</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
