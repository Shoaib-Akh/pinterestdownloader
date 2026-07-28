import { Zap, ShieldCheck, Smartphone, Sparkles } from 'lucide-react';
import { BentoGrid, BentoCard } from './ui/bento-grid';
import { Badge } from './ui/badge';

export default function FeaturesBento() {
  return (
    <section id="features" className="py-20 bg-stone-50/50 dark:bg-stone-900/30 border-y border-stone-200/80 dark:border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="brand">KEY FEATURES & ADVANTAGES</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Why Choose Our <span className="text-brand-500">Pinterest Downloader</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed">
            Built specifically to solve low-resolution downloads, slow speeds, and intrusive popups. Here is why creators, designers, and curators prefer PintSave.
          </p>
        </div>

        <BentoGrid>
          {/* Card 1: Large 2-column card */}
          <BentoCard colSpan={2} rowSpan={1}>
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <Badge variant="success">INSTANT EXTLECTION</Badge>
            </div>
            <div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-white mb-2">
                Sub-Second Direct Media Extraction
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 max-w-lg leading-relaxed">
                Our fast backend directly inspects Pinterest CDN metadata endpoints and bypasses rate limits. Get direct MP4 video URLs and image links in under one second without waiting in slow queue lines.
              </p>
            </div>
          </BentoCard>

          {/* Card 2: 1-column card */}
          <BentoCard colSpan={1} rowSpan={1}>
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-2">
                Universal iOS & Android Support
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Save media straight into your iPhone Camera Roll or Android Gallery. No app store installation or jailbreaking needed.
              </p>
            </div>
          </BentoCard>

          {/* Card 3: 1-column card */}
          <BentoCard colSpan={1} rowSpan={1}>
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-2">
                Uncompressed 4K Master Photos
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Automatically converts compressed 736px web thumbnails into the original high-resolution master file uploaded by creators.
              </p>
            </div>
          </BentoCard>

          {/* Card 4: 2-column wide card */}
          <BentoCard colSpan={2} rowSpan={1}>
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <Badge variant="mono">100% PRIVATE</Badge>
            </div>
            <div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-white mb-2">
                Watermark-Free & Completely Anonymous
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 max-w-lg leading-relaxed">
                We respect your personal privacy. Enjoy clean downloads without logos, brand overlays, account signups, or tracking cookies storing your download activity.
              </p>
            </div>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  );
}
