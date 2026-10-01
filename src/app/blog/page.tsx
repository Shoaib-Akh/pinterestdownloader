import { Metadata } from 'next';
import Link from 'next/link';
import CTABanner from '@/components/CTABanner';
import { getBlogPosts, formatBlogTitle } from '@/lib/api';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const revalidate = 60;

const POSTS_PER_PAGE = 6;

interface Props {
  searchParams?: { page?: string };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const page = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  const pageSuffix = page > 1 ? ` — Page ${page}` : '';

  return {
    title: `Latest Video & Media Guides${pageSuffix} — PintSave Blog`,
    description:
      'Read our practical guides on saving online videos responsibly, choosing trustworthy tools, 4K quality photo downloads, and media tips.',
    alternates: {
      canonical: page > 1 ? `https://pintsave.site/blog?page=${page}` : 'https://pintsave.site/blog',
    },
    openGraph: {
      title: `Latest Video & Media Guides${pageSuffix} — PintSave Blog`,
      description: 'Read our practical guides on saving online videos, 4K photo downloads, and media tips.',
      url: page > 1 ? `https://pintsave.site/blog?page=${page}` : 'https://pintsave.site/blog',
    },
  };
}

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
  const words = text.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
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

function buildPaginationRange(currentPage: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: (number | '...')[] = [];
  items.push(1);

  if (currentPage > 3) {
    items.push('...');
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    items.push(i);
  }

  if (currentPage < totalPages - 2) {
    items.push('...');
  }

  items.push(totalPages);
  return items;
}

export default async function BlogListPage({ searchParams }: Props) {
  const currentPage = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  const result = await getBlogPosts(currentPage, POSTS_PER_PAGE);
  const posts = result?.data || [];
  const { total, totalPages } = result?.pagination || {
    page: currentPage,
    limit: POSTS_PER_PAGE,
    total: posts.length,
    totalPages: Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE)),
  };

  const startCount = total === 0 ? 0 : (currentPage - 1) * POSTS_PER_PAGE + 1;
  const endCount = Math.min(total, currentPage * POSTS_PER_PAGE);
  const pageRange = buildPaginationRange(currentPage, totalPages);

  const getPageUrl = (page: number) => {
    return page === 1 ? '/blog' : `/blog?page=${page}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full space-y-10">
      {/* Header Section matching reference UI */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200 dark:border-stone-800 pb-5 gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Latest guides
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Tips, tutorials, and practical insights on media downloads and quality.
          </p>
        </div>
        <div className="text-xs sm:text-sm font-semibold text-stone-500 dark:text-stone-400 shrink-0">
          {total > 0 ? (
            <>
              Showing <span className="text-stone-900 dark:text-white font-bold">{startCount}–{endCount}</span> of <span className="text-stone-900 dark:text-white font-bold">{total}</span> articles
            </>
          ) : (
            `${posts.length} articles`
          )}
        </div>
      </div>

      {/* Pure Text Listing (No Heavy Images) using Site Brand Colors */}
      {posts.length > 0 ? (
        <div className="divide-y divide-stone-200 dark:divide-stone-800">
          {posts.map((post) => {
            const cleanTitle = formatBlogTitle(post.title);
            const category = getPostCategory(cleanTitle);
            const readTime = getReadTime(post.content, post.excerpt);
            const formattedDate = formatDate(post.publishedAt || post.createdAt);

            return (
              <article
                key={post.id}
                className="group py-7 sm:py-9 transition-colors"
              >
                <Link href={`/blog/${post.slug}`} prefetch={true} className="block">
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
                        {cleanTitle}
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
      ) : (
        <div className="text-center py-16 px-4 bg-stone-50 dark:bg-stone-900/50 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4">
          <p className="text-stone-600 dark:text-stone-300 text-lg font-medium">
            No articles found on this page.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors shadow-sm"
          >
            Back to First Page
          </Link>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav
          aria-label="Blog pagination"
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-200 dark:border-stone-800"
        >
          {/* Previous Page Button */}
          <div>
            {currentPage > 1 ? (
              <Link
                href={getPageUrl(currentPage - 1)}
                prefetch={true}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-brand-600 dark:hover:text-brand-400 transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl border border-stone-200 dark:border-stone-800/60 bg-stone-50 dark:bg-stone-900/40 text-stone-400 dark:text-stone-600 cursor-not-allowed select-none">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </span>
            )}
          </div>

          {/* Numbered Page Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {pageRange.map((p, idx) => {
              if (p === '...') {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="w-9 h-9 flex items-center justify-center text-stone-400 dark:text-stone-500 font-semibold text-sm select-none"
                  >
                    &hellip;
                  </span>
                );
              }

              const isCurrent = p === currentPage;

              return isCurrent ? (
                <span
                  key={p}
                  aria-current="page"
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-brand-600 text-white font-bold text-sm shadow-sm select-none"
                >
                  {p}
                </span>
              ) : (
                <Link
                  key={p}
                  href={getPageUrl(p)}
                  prefetch={true}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-brand-600 dark:hover:text-brand-400 font-medium text-sm transition-all"
                >
                  {p}
                </Link>
              );
            })}
          </div>

          {/* Next Page Button */}
          <div>
            {currentPage < totalPages ? (
              <Link
                href={getPageUrl(currentPage + 1)}
                prefetch={true}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-brand-600 dark:hover:text-brand-400 transition-all shadow-sm"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl border border-stone-200 dark:border-stone-800/60 bg-stone-50 dark:bg-stone-900/40 text-stone-400 dark:text-stone-600 cursor-not-allowed select-none">
                Next
                <ChevronRight className="w-4 h-4" />
              </span>
            )}
          </div>
        </nav>
      )}

      {/* CTA Banner at bottom */}
      <div className="pt-6">
        <CTABanner />
      </div>
    </div>
  );
}
