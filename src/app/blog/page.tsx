import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import CTABanner from '@/components/CTABanner';
import { getBlogPosts } from '@/lib/api';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'PintSave Blog — Tutorials, Guides & Pinterest Downloading Tips',
  description:
    'Read the latest guides on saving Pinterest videos on iPhone, downloading 4K original images, copyright rules, and Pinterest media tips.',
  openGraph: {
    title: 'PintSave Blog — Tutorials & Pinterest Media Guides',
    description: 'Master saving Pinterest videos, 4K photos, and GIFs with step-by-step tutorials.',
    url: 'https://pintsave.app/blog',
  },
};

export default async function BlogListPage() {
  const result = await getBlogPosts(1, 10);
  const posts = result?.data || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full space-y-12">
      {/* Header Hero */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-wider border border-brand-200 dark:border-brand-500/20">
          <BookOpen className="w-3.5 h-3.5" /> Insights & Tutorials
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          The PintSave <span className="text-brand-500">Blog</span>
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Guides, tutorials, and deep dives into saving high-definition media from Pinterest on iOS, Android, and Web.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all group"
          >
            {post.coverImage && (
              <div className="relative h-48 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            )}

            <div className="p-6 flex flex-col flex-grow space-y-3">
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                <Calendar className="w-3.5 h-3.5 text-brand-500" />
                <time dateTime={post.publishedAt || post.createdAt}>
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>

              <h2 className="text-lg font-bold text-stone-900 dark:text-white leading-snug group-hover:text-brand-500 transition-colors line-clamp-2">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3 flex-grow">
                {post.excerpt}
              </p>

              <div className="pt-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-500 hover:text-brand-600 group-hover:translate-x-1 transition-transform"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <CTABanner />
    </div>
  );
}
