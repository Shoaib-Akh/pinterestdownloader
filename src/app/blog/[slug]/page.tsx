import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CTABanner from '@/components/CTABanner';
import { getBlogPostBySlug, SAMPLE_BLOG_POSTS } from '@/lib/api';
import { Calendar, ArrowLeft, BookOpen, Clock, Tag } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found — PintSave Blog',
    };
  }

  return {
    title: `${post.title} — PintSave Guide`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      url: `https://pintsave.app/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = SAMPLE_BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 w-full">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-brand-500 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to all articles
      </Link>

      {/* Article Header */}
      <header className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
          <span className="inline-flex items-center gap-1 text-brand-500 font-semibold bg-brand-50 dark:bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-200 dark:border-brand-500/20">
            <Tag className="w-3 h-3" /> Pinterest Tutorial
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> 4 min read
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed font-medium">
          {post.excerpt}
        </p>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-10 shadow-sm bg-stone-200 dark:bg-stone-800">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
      )}

      {/* Article Body */}
      <article className="bg-white dark:bg-stone-900 p-6 sm:p-10 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6 text-stone-700 dark:text-stone-300 leading-relaxed font-normal text-sm sm:text-base">
        {post.content ? (
          <div className="space-y-6 whitespace-pre-line">
            {post.content}
          </div>
        ) : (
          <p>Content loading...</p>
        )}
      </article>

      {/* CTA Banner Section */}
      <div className="mt-12">
        <CTABanner />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-14 pt-10 border-t border-stone-200 dark:border-stone-800">
          <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-500" /> Related Tutorials
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.slug}`}
                className="bg-white dark:bg-stone-900 p-5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-brand-500/50 transition-all group"
              >
                <h4 className="font-bold text-sm text-stone-900 dark:text-white group-hover:text-brand-500 transition-colors line-clamp-2 mb-2">
                  {related.title}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                  {related.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
