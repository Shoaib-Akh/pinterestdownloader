'use client';

import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order?: number;
}

interface FAQInteractiveProps {
  initialFaqs: FAQItem[];
}

export default function FAQInteractive({ initialFaqs }: FAQInteractiveProps) {
  const [search, setSearch] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filteredFaqs = initialFaqs.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="max-w-xl mx-auto">
        <Input
          type="text"
          placeholder="Search questions (e.g. iPhone, 4K, MP4, audio, copyright)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="w-5 h-5 text-stone-400" />}
          className="h-12 text-sm sm:text-base rounded-2xl bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800"
        />
      </div>

      <div className="space-y-4 pt-2">
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
                <div className="p-6 pt-0 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed border-t border-stone-100 dark:border-stone-800/50 mt-1">
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-stone-500 dark:text-stone-400">
            No matching questions found for &quot;{search}&quot;. Try searching for &quot;video&quot;, &quot;4K&quot;, or &quot;iPhone&quot;.
          </div>
        )}
      </div>
    </div>
  );
}
