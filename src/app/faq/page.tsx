'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ArrowLeft } from 'lucide-react';
import { getFAQs } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order?: number;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [search, setSearch] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    getFAQs().then((res) => {
      if (res && Array.isArray(res)) setFaqs(res);
    });
  }, []);

  const filteredFaqs = faqs.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Downloader</span>
            </Button>
          </Link>
          <Badge variant="brand">SUPPORT CENTER</Badge>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg">
            Everything you need to know about downloading Pinterest videos, photos, and GIFs with PinFlow.
          </p>

          <div className="pt-4">
            <Input
              type="text"
              placeholder="Search questions (e.g. iPhone, MP4, legal)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => (
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
            ))
          ) : (
            <div className="text-center py-12 text-stone-500 dark:text-stone-400">
              No matching questions found for &quot;{search}&quot;.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
