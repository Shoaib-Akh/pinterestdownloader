import { Metadata } from 'next';
import Link from 'next/link';
import CTABanner from '@/components/CTABanner';
import { getBlogPosts } from '@/lib/api';
import { ArrowUpRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Latest Video & Media Guides — PintSave Blog',
  description:
    'Read our practical guides on saving online videos responsibly, choosing trustworthy tools, 4K quality photo downloads, and media tips.',
  openGraph: {
    title: 'Latest Video & Media Guides — PintSave Blog',
    description: 'Read our practical guides on saving online videos, 4K photo downloads, and media tips.',
    url: 'https://pintsave.app/blog',
  },
};

function getPostCategory(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('quality') || lower.includes('4k') || lower.includes('hd') || lower.includes('resolution')) {
    return 'QUALITY GUIDE';
  }
  if (lower.includes('compress') || lower.includes('gif') || lower.includes('freezing') || lower.includes('editing')) {
    return 'EDITING TIPS';
  }
  if (lower.includes('mp3') || lower.includes('audio') || lower.includes('story') || lower.includes('idea')) {
    return 'AUDIO GUIDE';
  }
  if (lower.includes('legal') || lower.includes('copyright') || lower.includes('fair use')) {
    return 'LEGAL & SAFETY';
  }
  if (lower.includes('board') || lower.includes('batch')) {
    return 'FEATURE GUIDE';
  }
  if (lower.includes('troubleshoot') || lower.includes('error') || lower.includes('fix')) {
    return 'TROUBLESHOOTING';
  }
  return 'GUIDE';
}

function getReadTime(content?: string, excerpt?: string): string {
  const text = ((content || '') + ' ' + (excerpt || '')).trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(5, Math.ceil(words / 140));
  return `${minutes} MIN READ`;
}

function formatDate(dateString?: string): string {
  if (!dateString) return 'AUG 08, 2026';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'AUG 08, 2026';
    return d
      .toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      })
      .toUpperCase();
  } catch {
    return 'AUG 08, 2026';
  }
}

export default async function BlogListPage() {
  const result = await getBlogPosts(1, 20);
  const posts = result?.data || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full space-y-10">
      {/* Header Section matching reference UI */}
      <div className="flex items-end justify-between border-b border-stone-200 dark:border-stone-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Latest guides
          </h1>
        </div>
        <div className="text-xs sm:text-sm font-semibold text-stone-500 dark:text-stone-400">
          {posts.length} articles &middot; updated weekly
        </div>
      </div>

      {/* Pure Text Listing (No Images) using Site Brand Colors */}
      <div className="divide-y divide-stone-200 dark:divide-stone-800">
        {posts.map((post) => {
          const category = getPostCategory(post.title);
          const readTime = getReadTime(post.content, post.excerpt);
          const formattedDate = formatDate(post.publishedAt || post.createdAt);

          return (
            <article
              key={post.id}
              className="group py-7 sm:py-9 transition-colors"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex items-start justify-between gap-6 sm:gap-10">
                  {/* Left Text Content */}
                  <div className="space-y-3.5 flex-1 min-w-0">
                    {/* Category Tag, Date & Reading Time */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold tracking-wider">
                      <span className="text-brand-600 dark:text-brand-400 uppercase">
                        {category}
                      </span>
                      <span className="text-stone-500 dark:text-stone-400 uppercase font-medium">
                        {formattedDate}
                      </span>
                      <span className="text-stone-500 dark:text-stone-400 uppercase font-medium">
                        {readTime}
                      </span>
                    </div>

                    {/* Article Title */}
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                      {post.title}
                    </h2>

                    {/* Description Excerpt */}
                    <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Footer Info & Read Link */}
                    <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-medium text-stone-500 dark:text-stone-400">
                      <span>By PintSave Editorial Team</span>
                      <span className="inline-flex items-center gap-1 font-bold text-stone-900 dark:text-stone-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        Read article <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Right Circle Arrow Button */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-stone-200 dark:border-stone-700/80 text-brand-600 dark:text-brand-400 group-hover:border-brand-500 dark:group-hover:border-brand-400 group-hover:bg-brand-50 dark:group-hover:bg-brand-950/40 transition-all shrink-0 mt-1">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      {/* CTA Banner at bottom */}
      <div className="pt-6">
        <CTABanner />
      </div>
    </div>
  );
}
