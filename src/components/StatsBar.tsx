'use client';

import { useEffect, useState } from 'react';
import { Zap, ShieldCheck } from 'lucide-react';
import { getPublicStats } from '@/lib/api';

const PLACEHOLDER_TOTAL = 15420;
const PLACEHOLDER_TODAY = 342;

export default function StatsBar() {
  const [stats, setStats] = useState<{
    totalDownloads: number;
    todayDownloads: number;
    supportedTypes: string[];
  } | null>(null);

  useEffect(() => {
    getPublicStats().then((res) => {
      if (
        res &&
        // Only show real stats — hide if API returned the hardcoded placeholders
        !(res.totalDownloads === PLACEHOLDER_TOTAL && res.todayDownloads === PLACEHOLDER_TODAY)
      ) {
        setStats(res);
      }
    });
  }, []);

  // Don't render anything if stats are not available or still placeholder
  if (!stats) return null;

  return (
    <div className="w-full border-y border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-stone-500 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider">
              <span>Total Downloads</span>
            </div>
            <p className="font-extrabold text-2xl sm:text-3xl text-stone-900 dark:text-white font-mono">
              {stats.totalDownloads.toLocaleString()}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-stone-500 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider">
              <span>Downloads Today</span>
            </div>
            <p className="font-extrabold text-2xl sm:text-3xl text-stone-900 dark:text-white font-mono">
              {stats.todayDownloads.toLocaleString()}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-stone-500 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span>Speed</span>
            </div>
            <p className="font-extrabold text-2xl sm:text-3xl text-stone-900 dark:text-white font-mono">
              &lt; 1.0s
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-stone-500 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-brand-500" />
              <span>Security</span>
            </div>
            <p className="font-extrabold text-2xl sm:text-3xl text-stone-900 dark:text-white">
              100% Safe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
