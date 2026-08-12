'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';
import { Button } from './ui/button';

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(true); // default true to avoid flash on SSR

  useEffect(() => {
    const consent = localStorage.getItem('pintsave_cookie_consent');
    if (!consent) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('pintsave_cookie_consent', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" /> Cookie & Privacy Policy Notice
          </div>
          <button
            onClick={handleAccept}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
          We use cookies and Google AdSense to personalize content, analyze traffic, and provide a secure experience. By continuing to browse, you agree to our{' '}
          <Link href="/privacy-policy" className="text-brand-500 underline font-semibold">
            Privacy Policy
          </Link>.
        </p>

        <div className="flex items-center justify-end gap-2 pt-1">
          <Button size="sm" onClick={handleAccept} className="w-full sm:w-auto text-xs py-1.5 h-auto">
            Accept & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
