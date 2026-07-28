'use client';

import { useEffect, useState } from 'react';
import { DownloadCloud, Flame, ShieldCheck, Zap } from 'lucide-react';
import { getPublicStats } from '@/lib/api';

export default function StatsBar() {
  const [stats, setStats] = useState({
    totalDownloads: 15420,
    todayDownloads: 342,
    supportedTypes: ['image', 'video', 'gif', 'carousel'],
  });

  useEffect(() => {
    getPublicStats().then((res) => {
      if (res) setStats(res);
    });
  }, []);

  return (
    <div className="w-full border-y border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-stone-500 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider">
              <DownloadCloud className="w-4 h-4 text-brand-500" />
              <span>Total Downloads</span>
            </div>
            <p className="font-extrabold text-2xl sm:text-3xl text-stone-900 dark:text-white font-mono">
              {stats.totalDownloads.toLocaleString()}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-stone-500 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-amber-500" />
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
