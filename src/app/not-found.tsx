import Link from 'next/link';
import { ArrowLeft, Home, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/10">
        <FileQuestion className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-500 bg-brand-50 dark:bg-brand-500/10 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-500/20">
          404 Page Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          Lost in Discovery?
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          The page or blog article you are looking for doesn't exist, was moved, or had an invalid URL slug.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link href="/">
          <Button size="sm" className="gap-2">
            <Home className="w-4 h-4" /> Go to PintSave Home
          </Button>
        </Link>
        <Link href="/blog">
          <Button variant="secondary" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Browse Blog Articles
          </Button>
        </Link>
      </div>
    </div>
  );
}
