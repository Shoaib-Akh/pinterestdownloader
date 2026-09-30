'use client';

import { useState } from 'react';
import { Download, Copy, Share2, FileVideo, Image as ImageIcon, Film, Layers, Zap, Loader2, Play } from 'lucide-react';
import { MediaResult } from '@/lib/api';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Toast } from './ui/toast';
import AdBanner from './AdBanner';

interface ResultCardProps {
  result: MediaResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const [toastMessage, setToastMessage] = useState('');
  const [downloadingUrls, setDownloadingUrls] = useState<Record<string, boolean>>({});
  const [downloadFailed, setDownloadFailed] = useState(false);

  if (!result || !result.success) return null;

  const handleCopyLink = () => {
    if (result.mediaUrl) {
      navigator.clipboard.writeText(result.mediaUrl);
      setToastMessage('Media URL copied to clipboard!');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleShare = () => {
    if (navigator.share && result.mediaUrl) {
      navigator.share({
        title: result.title || 'PintSave Media',
        url: result.mediaUrl,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const filename = `pintsave_${result?.pinId || Date.now()}.${
    result.type === 'video' ? 'mp4' : result.type === 'gif' ? 'gif' : 'jpg'
  }`;

  const downloadFile = async (url: string, targetFilename: string) => {
    if (!url) return;
    setDownloadingUrls((prev) => ({ ...prev, [url]: true }));
    setDownloadFailed(false);
    try {
      const downloadUrl = `/api/proxy-download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(targetFilename)}`;
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = targetFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
      setToastMessage('Download started successfully!');
      setTimeout(() => setToastMessage(''), 3000);
    } catch (error) {
      console.error('Download error:', error);
      setDownloadFailed(true);
      setToastMessage('Download failed. Use the direct link fallback.');
      setTimeout(() => setToastMessage(''), 4000);
    } finally {
      setDownloadingUrls((prev) => ({ ...prev, [url]: false }));
    }
  };

  const isMainDownloading = result.mediaUrl ? downloadingUrls[result.mediaUrl] : false;

  return (
    <div className="w-full bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/80 dark:border-stone-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* Media Preview Container */}
        <div className="relative w-full md:w-72 h-72 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 border border-stone-200/80 dark:border-stone-700/80 group flex items-center justify-center">
          <img
            src={result.thumbnail || result.mediaUrl}
            alt={result.title || 'Pinterest Pin'}
            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
          />

          {/* Video Play Overlay (Visual Indicator only, not playable) */}
          {result.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none">
              <div className="w-14 h-14 rounded-full bg-white/95 dark:bg-stone-900/95 shadow-lg flex items-center justify-center text-stone-950 dark:text-white transform group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
            </div>
          )}

          {/* Type Badge Overlay */}
          <div className="absolute top-3 left-3">
            <Badge variant="mono">
              {result.type === 'video' && <FileVideo className="w-3 h-3 text-rose-400" />}
              {result.type === 'image' && <ImageIcon className="w-3 h-3 text-brand-400" />}
              {result.type === 'gif' && <Film className="w-3 h-3 text-emerald-400" />}
              {result.type === 'carousel' && <Layers className="w-3 h-3 text-amber-400" />}
              {result.type || 'media'}
            </Badge>
          </div>

          {result.cached && (
            <div className="absolute bottom-3 right-3">
              <Badge variant="success">
                <Zap className="w-3 h-3" /> Cached
              </Badge>
            </div>
          )}
        </div>

        {/* Media Information & Actions */}
        <div className="flex-1 space-y-4 text-center md:text-left w-full flex flex-col justify-between h-full">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <Badge variant="brand">Original Quality HD</Badge>
              <Badge variant="secondary">Direct CDN Link</Badge>
            </div>
            <h3 className="font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 line-clamp-2 leading-snug">
              {result.title || 'Pinterest Media Pin'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Ready for high-speed direct save in uncompressed resolution without watermarks.
            </p>
          </div>

          {result.type === 'carousel' && result.items && result.items.length > 0 && (
            <div className="pt-2">
              <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Carousel Items ({result.items.length}):
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {result.items.map((item, idx) => {
                  const itemFilename = `pintsave_carousel_${idx + 1}.${item.type === 'video' ? 'mp4' : 'jpg'}`;
                  const isItemDownloading = downloadingUrls[item.url] || false;
                  return (
                    <button
                      key={idx}
                      onClick={() => downloadFile(item.url, itemFilename)}
                      disabled={isItemDownloading}
                      className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 flex items-center justify-between hover:bg-brand-50 hover:text-brand-600 transition disabled:opacity-50 w-full"
                    >
                      <span>Item #{idx + 1}</span>
                      {isItemDownloading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => downloadFile(result.mediaUrl || '', filename)}
              disabled={isMainDownloading || !result.mediaUrl}
            >
              {isMainDownloading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              <span>
                {isMainDownloading ? 'Downloading...' : `Download HD ${result.type?.toUpperCase()}`}
              </span>
            </Button>

            {downloadFailed && result.mediaUrl && (
              <a
                href={result.mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={filename}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 shrink-0"
                title="Direct Download Link"
              >
                <Download className="w-4 h-4" />
                <span>Direct Link (Fallback)</span>
              </a>
            )}

            <Button variant="secondary" size="lg" onClick={handleCopyLink}>
              <Copy className="w-4 h-4" />
              <span>Copy Link</span>
            </Button>

            <Button variant="ghost" size="lg" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}

      <div className="mt-6 border-t border-stone-100 dark:border-stone-800 pt-4">
        <AdBanner />
      </div>
    </div>
  );
}
