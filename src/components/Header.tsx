'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/providers/theme-provider';
import { Download, Moon, Sun, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark' || theme === 'dark';

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-stone-950/80 border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Download className="w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-xl tracking-tight text-stone-900 dark:text-white">
              Pint<span className="text-brand-500">Save</span>
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-500 border border-brand-200 dark:border-brand-500/20">
              HD Media
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
          <Link href="/pinterest-video-downloader" className="hover:text-brand-500 transition-colors">
            Video
          </Link>
          <Link href="/pinterest-image-downloader" className="hover:text-brand-500 transition-colors">
            Image
          </Link>
          <Link href="/pinterest-gif-downloader" className="hover:text-brand-500 transition-colors">
            GIF
          </Link>
          <Link href="/blog" className="hover:text-brand-500 transition-colors">
            Blog
          </Link>
          <Link href="/about" className="hover:text-brand-500 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-brand-500 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle Dark Mode"
            className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
          >
            {mounted && isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link href="/#downloader">
            <Button size="sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fast Save</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
