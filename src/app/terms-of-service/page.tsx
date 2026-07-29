import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShieldCheck, AlertTriangle, Scale, CheckCircle2, Lock, Gavel, HelpCircle, Mail, Ban } from 'lucide-react';
import CTABanner from '@/components/CTABanner';

export const metadata: Metadata = {
  title: 'PintSave Terms and Conditions — Official Terms of Service & Usage Policy',
  description:
    'Read the official Terms and Conditions governing your use of PintSave. Understand acceptable personal use rules, DMCA guidelines, liability limits, and trademark disclaimers.',
  openGraph: {
    title: 'PintSave Terms and Conditions — Terms of Service & Usage Policy',
    description: 'PintSave Terms and Conditions detailing acceptable use policy, copyright compliance, and trademark disclaimers.',
    url: 'https://pintsave.app/terms-of-service',
  },
};

export default function TermsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'PintSave Terms and Conditions',
    description: 'Official Terms and Conditions and Terms of Service governing the use of PintSave web application.',
    url: 'https://pintsave.app/terms-of-service',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* DOCUMENT HEADER */}
      <div className="text-center sm:text-left space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider border border-brand-200 dark:border-brand-500/20">
          <FileText className="w-3.5 h-3.5" /> OFFICIAL LEGAL AGREEMENT
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          PintSave Terms and Conditions
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 flex flex-wrap items-center gap-2">
          <span>Last Revised & Updated: July 28, 2026</span>
          <span>•</span>
          <span>Effective Date: Immediate</span>
          <span>•</span>
          <span className="text-brand-500 font-semibold">Version 2.4</span>
        </p>
      </div>

      {/* DOCUMENT CONTENT CONTAINER */}
      <div className="bg-white dark:bg-stone-900 p-6 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-10 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">

        {/* SECTION 1: ACCEPTANCE OF TERMS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <CheckCircle2 className="w-5 h-5 text-brand-500" />
            1. Agreement & Acceptance of Terms
          </h2>
          <p>
            Welcome to <strong>PintSave</strong> (accessible from <code className="bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded text-stone-800 dark:text-stone-200">https://pintsave.app</code>). These Terms and Conditions govern your access to and use of the PintSave website, media extraction tools, APIs, and associated web services.
          </p>
          <p>
            By accessing, browsing, or using PintSave to process or download any media, you confirm that you have read, understood, and agree to be legally bound by these Terms and Conditions and our <Link href="/privacy-policy" className="text-brand-500 underline font-medium hover:text-brand-600">Privacy Policy</Link>. If you do not agree with any provision of these terms, you must immediately cease accessing and using our service.
          </p>
        </section>

        {/* SECTION 2: DESCRIPTION OF SERVICE */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <FileText className="w-5 h-5 text-brand-500" />
            2. Description of PintSave Service & Technical Scope
          </h2>
          <p>
            PintSave operates as an automated online media utility engine designed to parse publicly available Pinterest URLs and resolve direct links to uncompressed master photos, high-bitrate MP4 videos, and animated GIFs for personal offline reference, study, and moodboarding.
          </p>
          <p>
            PintSave functions strictly as a real-time pass-through proxy. <strong>PintSave does not host, store, copy, upload, or re-transmit media files on internal server databases.</strong> All extracted media streams originate directly from Pinterest's public Content Delivery Network (CDN) servers to your device browser.
          </p>
        </section>

        {/* SECTION 3: ELIGIBILITY */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Lock className="w-5 h-5 text-brand-500" />
            3. User Eligibility & Compliance
          </h2>
          <p>
            You must be at least 13 years of age (or the minimum legal age of digital consent in your jurisdiction) to use PintSave. By using this service, you warrant that you have the legal capacity to enter into a binding agreement and that your use of PintSave complies with all applicable local, national, and international laws.
          </p>
        </section>

        {/* SECTION 4: ACCEPTABLE USE POLICY */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Ban className="w-5 h-5 text-brand-500" />
            4. Acceptable Use Policy & Prohibited Activities
          </h2>
          <p>
            PintSave is provided strictly for personal, non-commercial, educational, and backup reference purposes. When using PintSave, you explicitly agree <strong>NOT</strong> to engaging in any of the following prohibited conduct:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
              <h3 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2 text-rose-500">
                <AlertTriangle className="w-4 h-4 shrink-0" /> Commercial Exploitation
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                You may not re-sell, re-license, rent, or commercially exploit downloaded media without express written permission or licensing from the original copyright owner.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
              <h3 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2 text-rose-500">
                <AlertTriangle className="w-4 h-4 shrink-0" /> Automated Bot Abuse
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                You may not use scrapers, spiders, automated bots, or rate-limit bypassing scripts to execute mass batch requests against PintSave infrastructure.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
              <h3 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2 text-rose-500">
                <AlertTriangle className="w-4 h-4 shrink-0" /> Copyright Infringement
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                You may not use PintSave to download, modify, or redistribute copyrighted artwork or videos in violation of applicable copyright laws.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
              <h3 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2 text-rose-500">
                <AlertTriangle className="w-4 h-4 shrink-0" /> Infrastructure Tampering
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                You may not attempt to probe, scan, test vulnerabilities, or inject malicious code payloads into PintSave server networks.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: INTELLECTUAL PROPERTY & CONTENT OWNERSHIP */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Scale className="w-5 h-5 text-brand-500" />
            5. Intellectual Property Rights & Content Ownership
          </h2>
          <p>
            PintSave does not claim any ownership, copyright, or intellectual property rights over media files processed through our application. All photos, artwork, video clips, reels, and GIFs remain the exclusive property of their respective original creators, photographers, artists, or copyright holders.
          </p>
          <p>
            Users are solely responsible for verifying that their download and usage of media complies with Fair Use doctrines, creative commons licenses, or explicit creator permissions.
          </p>
        </section>

        {/* SECTION 6: TRADEMARK DISCLAIMER */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-brand-500" />
            6. Trademark Disclaimer & Independent Operational Status
          </h2>
          <p className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-950 dark:text-amber-200 text-sm leading-relaxed">
            <strong>Official Trademark Notice:</strong> PintSave is an independent web utility software tool. PintSave is <strong>not affiliated with, associated with, authorized, sponsored, endorsed by, or in any way officially connected to Pinterest, Inc.</strong> or any of its subsidiaries or affiliates. The official Pinterest platform is located at <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" className="text-brand-500 font-bold underline">https://www.pinterest.com</a>. "Pinterest" and associated logos are registered trademarks owned by Pinterest, Inc.
          </p>
        </section>

        {/* SECTION 7: DMCA COPYRIGHT TAKEDOWN POLICY */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Gavel className="w-5 h-5 text-brand-500" />
            7. DMCA Copyright Compliance & Takedown Notices
          </h2>
          <p>
            PintSave respects copyright law and complies fully with the Digital Millennium Copyright Act (DMCA). Because PintSave does not store media files on internal servers, media content originates from Pinterest. However, if you are a copyright owner and wish to request blocklisting of specific public URL parsing routes, please send a written takedown notice to our Designated Copyright Agent containing:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-sm">
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Exact URL(s) on Pinterest associated with the content.</li>
            <li>Your physical or electronic signature, contact email, and telephone number.</li>
            <li>A statement confirming your good-faith belief that use of the material is unauthorized.</li>
          </ul>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Submit copyright notices via email to: <a href="mailto:dmca@pintsave.app" className="text-brand-500 font-semibold hover:underline">dmca@pintsave.app</a> or through our <Link href="/dmca" className="text-brand-500 underline">DMCA Policy Page</Link>.
          </p>
        </section>

        {/* SECTION 8: DISCLAIMER OF WARRANTIES */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <AlertTriangle className="w-5 h-5 text-brand-500" />
            8. Disclaimer of Warranties ("As-Is" & "As-Available")
          </h2>
          <p>
            PintSave is provided on an <strong>"AS IS" and "AS AVAILABLE" basis</strong> without warranties of any kind, whether express, implied, statutory, or otherwise. To the fullest extent permissible under applicable law, PintSave disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, and uninterrupted site access.
          </p>
          <p className="text-sm">
            We do not warrant that media parsing will be error-free, that server downtime will not occur, or that Pinterest CDN changes will not temporarily affect link extraction results.
          </p>
        </section>

        {/* SECTION 9: LIMITATION OF LIABILITY */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Scale className="w-5 h-5 text-brand-500" />
            9. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by governing law, PintSave, its developers, operators, hosting providers, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages—including lost profits, data loss, device corruption, or copyright disputes—arising out of or related to your access to, use of, or inability to use PintSave.
          </p>
        </section>

        {/* SECTION 10: INDEMNIFICATION */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-brand-500" />
            10. Indemnification Clause
          </h2>
          <p>
            You agree to defend, indemnify, and hold harmless PintSave, its developers, and operators from and against any claims, liabilities, damages, losses, costs, or legal expenses (including reasonable attorney fees) arising out of your violation of these Terms, your misuse of PintSave, or your infringement of any third-party intellectual property right.
          </p>
        </section>

        {/* SECTION 11: SERVICE MODIFICATIONS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <FileText className="w-5 h-5 text-brand-500" />
            11. Service Modifications & Terms Revision
          </h2>
          <p>
            We reserve the right to modify, suspend, or discontinue any aspect of PintSave at any time without prior notice. We also reserve the right to revise these Terms and Conditions periodically. Continued use of PintSave following posted updates constitutes full acceptance of revised terms.
          </p>
        </section>

        {/* SECTION 12: GOVERNING LAW */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Gavel className="w-5 h-5 text-brand-500" />
            12. Governing Law & Dispute Resolution
          </h2>
          <p>
            These Terms and Conditions shall be governed by and construed in accordance with standard legal principles. Any legal dispute or claim arising out of these terms shall be resolved through good-faith negotiation or competent informal dispute resolution channels.
          </p>
        </section>

        {/* SECTION 13: CONTACT & LEGAL ENQUIRIES */}
        <section className="p-6 rounded-2xl bg-brand-50/50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 space-y-3">
          <h3 className="font-bold text-stone-900 dark:text-white flex items-center gap-2 text-base">
            <Mail className="w-5 h-5 text-brand-500" /> Contact Our Legal & Support Team
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            If you have questions regarding these Terms and Conditions or require legal clarification, please submit a query via our <Link href="/contacts-us" className="text-brand-500 font-semibold underline">Contact Form</Link> or email our support desk at:
          </p>
          <div className="pt-1">
            <a 
              href="mailto:nexaforce1@gmail.com" 
              className="inline-flex items-center gap-2 font-mono text-sm text-brand-600 dark:text-brand-400 font-bold bg-white dark:bg-stone-800 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm hover:border-brand-400 transition"
            >
              <Mail className="w-4 h-4 text-brand-500" />nexaforce1@gmail.com
            </a>
          </div>
        </section>

      </div>

      {/* CLOSING CTA BANNER */}
      <CTABanner
        title="Ready to Download Pinterest Media in Full HD?"
        description="Try PintSave today—fast, 100% free, watermark-free, and adhering to strict privacy and fair use principles."
        buttonText="Try PintSave Downloader Now"
      />
    </div>
  );
}
