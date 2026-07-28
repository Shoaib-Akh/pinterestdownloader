'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sendContactMessage } from '@/lib/api';
import { Mail, Send, CheckCircle2, AlertCircle, HelpCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await sendContactMessage(formData);
      if (res.success) {
        setStatus({ type: 'success', text: res.message || "Message sent! We'll reply within 24 hours." });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', text: res.error || 'Failed to submit form. Please try again.' });
      }
    } catch {
      setStatus({ type: 'error', text: 'An unexpected network error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-brand-200 dark:border-brand-500/20">
          <MessageSquare className="w-3.5 h-3.5" /> Support & Inquiries
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-3">
          Contact PintSave Support
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base max-w-lg mx-auto">
          Have a question, feedback, or DMCA inquiry? Send us a message and our support team will reply within 24 hours.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Form (2 cols) */}
        <div className="md:col-span-2 bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          {status && (
            <div
              className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-sm font-medium ${
                status.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20'
                  : 'bg-rose-50 dark:bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-500/20'
              }`}
            >
              {status.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              )}
              <span>{status.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                Your Name <span className="text-brand-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 text-sm text-stone-900 dark:text-white placeholder-stone-400 transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                Email Address <span className="text-brand-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="e.g. sarah@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 text-sm text-stone-900 dark:text-white placeholder-stone-400 transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                Message <span className="text-brand-500">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="How can we help you today?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 text-sm text-stone-900 dark:text-white placeholder-stone-400 transition-all resize-none"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending Message...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Right Info Box */}
        <div className="space-y-6">
          <div className="bg-stone-900 text-white p-6 rounded-2xl border border-stone-800 space-y-4 shadow-sm">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-400" /> Support Direct Email
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Prefer sending an email directly from your mail client? Feel free to write to us:
            </p>
            <a href="mailto:nexaforce1@gmail.com" className="block font-mono text-sm font-bold text-brand-400 hover:underline">
            nexaforce1@gmail.com
            </a>
            <hr className="border-stone-800" />
            <div className="text-xs text-stone-400 space-y-1">
              <p><strong>Response Time:</strong> Within 24 hours</p>
              <p><strong>Operating Hours:</strong> Mon - Sun (24/7)</p>
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
            <h4 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-500" /> Quick Resources
            </h4>
            <ul className="text-xs space-y-2 text-stone-600 dark:text-stone-400">
              <li>
                <Link href="/#faq" className="hover:text-brand-500 transition-colors">
                  • Frequently Asked Questions (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-brand-500 transition-colors">
                  • Submit a DMCA Copyright Takedown
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-500 transition-colors">
                  • Read Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
