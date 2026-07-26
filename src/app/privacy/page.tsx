import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — PintSave',
  description:
    'Read PintSave’s Privacy Policy to understand how we protect user privacy, minimize data collection, enforce GDPR compliance, and handle cookies.',
  openGraph: {
    title: 'Privacy Policy — PintSave',
    description: 'PintSave Privacy Policy detailing transparent data practices and user rights.',
    url: 'https://pintsave.app/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
      {/* Title */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-brand-200 dark:border-brand-500/20">
          <ShieldCheck className="w-3.5 h-3.5" /> Legal & Transparency
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Last updated: July 2026 • Effective immediately
        </p>
      </div>

      {/* Document Card */}
      <div className="bg-white dark:bg-stone-900 p-6 sm:p-10 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-8 text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-500" />
            1. Overview
          </h2>
          <p>
            At PintSave (accessible from https://pintsave.app), protecting our visitors&apos; privacy is one of our highest priorities. This Privacy Policy document outlines the types of information collected and recorded by PintSave and how we use it.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">2. Information We Collect</h2>
          <p>
            We adhere to strict data minimization principles. We do not require account registration, names, phone numbers, or payment credentials to use PintSave.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Anonymized Technical Logs:</strong> When you execute a download request, our servers automatically log non-identifiable metrics including request timestamps, requested media format (image/video/gif), browser user-agent header, and an encrypted IP hash used exclusively to prevent server DDoS abuse.
            </li>
            <li>
              <strong>Contact Form Data:</strong> If you submit a inquiry via our <Link href="/contact" className="text-brand-500 underline">Contact Form</Link>, we store your name, email address, and message solely to respond to your support request.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">3. Data Retention Policy</h2>
          <p>
            Anonymized download log entries and IP hashes are automatically purged every 30 days. Support tickets and contact records are retained for up to 90 days following issue resolution, after which they are permanently deleted.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">4. Cookies and Web Analytics</h2>
          <p>
            PintSave uses minimal cookies to store interface state preferences (such as dark mode vs light mode theme choice). We may utilize privacy-friendly web analytics tools (such as Google Analytics or Cloudflare Web Analytics) to measure global traffic trends. These tools use aggregated, anonymized metrics without tracking personal cross-site identities.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">5. Third-Party Services & Links</h2>
          <p>
            Our web application processes public Pinterest links. PintSave does not store, host, or re-broadcast media content on internal servers; all media streams originate directly from Pinterest CDN infrastructure. We are not responsible for the privacy practices of third-party external sites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">6. Your Rights under GDPR & CCPA</h2>
          <p>
            Under global data privacy laws (including GDPR and CCPA), you have the right to request:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Confirmation of whether any personal data concerning you is processed.</li>
            <li>Erasure of any support messages or submitted contact records.</li>
            <li>Objection to any processing based on legitimate interest.</li>
          </ul>
        </section>

        <section className="p-5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-2">
          <h3 className="font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-500" /> Privacy Enquiries
          </h3>
          <p className="text-xs">
            If you have questions about this Privacy Policy or wish to exercise your data rights, please contact our Data Protection Officer at: <a href="mailto:privacy@pintsave.app" className="text-brand-500 font-semibold hover:underline">privacy@pintsave.app</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
