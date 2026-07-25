'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { downloadMedia, MediaResult } from '@/lib/api';
import { ResultCard } from '@/components/ResultCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

function SharedDownloadContent() {
  const searchParams = useSearchParams();
  const rawUrl = searchParams.get('url');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MediaResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (rawUrl) {
      setLoading(true);
      setError('');
      downloadMedia(rawUrl).then((res) => {
        setLoading(false);
        if (res.success) {
          setResult(res);
        } else {
          setError(res.error || 'Failed to extract media for this link.');
        }
      });
    }
  }, [rawUrl]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </Link>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
          Download Result
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm">
          {rawUrl ? `Processing pin: ${rawUrl}` : 'No URL specified.'}
        </p>
      </div>

      {loading && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row gap-6">
          <Skeleton className="w-full sm:w-64 h-64 rounded-2xl" />
          <div className="flex-1 space-y-4 py-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-12 w-48 mt-4" />
          </div>
        </div>
      )}

      {error && (
        <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-center space-y-4">
          <p className="font-semibold">{error}</p>
          <Link href="/">
            <Button size="sm">Try Another Link</Button>
          </Link>
        </div>
      )}

      {result && <ResultCard result={result} />}
    </div>
  );
}

export default function SharedDownloadPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center flex items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
          <span>Loading download result...</span>
        </div>
      }
    >
      <SharedDownloadContent />
    </Suspense>
  );
}
