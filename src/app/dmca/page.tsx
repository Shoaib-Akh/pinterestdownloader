import { Metadata } from 'next';
import Link from 'next/link';
import { AlertCircle, Mail, FileCheck, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DMCA Copyright Takedown Policy — PinFlow',
  description:
    'PinFlow Digital Millennium Copyright Act (DMCA) policy. Information for copyright owners on submitting takedown notices and counter-notifications.',
  openGraph: {
    title: 'DMCA Copyright Takedown Policy — PinFlow',
    description: 'Learn how PinFlow responds to copyright infringement claims under the DMCA.',
    url: 'https://pinflow.app/dmca',
  },
};

export default function DMCAPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
      {/* Title */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-rose-200 dark:border-rose-500/20">
          <ShieldAlert className="w-3.5 h-3.5" /> Copyright Protection
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-2">
          DMCA Takedown Policy
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Compliance notice under Title 17, United States Code, Section 512(c)
        </p>
      </div>

      {/* Content Card */}
      <div className="bg-white dark:bg-stone-900 p-6 sm:p-10 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-8 text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-brand-500" />
            1. Statement of Principle
          </h2>
          <p>
            PinFlow respects the intellectual property rights of creators, artists, and copyright holders. It is our policy to respond expeditiously to clear notices of alleged copyright infringement that comply with the Digital Millennium Copyright Act (&quot;DMCA&quot;).
          </p>
          <p className="text-xs bg-stone-50 dark:bg-stone-800 p-3 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400">
            Note: PinFlow does not host or store copyrighted media files on its servers. PinFlow acts as a client-side utility tool that retrieves streams hosted on external third-party CDN servers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-brand-500" />
            2. How to Submit a DMCA Takedown Notice
          </h2>
          <p>
            If you are a copyright owner or an authorized agent and believe that content accessible via PinFlow infringes upon your copyright, you may submit a written DMCA notification containing the following details:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              A physical or electronic signature of the person authorized to act on behalf of the owner of the copyright interest.
            </li>
            <li>
              Identification of the copyrighted work claimed to have been infringed.
            </li>
            <li>
              Identification of the material or Pinterest URL that is claimed to be infringing and that is to be removed or disabled.
            </li>
            <li>
              Your contact information, including your full legal name, physical mailing address, telephone number, and email address.
            </li>
            <li>
              A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
            </li>
            <li>
              A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner.
            </li>
          </ol>
        </section>

        <section className="p-5 rounded-xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 space-y-2">
          <h3 className="font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-500" /> Designated DMCA Agent Contact
          </h3>
          <p className="text-xs">
            Please send formal DMCA notices directly to our designated agent email:
          </p>
          <p className="text-sm font-mono font-bold text-brand-500">
            dmca@pinflow.app
          </p>
          <p className="text-xs text-stone-500">
            You may also reach our team via the <Link href="/contact" className="underline text-brand-500">Contact Form</Link>. Notices are usually processed within 24 to 48 business hours.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">3. Counter-Notification Procedure</h2>
          <p>
            If a link or access to content was removed due to a DMCA notice and you believe this was done in error or misidentification, you may send a written Counter-Notification to our Designated Agent. The counter-notice must include your contact information, identification of the material removed, a statement under penalty of perjury of good faith belief, and consent to jurisdiction.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">4. Repeat Infringer Policy</h2>
          <p>
            In accordance with the DMCA and other applicable laws, PinFlow enforces a strict policy of terminating access or blocking domain lookups for IP addresses or users determined to be repeat infringers.
          </p>
        </section>
      </div>
    </div>
  );
}
