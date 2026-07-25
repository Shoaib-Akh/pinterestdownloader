import { Zap, ShieldCheck, Smartphone, Sparkles } from 'lucide-react';
import { BentoGrid, BentoCard } from './ui/bento-grid';
import { Badge } from './ui/badge';

export default function FeaturesBento() {
  return (
    <section id="features" className="py-20 bg-stone-50/50 dark:bg-stone-900/30 border-y border-stone-200/80 dark:border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="brand">ENGINEERING EXCELLENCE</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Designed for <span className="text-brand-500">Unrestricted HD Saving</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg">
            High performance Pinterest extraction built for creators, designers, and curators.
          </p>
        </div>

        <BentoGrid>
          {/* Card 1: Large 2-column card */}
          <BentoCard colSpan={2} rowSpan={1}>
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <Badge variant="success">UNDER 1.0 SEC</Badge>
            </div>
            <div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-white mb-1">
                Sub-Second Media Resolution
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 max-w-lg">
                Queries Pinterest internal PinResource API & Redis cache layer directly to resolve CDN URLs instantly.
              </p>
            </div>
          </BentoCard>

          {/* Card 2: 1-column card */}
          <BentoCard colSpan={1} rowSpan={1}>
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-1">
                Universal Mobile Support
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Saves directly to iOS Camera Roll or Android Gallery.
              </p>
            </div>
          </BentoCard>

          {/* Card 3: 1-column card */}
          <BentoCard colSpan={1} rowSpan={1}>
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-1">
                100% Original 4K Photos
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Auto-upgrades 736x thumbnails to /originals/ source files.
              </p>
            </div>
          </BentoCard>

          {/* Card 4: 2-column wide card */}
          <BentoCard colSpan={2} rowSpan={1}>
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-500 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <Badge variant="mono">ANONYMOUS</Badge>
            </div>
            <div>
              <h3 className="font-bold text-xl text-stone-900 dark:text-white mb-1">
                100% Anonymous & Private
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 max-w-lg">
                No browser extension installation, user tracking cookies, or account signups required.
              </p>
            </div>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  );
}
