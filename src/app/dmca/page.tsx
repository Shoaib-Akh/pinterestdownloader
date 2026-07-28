import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, AlertCircle, Mail, FileCheck, Gavel, Scale, AlertTriangle, CheckCircle2, Lock, Globe } from 'lucide-react';
import CTABanner from '@/components/CTABanner';

export const metadata: Metadata = {
  title: 'PintSave DMCA Copyright Policy — Official Takedown & Compliance Guide',
  description:
    'Read PintSave’s Digital Millennium Copyright Act (DMCA) Policy. Information for copyright owners, designated agent contact details, takedown notices, and counter-notifications.',
  openGraph: {
    title: 'PintSave DMCA Copyright Policy — Official Takedown Guide',
    description: 'Learn how PintSave responds to copyright infringement claims under the DMCA and protects creator rights.',
    url: 'https://pintsave.app/dmca',
  },
};

export default function DMCAPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'PintSave DMCA Copyright Policy',
    description: 'Official Digital Millennium Copyright Act (DMCA) policy for PintSave detailing takedown notice procedures and counter-notifications.',
    url: 'https://pintsave.app/dmca',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* DOCUMENT HEADER */}
      <div className="text-center sm:text-left space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider border border-rose-200 dark:border-rose-500/20">
          <ShieldAlert className="w-3.5 h-3.5" /> COPYRIGHT COMPLIANCE & LEGAL NOTICE
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          PintSave DMCA Copyright Policy
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 flex flex-wrap items-center gap-2">
          <span>Title 17, United States Code, Section 512(c) Compliance</span>
          <span>•</span>
          <span>Last Revised: July 28, 2026</span>
          <span>•</span>
          <span className="text-brand-500 font-semibold">Version 2.4</span>
        </p>
      </div>

      {/* DOCUMENT CONTENT CONTAINER */}
      <div className="bg-white dark:bg-stone-900 p-6 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-10 text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">

        {/* SECTION 1: STATEMENT OF COMMITMENT */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <AlertCircle className="w-5 h-5 text-brand-500" />
            1. Statement of Principle & Commitment to Copyright Protection
          </h2>
          <p>
            At <strong>PintSave</strong> (accessible from <code className="bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded text-stone-800 dark:text-stone-200">https://pintsave.app</code>), we deeply respect the intellectual property rights of visual artists, content creators, photographers, and copyright holders. It is our strict policy to respond expeditiously to clear, valid notices of alleged copyright infringement that comply with the Digital Millennium Copyright Act of 1998 (17 U.S.C. § 512) ("DMCA").
          </p>
          <p>
            This DMCA Copyright Policy outlines the procedures for copyright owners to submit formal takedown notices, explains how our technical blocklisting systems process valid claims, and describes the counter-notification process available under applicable federal laws.
          </p>
        </section>

        {/* SECTION 2: TECHNICAL ARCHITECTURE & NON-STORAGE NOTICE */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Lock className="w-5 h-5 text-brand-500" />
            2. Technical Architecture Notice (Non-Storage Media Proxy)
          </h2>
          <p>
            To understand how PintSave processes media, copyright owners should note our technical operational architecture:
          </p>
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-950 dark:text-amber-200 text-sm leading-relaxed space-y-2">
            <h3 className="font-bold flex items-center gap-2 text-amber-900 dark:text-amber-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Important Technical Clarification
            </h3>
            <p>
              <strong>PintSave does not host, store, cache, upload, or archive media files on its servers.</strong> PintSave functions exclusively as an automated real-time client-side utility tool that inspects public metadata to resolve direct links hosted on external third-party Content Delivery Networks (CDNs), specifically Pinterest's servers.
            </p>
          </div>
          <p>
            Because PintSave does not store physical copies of media on its databases, our primary mechanism for resolving valid DMCA claims is by <strong>blocklisting the requested pin URLs or domain endpoints</strong> from being processed by our extraction engine.
          </p>
        </section>

        {/* SECTION 3: REQUIREMENTS FOR SUBMITTING A TAKEDOWN NOTICE */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <FileCheck className="w-5 h-5 text-brand-500" />
            3. Requirements for Submitting a Valid DMCA Takedown Notice
          </h2>
          <p>
            If you are a copyright owner or an authorized representative acting on behalf of a copyright holder, and you believe that content accessible via PintSave infringes upon your copyright, you may submit a formal written DMCA Notification to our Designated DMCA Agent.
          </p>
          <p>
            Under 17 U.S.C. § 512(c)(3), your DMCA Takedown Notice <strong>MUST</strong> include the following statutory requirements:
          </p>
          <div className="space-y-3 pt-1 text-sm">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
              <span className="font-bold text-brand-500 shrink-0">1. Signature:</span>
              <span>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</span>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
              <span className="font-bold text-brand-500 shrink-0">2. Identification of Work:</span>
              <span>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works are covered by a single notification, a representative list of such works.</span>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
              <span className="font-bold text-brand-500 shrink-0">3. Specific URLs:</span>
              <span>Identification of the material or Pinterest URL(s) claimed to be infringing, with sufficient detail so that PintSave can locate and disable parsing routes for the specific pin link.</span>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
              <span className="font-bold text-brand-500 shrink-0">4. Contact Information:</span>
              <span>Information reasonably sufficient to permit PintSave to contact you, including your legal name, physical mailing address, telephone number, and direct email address.</span>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
              <span className="font-bold text-brand-500 shrink-0">5. Good Faith Statement:</span>
              <span>A statement that you have a good-faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</span>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
              <span className="font-bold text-brand-500 shrink-0">6. Perjury Statement:</span>
              <span>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</span>
            </div>
          </div>
        </section>

        {/* SECTION 4: DESIGNATED DMCA AGENT CONTACT */}
        <section className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 space-y-4">
          <h3 className="font-bold text-stone-900 dark:text-white flex items-center gap-2 text-base">
            <Mail className="w-5 h-5 text-brand-500" /> Designated DMCA Agent Contact Details
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            Please submit all formal DMCA Takedown Notices via email directly to our Designated DMCA Agent at:
          </p>
          <div className="pt-1">
            <a 
              href="mailto:dmca@pintsave.app" 
              className="inline-flex items-center gap-2 font-mono text-sm text-brand-600 dark:text-brand-400 font-bold bg-white dark:bg-stone-800 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm hover:border-brand-400 transition"
            >
              <Mail className="w-4 h-4 text-brand-500" /> dmca@pintsave.app
            </a>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            You may also reach our legal operations team using our <Link href="/contact" className="text-brand-500 font-semibold underline">Contact Support Form</Link>. Notices sent via email are acknowledged and processed within 24 to 48 business hours.
          </p>
        </section>

        {/* SECTION 5: PROCESSING TIMEFRAMES & BLOCKLISTING */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Scale className="w-5 h-5 text-brand-500" />
            5. Processing Timeframes & URL Blocklisting Protocol
          </h2>
          <p>
            Upon receipt of a valid, complete DMCA Takedown Notice complying with all statutory requirements, PintSave will take the following swift actions:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Review the notice within 24 to 48 hours to confirm legal completeness.</li>
            <li>Add the reported Pinterest pin URL(s) to our automated internal blocklist, disabling further parsing or media link generation for those specific assets through PintSave.</li>
            <li>Inform the reporting party once the URL extraction route has been successfully disabled.</li>
          </ul>
        </section>

        {/* SECTION 6: COUNTER-NOTIFICATION PROCEDURE */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Gavel className="w-5 h-5 text-brand-500" />
            6. Counter-Notification Procedure (17 U.S.C. § 512(g))
          </h2>
          <p>
            If a URL extraction route was disabled or blocklisted due to a DMCA Takedown Notice, and you believe this action was taken as a result of mistake, misidentification, or fair use, you may submit a written Counter-Notification to our Designated Agent.
          </p>
          <p className="text-sm">
            Under 17 U.S.C. § 512(g)(3), a valid Counter-Notification MUST include:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-sm">
            <li>Your physical or electronic signature.</li>
            <li>Identification of the URL or material that was disabled and the location where it appeared prior to removal.</li>
            <li>A statement under penalty of perjury that you have a good-faith belief that the material was disabled as a result of mistake or misidentification.</li>
            <li>Your name, address, telephone number, and a statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located.</li>
          </ul>
        </section>

        {/* SECTION 7: REPEAT INFRINGER POLICY */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <AlertTriangle className="w-5 h-5 text-brand-500" />
            7. Repeat Infringer Policy & Automated Abuser Bans
          </h2>
          <p>
            In accordance with 17 U.S.C. § 512(i), PintSave maintains a strict policy of terminating or blocklisting access for users or IP addresses determined to be repeat infringers or automated abusers who repeatedly attempt to extract copyrighted material without legal authorization.
          </p>
        </section>

        {/* SECTION 8: WARNING AGAINST FRAUDULENT DMCA NOTICES */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <ShieldAlert className="w-5 h-5 text-brand-500" />
            8. Misrepresentation & Penalties under 17 U.S.C. § 512(f)
          </h2>
          <p className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            <strong>Legal Warning:</strong> Please note that under 17 U.S.C. § 512(f), any person who knowingly materially misrepresents that material or activity is infringing, or that material was removed by mistake, may be subject to severe legal liability and financial damages (including court costs and attorney fees) incurred by the alleged infringer or service provider.
          </p>
        </section>

        {/* SECTION 9: TRADEMARK DISCLAIMER */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <Globe className="w-5 h-5 text-brand-500" />
            9. Trademark & Non-Affiliation Disclaimer
          </h2>
          <p className="text-sm">
            PintSave is an independent web utility software application. PintSave is <strong>not affiliated, associated, authorized, endorsed by, or in any way officially connected to Pinterest, Inc.</strong> or any of its subsidiaries. All Pinterest trademarks, brand logos, and service names are property of Pinterest, Inc.
          </p>
        </section>

      </div>

      {/* CLOSING CTA BANNER */}
      <CTABanner
        title="Ready to Download Pinterest Media Privately?"
        description="Try PintSave today—fast, 100% free, watermark-free, and adhering to strict DMCA copyright rules."
        buttonText="Try PintSave Downloader Now"
      />
    </div>
  );
}
