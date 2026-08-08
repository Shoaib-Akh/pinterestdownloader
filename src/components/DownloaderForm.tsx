'use client';

import { useState } from 'react';
import { Download, Link as LinkIcon, Loader2, Check } from 'lucide-react';
import { downloadMedia, MediaResult } from '@/lib/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Toast } from './ui/toast';
import { useLanguage } from '@/providers/language-provider';

interface DownloaderFormProps {
  placeholder?: string;
  onLoadingChange?: (loading: boolean) => void;
  onResultChange?: (result: MediaResult | null) => void;
}

export default function DownloaderForm({
  placeholder,
  onLoadingChange,
  onResultChange,
}: DownloaderFormProps) {
  const { t } = useLanguage();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MediaResult | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const defaultPlaceholder = placeholder || t('paste_placeholder', 'Paste Pinterest link here...');

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // clipboard permission denied fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    onLoadingChange?.(true);
    setError('');
    setResult(null);
    onResultChange?.(null);

    const res = await downloadMedia(url.trim());

    setLoading(false);
    onLoadingChange?.(false);
    if (res.success) {
      setResult(res);
      onResultChange?.(res);
      setToastMessage('Media successfully extracted!');
      setTimeout(() => setToastMessage(''), 3000);
    } else {
      setError(res.error || 'Failed to extract Pinterest media. Please check your URL.');
    }
  };

  return (
    <div id="downloader" className="w-full space-y-8">
      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col sm:flex-row gap-3 bg-white dark:bg-stone-900 p-3 rounded-2xl shadow-2xl border border-stone-200/80 dark:border-stone-800"
      >
        <div className="relative flex-1">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={defaultPlaceholder}
            icon={<LinkIcon className="w-5 h-5 text-stone-400" />}
            required
            className="pr-20 text-stone-900 dark:text-stone-100 placeholder-stone-400"
          />
          <button
            type="button"
            onClick={handlePaste}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-bold text-brand-500 bg-brand-50 dark:bg-brand-500/10 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-500/20 transition flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : null}
            {copied ? 'Pasted!' : 'Paste'}
          </button>
        </div>

        <Button type="submit" size="lg" disabled={loading} className="shrink-0 font-bold px-7">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          <span>{loading ? t('downloading', 'Processing...') : t('download_btn', 'Download')}</span>
        </Button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium animate-in fade-in">
          {error}
        </div>
      )}

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
    </div>
  );
}
