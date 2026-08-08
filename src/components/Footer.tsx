'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/providers/language-provider';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white dark:bg-stone-950 border-t border-stone-200/80 dark:border-stone-800/80 py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-100 dark:border-stone-900">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg overflow-hidden shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform shrink-0 border border-stone-200 dark:border-stone-800">
                <Image src="/icon.png" alt="PintSave Logo" width={32} height={32} className="w-full h-full object-cover" unoptimized />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-stone-900 dark:text-white">
                Pint<span className="text-brand-500">Save</span>
              </span>
            </Link>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              {t('footer_desc', 'PintSave is the fastest free tool for saving Pinterest videos, 4K images, and GIFs in original HD quality.')}
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white">
              {t('footer_quick_links', 'Downloader Tools')}
            </h4>
            <ul className="space-y-2 text-xs font-medium text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/pinterest-video-downloader" className="hover:text-brand-500 transition-colors">
                  {t('nav_video', 'Pinterest Video Downloader')}
                </Link>
              </li>
              <li>
                <Link href="/pinterest-image-downloader" className="hover:text-brand-500 transition-colors">
                  {t('nav_image', 'Pinterest Image Downloader')}
                </Link>
              </li>
              <li>
                <Link href="/pinterest-gif-downloader" className="hover:text-brand-500 transition-colors">
                  {t('nav_gif', 'Pinterest GIF Downloader')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white">
              {t('nav_blog', 'Blog')} & {t('nav_faq', 'FAQ')}
            </h4>
            <ul className="space-y-2 text-xs font-medium text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/blog" className="hover:text-brand-500 transition-colors">
                  {t('nav_blog', 'Blog')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-500 transition-colors">
                  {t('nav_about', 'About Us')}
                </Link>
              </li>
              <li>
                <Link href="/contacts-us" className="hover:text-brand-500 transition-colors">
                  {t('nav_contact', 'Contact')}
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-brand-500 transition-colors">
                  {t('nav_faq', 'FAQ')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white">
              {t('footer_legal', 'Legal Compliance')}
            </h4>
            <ul className="space-y-2 text-xs font-medium text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/privacy-policy" className="hover:text-brand-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-brand-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-brand-500 transition-colors">
                  DMCA Copyright Takedown
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
          <p>© {new Date().getFullYear()} PintSave. {t('footer_rights', 'All rights reserved. PintSave is not affiliated with Pinterest.')}</p>
          <p className="flex items-center gap-1.5 font-medium">
            <span>Made by</span>
            <span className="font-bold text-stone-900 dark:text-white hover:text-brand-500 transition-colors">
              NexaForce
            </span>
            <span className="text-stone-400 dark:text-stone-600">•</span>
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for creators worldwide
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
