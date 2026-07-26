'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { getFAQs } from '@/lib/api';
import { Button } from './ui/button';

export default function FAQPreview() {
  const [faqs, setFaqs] = useState<Array<{ id: string; question: string; answer: string }>>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    getFAQs().then((res) => {
      if (res && Array.isArray(res)) {
        setFaqs(res.slice(0, 3));
      }
    });
  }, []);

  return (
    <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
          Quick answers to common questions about saving media with PintSave.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={faq.id || idx}
            className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 overflow-hidden shadow-sm transition-all"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-6 text-left font-bold text-stone-900 dark:text-white flex items-center justify-between gap-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition"
            >
              <span className="text-base sm:text-lg">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${
                  openIdx === idx ? 'rotate-180 text-brand-500' : ''
                }`}
              />
            </button>
            {openIdx === idx && (
              <div className="p-6 pt-0 text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed border-t border-stone-100 dark:border-stone-800/50 mt-1">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <Link href="/faq">
          <Button variant="outline" size="md">
            <span>See all questions & answers</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
