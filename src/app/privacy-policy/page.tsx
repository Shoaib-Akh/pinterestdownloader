import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock, FileText, CheckCircle2, EyeOff, Server, Globe, Bell, Scale } from 'lucide-react';
import CTABanner from '@/components/CTABanner';

export const metadata: Metadata = {
  title: 'PintSave Privacy Policy — Comprehensive Data Protection & Privacy Rights',
  description:
    'Read PintSave’s Privacy Policy. Learn about our zero-log architecture, data minimization practices, GDPR & CCPA rights, and how we protect user privacy.',
  openGraph: {
    title: 'PintSave Privacy Policy — Data Protection & Privacy Rights',
    description: 'PintSave Privacy Policy detailing transparent data practices, zero-log architecture, and user rights.',
    url: 'https://pintsave.app/privacy-policy',
  },
};

export default function PrivacyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'PintSave Privacy Policy',
    description: 'Official Privacy Policy for PintSave, detailing data collection minimization, zero storage of media files, GDPR compliance, and CCPA privacy rights.',
    url: 'https://pintsave.app/privacy-policy',
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
          <ShieldCheck className="w-3.5 h-3.5" /> OFFICIAL LEGAL DOCUMENT
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          PintSave Privacy Policy
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
        
        {/* SECTION 1: INTRODUCTION */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Lock className="w-5 h-5 text-brand-500" />
            1. Introduction & Commitment to Privacy
          </h2>
          <p>
            At <strong>PintSave</strong> (accessible from <code className="bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded text-stone-800 dark:text-stone-200">https://pintsave.app</code>), we hold user privacy as a fundamental digital right. We operate under a strict policy of <strong>data minimization and user anonymity</strong>. Whether you access PintSave to download Pinterest videos, original 4K photos, or animated GIFs, we are dedicated to handling your interaction with complete transparency and security.
          </p>
          <p>
            This Privacy Policy document clearly explains what minimal information is processed when you use our web application, why it is processed, how it is safeguarded, and what legal privacy rights you possess under global regulations including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
          </p>
        </section>

        {/* SECTION 2: NO ACCOUNT & ZERO MEDIA RETENTION */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <EyeOff className="w-5 h-5 text-brand-500" />
            2. Principles of Zero Account Registration & Zero Media Storage
          </h2>
          <p>
            PintSave is engineered to function completely without requiring user accounts or personal login credentials.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
              <h3 className="font-bold text-stone-900 dark:text-white flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Account Signup Required
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                You never need to provide your full name, email address, password, or credit card information to use PintSave. All media downloads are 100% free and open to all visitors.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 space-y-2">
              <h3 className="font-bold text-stone-900 dark:text-white flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero Media Hosting or Storage
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                PintSave does not host, store, archive, or cache any Pinterest videos, images, or GIFs on our servers. All media extractions function as real-time pass-through proxies from Pinterest's public CDN endpoints straight to your device.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: INFORMATION WE AUTOMATICALLY COLLECT */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Server className="w-5 h-5 text-brand-500" />
            3. Information We Process Automatically (Server Technical Logs)
          </h2>
          <p>
            Like standard web infrastructure, our web servers automatically record temporary, non-identifiable technical log entries during server requests. This logging is strictly necessary for operational network health, rate-limiting, and anti-abuse security:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>IP Address Hash (Rate Limiting & Anti-DDoS):</strong> To prevent malicious automated bots and distributed denial-of-service (DDoS) attacks, our edge servers generate an encrypted, one-way cryptographic hash of your IP address. We do not store raw, un-hashed IP addresses in permanent databases.
            </li>
            <li>
              <strong>User-Agent & Device Metadata:</strong> We process standard HTTP User-Agent headers (e.g. browser type, OS version, device screen size) solely to format video download buttons correctly for your device (such as tailoring iOS Safari download prompts).
            </li>
            <li>
              <strong>Request Timestamps & Performance Metrics:</strong> Server latency metrics and HTTP status codes (e.g. 200 OK, 404 Not Found) are stored in temporary aggregate logs to monitor system uptime and fix broken media links.
            </li>
          </ul>
        </section>

        {/* SECTION 4: CONTACT FORM & COMMUNICATIONS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Mail className="w-5 h-5 text-brand-500" />
            4. User-Initiated Communications (Contact Form Submissions)
          </h2>
          <p>
            If you voluntarily reach out to us via our <Link href="/contacts-us" className="text-brand-500 underline font-medium hover:text-brand-600">Contact Form</Link> or send an email to our support team, we receive the information you choose to provide:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-sm">
            <li>Your name or alias</li>
            <li>Your email address</li>
            <li>The content of your message, feedback, or bug report</li>
          </ul>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            We use this information exclusively to address your inquiry or technical bug report. We never sell, rent, trade, or share contact submission data with third-party advertising brokers or email marketers.
          </p>
        </section>

        {/* SECTION 5: COOKIES, ADVERTISING & LOCAL STORAGE */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Globe className="w-5 h-5 text-brand-500" />
            5. Cookies, Google AdSense & Third-Party Advertising
          </h2>
          <p>
            PintSave uses cookies and browser <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-xs font-mono">localStorage</code> items to enhance site functionality and serve relevant advertisements:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Google AdSense & Third-Party Vendors:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to PintSave or other websites.
            </li>
            <li>
              <strong>Advertising Cookies:</strong> Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.
            </li>
            <li>
              <strong>Personalized Advertising Opt-Out:</strong> Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand-500 underline">Google Ads Settings</a> or by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-brand-500 underline">www.aboutads.info</a>.
            </li>
            <li>
              <strong>Functional Cookies:</strong> Stores user interface preferences such as Dark Mode / Light Mode theme settings and cookie consent acknowledgment.
            </li>
          </ul>
          <p className="text-sm">
            You can clear or block cookies at any time through your web browser security settings.
          </p>
        </section>

        {/* SECTION 6: ANALYTICS SERVICES */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <FileText className="w-5 h-5 text-brand-500" />
            6. Aggregated Web Analytics & Measuring Traffic
          </h2>
          <p>
            We may utilize privacy-friendly web analytics services (such as Google Analytics or Cloudflare Web Analytics) to analyze aggregate visitor metrics—such as total daily page views, country-level visitor distributions, and popular site pathways.
          </p>
          <p className="text-sm">
            These analytics tools operate on anonymized, aggregated datasets. They do not track individual cross-site identities, compile personal behavioral dossiers, or record your specific downloaded pin links.
          </p>
        </section>

        {/* SECTION 7: DATA RETENTION SCHEDULE */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Bell className="w-5 h-5 text-brand-500" />
            7. Data Retention & Destruction Schedule
          </h2>
          <p>
            We enforce strict retention expiration schedules to ensure data is not kept longer than necessary:
          </p>
          <div className="space-y-3 pt-1 text-sm">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800">
              <span className="font-bold text-brand-500 w-32 shrink-0">Server Access Logs:</span>
              <span>Automatically purged and permanently overwritten every <strong>30 days</strong>.</span>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800">
              <span className="font-bold text-brand-500 w-32 shrink-0">Support Messages:</span>
              <span>Retained for up to <strong>90 days</strong> following ticket resolution to ensure quality assistance, after which they are permanently deleted.</span>
            </div>
          </div>
        </section>

        {/* SECTION 8: YOUR RIGHTS UNDER GDPR & CCPA */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Scale className="w-5 h-5 text-brand-500" />
            8. Data Subject Rights (GDPR, CCPA & Global Laws)
          </h2>
          <p>
            Depending on your jurisdiction (including the European Economic Area under GDPR and California under CCPA/CPRA), you possess specific legal data protection rights:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li><strong>Right to Access:</strong> You have the right to request copies of any personal data we hold about you (such as past contact support messages).</li>
            <li><strong>Right to Erasure (Right to Be Forgotten):</strong> You may request that we delete any personal contact records we maintain regarding your email inquiries.</li>
            <li><strong>Right to Rectification:</strong> You may request that we correct inaccurate or incomplete support information.</li>
            <li><strong>Right to Non-Discrimination:</strong> We will never deny services, charge different rates, or degrade performance if you exercise your legal privacy rights.</li>
            <li><strong>No Sale of Personal Data:</strong> PintSave has <strong>never sold, leased, or monetized personal user data</strong> to third parties, and will never do so in the future.</li>
          </ul>
        </section>

        {/* SECTION 9: CHILDREN'S PRIVACY (COPPA) */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-brand-500" />
            9. Children's Online Privacy Protection Act (COPPA)
          </h2>
          <p>
            PintSave is a general audience utility tool and is not directed at children under the age of 13. We do not knowingly collect personal identifiable information from children under 13. If you believe your child has submitted personal contact information on our website, please contact us immediately, and we will promptly erase such record from our support archives.
          </p>
        </section>

        {/* SECTION 10: THIRD PARTY LINKS DISCLAIMER */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Globe className="w-5 h-5 text-brand-500" />
            10. Third-Party Websites & External Services
          </h2>
          <p>
            PintSave processes media links originating from Pinterest. Our website may contain links to third-party web pages or services not owned or controlled by PintSave. We strongly advise you to review the privacy policy of every external website you visit. We assume no responsibility for the content, privacy policies, or security practices of third-party platforms.
          </p>
        </section>

        {/* SECTION 11: REVISIONS & UPDATES */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Bell className="w-5 h-5 text-brand-500" />
            11. Revisions & Policy Updates
          </h2>
          <p>
            We may update our Privacy Policy periodically to reflect technological improvements, security enhancements, or legal regulatory updates. Any changes will be posted directly on this page with an updated "Last Revised" timestamp at the top of the document.
          </p>
        </section>

        {/* SECTION 12: DATA PROTECTION OFFICER CONTACT */}
        <section className="p-6 rounded-2xl bg-brand-50/50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 space-y-3">
          <h3 className="font-bold text-stone-900 dark:text-white flex items-center gap-2 text-base">
            <Mail className="w-5 h-5 text-brand-500" /> Contact Our Data Protection Team
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            If you have any questions regarding this Privacy Policy, wish to exercise your data subject privacy rights, or need assistance, please submit a message via our <Link href="/contacts-us" className="text-brand-500 font-semibold underline">Contact Form</Link> or send a direct message to our Data Protection Officer at:
          </p>
          <div className="pt-1">
            <a 
              href="mailto:privacy@pintsave.app" 
              className="inline-flex items-center gap-2 font-mono text-sm text-brand-600 dark:text-brand-400 font-bold bg-white dark:bg-stone-800 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm hover:border-brand-400 transition"
            >
              <Mail className="w-4 h-4 text-brand-500" /> privacy@pintsave.app
            </a>
          </div>
        </section>

      </div>

      {/* CLOSING CTA BANNER */}
      <CTABanner
        title="Ready to Download Pinterest Media Privately?"
        description="Try PintSave today—fast, 100% free, watermark-free, and with complete user privacy."
        buttonText="Try PintSave Downloader Now"
      />
    </div>
  );
}
