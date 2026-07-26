'use client';

import { useState } from 'react';
import { Download, Copy, Share2, FileVideo, Image as ImageIcon, Film, Layers, Zap } from 'lucide-react';
import { MediaResult } from '@/lib/api';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Toast } from './ui/toast';

interface ResultCardProps {
  result: MediaResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const [toastMessage, setToastMessage] = useState('');

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

  return (
    <div className="w-full bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/80 dark:border-stone-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* Media Preview Container */}
        <div className="relative w-full md:w-72 h-72 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 border border-stone-200/80 dark:border-stone-700/80 group">
          {result.type === 'video' ? (
            <video
              src={result.mediaUrl}
              poster={result.thumbnail}
              controls
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <img
              src={result.thumbnail || result.mediaUrl}
              alt={result.title || 'Pinterest Pin'}
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
            />
          )}

          {/* Type Badge Overlay */}
          <div className="absolute top-3 left-3">
            <Badge variant="mono">
              {result.type === 'video' && <FileVideo className="w-3 h-3 text-rose-400" />}
              {result.type === 'image' && <ImageIcon className="w-3 h-3 text-indigo-400" />}
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

          {/* Carousel items grid if present */}
          {result.type === 'carousel' && result.items && result.items.length > 0 && (
            <div className="pt-2">
              <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Carousel Items ({result.items.length}):
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {result.items.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    download={`pintsave_carousel_${idx + 1}.jpg`}
                    className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 flex items-center justify-between hover:bg-brand-50 hover:text-brand-600 transition"
                  >
                    <span>Item #{idx + 1}</span>
                    <Download className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <a
              href={`/api/proxy-download?url=${encodeURIComponent(result.mediaUrl || '')}&filename=${encodeURIComponent(filename)}`}
              download={filename}
            >
              <Button size="lg" className="w-full sm:w-auto">
                <Download className="w-5 h-5" />
                <span>Download HD {result.type?.toUpperCase()}</span>
              </Button>
            </a>

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
    </div>
  );
}
