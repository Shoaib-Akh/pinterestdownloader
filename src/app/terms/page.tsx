import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, AlertTriangle, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — PinFlow',
  description:
    'Read the Terms of Service governing your use of PinFlow. Understand fair personal usage rules, liability limits, and trademark disclaimers.',
  openGraph: {
    title: 'Terms of Service — PinFlow',
    description: 'PinFlow Terms of Service and Acceptable Use Policy.',
    url: 'https://pinflow.app/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
      {/* Title */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-brand-200 dark:border-brand-500/20">
          <FileText className="w-3.5 h-3.5" /> Service Agreement
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Last updated: July 2026 • Please read carefully before using PinFlow
        </p>
      </div>

      {/* Document Card */}
      <div className="bg-white dark:bg-stone-900 p-6 sm:p-10 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-8 text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-brand-500" />
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the PinFlow website (https://pinflow.app) and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue use of the service immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">2. Description of Service</h2>
          <p>
            PinFlow provides an automated online tool that allows users to parse and download publicly accessible media files (including photos, MP4 video streams, and animated GIFs) from Pinterest URLs for personal offline access and reference.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">3. Acceptable Personal Use</h2>
          <p>
            PinFlow is intended solely for personal, non-commercial educational, inspirational, and backup purposes.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              You agree not to use PinFlow to infringe upon the copyright, trademark, or intellectual property rights of content creators.
            </li>
            <li>
              You agree not to commercialize, re-sell, license, or re-distribute downloaded media files without proper authorization from original copyright holders.
            </li>
            <li>
              You agree not to perform automated scrape requests, rate-limit bypassing, or malicious attack payloads against PinFlow infrastructure.
            </li>
          </ul>
        </section>

        <section className="space-y-3 p-5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-900 dark:text-amber-200">
          <h3 className="font-bold flex items-center gap-2 text-stone-900 dark:text-white text-base">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            4. Trademark Disclaimer
          </h3>
          <p className="text-xs leading-relaxed mt-1">
            PinFlow is an independent web application. We are <strong>not endorsed, sponsored, affiliated, or associated with Pinterest, Inc.</strong> Pinterest is a registered trademark of Pinterest, Inc. All trademarks belong to their respective owners.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">5. Limitation of Liability</h2>
          <p>
            PinFlow is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, whether express or implied. PinFlow, its developers, and operators shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">6. Termination & Rate Limits</h2>
          <p>
            We reserve the right to suspend or terminate access to any IP address or block automated bot traffic that violates these Terms of Service or degrades system performance for other users.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">7. Governing Law & Contact</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws. For questions or legal notices, please visit our <Link href="/contact" className="text-brand-500 underline">Contact Page</Link> or email <a href="mailto:support@pinflow.app" className="text-brand-500 underline">support@pinflow.app</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
