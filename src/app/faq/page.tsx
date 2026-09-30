import type { Metadata } from 'next';
import Link from 'next/link';
import { getFAQs } from '@/lib/api';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — PintSave Pinterest Downloader',
  description:
    'Find answers to the most common questions about downloading Pinterest videos, images, and GIFs with PintSave — free, no signup, HD quality.',
  alternates: {
    canonical: 'https://pintsave.site/faq',
  },
  openGraph: {
    title: 'FAQ — PintSave Pinterest Downloader',
    description:
      'Answers to common questions about how PintSave works, supported file types, privacy, and more.',
    url: 'https://pintsave.site/faq',
  },
};

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order?: number;
}

export default async function FAQPage() {
  const rawFaqs = (await getFAQs()) || [];
  const faqs: FAQItem[] = rawFaqs as FAQItem[];

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
            Everything you need to know about downloading Pinterest videos, photos, and GIFs with PintSave.
          </p>
        </div>

        {/* Interactive accordion (client component) pre-seeded with server-fetched data */}
        <FAQAccordion initialFaqs={faqs} />

        {/* Static full-text block — visible to crawlers even if JS is disabled */}
        <section className="sr-only" aria-hidden="false">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
