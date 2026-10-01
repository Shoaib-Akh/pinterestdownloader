import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, Mail, MessageSquare } from 'lucide-react';
import { getFAQs, FAQItem } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CTABanner from '@/components/CTABanner';
import FAQInteractive from '@/components/FAQInteractive';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) — PintSave Support',
  description:
    'Comprehensive answers to common questions about downloading Pinterest videos in 1080p Full HD, original 4K images, and animated GIFs with PintSave.',
  alternates: {
    canonical: 'https://pintsave.site/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) — PintSave Support',
    description:
      'Answers to common questions about downloading Pinterest videos, 4K images, and GIFs with PintSave.',
    url: 'https://pintsave.site/faq',
  },
};

export default async function FAQPage() {
  const faqs: FAQItem[] = await getFAQs();

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f: FAQItem) => ({
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Downloader</span>
            </Button>
          </Link>
          <Badge variant="brand">SUPPORT & HELP CENTER</Badge>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
            Everything you need to know about downloading Pinterest videos in 1080p, original 4K resolution photos, and animated GIFs with PintSave.
          </p>
        </div>

        {/* Interactive FAQ with Server-Side Pre-Rendered Content */}
        <FAQInteractive initialFaqs={faqs} />

        {/* Noscript fallback for search engine crawlers without JavaScript */}
        <noscript>
          <div className="space-y-6 pt-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                <h3 className="font-bold text-lg text-stone-900 dark:text-white">{faq.question}</h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </noscript>

        {/* Additional Help & Support Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                <HelpCircle className="w-5 h-5 text-brand-500" />
                Still have questions or need assistance?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                Our support team is available 24/7 to help resolve broken pin links and answer technical questions.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contacts-us">
                <Button size="md" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Support</span>
                </Button>
              </Link>
              <a
                href="mailto:support@pintsave.site"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-brand-500 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 transition"
              >
                <Mail className="w-4 h-4 text-brand-500" />
                support@pintsave.site
              </a>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <CTABanner
          title="Ready to Download Pinterest Media in HD?"
          description="Try PintSave today—fast, 100% free, watermark-free, and no registration required."
          buttonText="Try PintSave Downloader Now"
          href="/"
        />
      </div>
    </>
  );
}
