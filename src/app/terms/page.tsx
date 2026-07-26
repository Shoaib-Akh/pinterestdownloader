import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, AlertTriangle, Scale, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — PintSave',
  description:
    'Read the Terms of Service governing your use of PintSave. Understand fair personal usage rules, liability limits, and trademark disclaimers.',
  openGraph: {
    title: 'Terms of Service — PintSave',
    description: 'PintSave Terms of Service and Acceptable Use Policy.',
    url: 'https://pintsave.app/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
      {/* Title */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-brand-200 dark:border-brand-500/20">
          <FileText className="w-3.5 h-3.5" /> Terms & Conditions
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Last updated: July 2026 • Please read carefully before using PintSave
        </p>
      </div>

      {/* Document Card */}
      <div className="bg-white dark:bg-stone-900 p-6 sm:p-10 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-8 text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-500" />
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the PintSave website (https://pintsave.app) and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue use of the service immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">2. Description of Service</h2>
          <p>
            PintSave provides an automated online tool that allows users to parse and download publicly accessible media files (including photos, MP4 video streams, and animated GIFs) from Pinterest URLs for personal offline access and reference.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">3. Acceptable Use Policy</h2>
          <p>
            PintSave is intended solely for personal, non-commercial educational, inspirational, and backup purposes.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              You agree not to use PintSave to infringe upon the copyright, trademark, or intellectual property rights of content creators.
            </li>
            <li>
              You agree not to re-sell, re-license, or commercially redistribute downloaded media without explicit consent from original creators.
            </li>
            <li>
              You agree not to perform automated scrape requests, rate-limit bypassing, or malicious attack payloads against PintSave infrastructure.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">4. Intellectual Property & Disclaimer</h2>
          <p>
            PintSave is an independent web application. We are <strong>not endorsed, sponsored, affiliated, or associated with Pinterest, Inc.</strong> Pinterest is a registered trademark of Pinterest, Inc. All trademarks belong to their respective owners.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">5. Limitation of Liability</h2>
          <p>
            PintSave is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, whether express or implied. PintSave, its developers, and operators shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">6. Changes to Terms</h2>
          <p>
            We reserve the right to revise or update these Terms of Service at any time without prior notice. Continued use of the website following changes constitutes acceptance of updated terms.
          </p>
        </section>

        <section className="p-5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-2">
          <h3 className="font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-brand-500" /> Governing Law & Support Contact
          </h3>
          <p className="text-xs">
            These Terms shall be governed by and construed in accordance with applicable laws. For questions or legal notices, please visit our <Link href="/contact" className="text-brand-500 underline">Contact Page</Link> or email <a href="mailto:support@pintsave.app" className="text-brand-500 underline">support@pintsave.app</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
