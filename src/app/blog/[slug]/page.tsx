import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CTABanner from '@/components/CTABanner';
import BlogComments from '@/components/BlogComments';
import AdBanner from '@/components/AdBanner';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/api';
import { Calendar, ArrowLeft, BookOpen, Clock, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

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

// Markdown parser helper to cleanly format blog headers, bold text, lists, and internal links
function formatInline(text: string) {
  const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith('[') && part.includes('](')) {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        const linkText = match[1];
        const linkUrl = match[2];
        const isInternal = linkUrl.startsWith('/') || linkUrl.includes('pintsave');
        return (
          <a
            key={i}
            href={linkUrl}
            target={isInternal ? undefined : '_blank'}
            rel={isInternal ? undefined : 'noopener noreferrer'}
            className="text-brand-500 font-semibold underline hover:text-brand-600 transition-colors"
          >
            {linkText}
          </a>
        );
      }
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-stone-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderMarkdownContent(content: string) {
  const blocks = content.split(/\n\n+/);
  return blocks.map((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={idx} className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white pt-4 pb-2 border-b border-stone-100 dark:border-stone-800">
          {formatInline(trimmed.replace(/^###\s+/, ''))}
        </h3>
      );
    }

    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={idx} className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white pt-6 pb-2 border-b border-stone-200 dark:border-stone-800">
          {formatInline(trimmed.replace(/^##\s+/, ''))}
        </h2>
      );
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items = trimmed.split(/\n/).map(line => line.replace(/^[-*]\s+/, '').trim());
      return (
        <ul key={idx} className="list-disc pl-6 space-y-2 text-stone-700 dark:text-stone-300 my-4">
          {items.map((item, i) => (
            <li key={i}>{formatInline(item)}</li>
          ))}
        </ul>
      );
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split(/\n/).map(line => line.replace(/^\d+\.\s+/, '').trim());
      return (
        <ol key={idx} className="list-decimal pl-6 space-y-2 text-stone-700 dark:text-stone-300 my-4">
          {items.map((item, i) => (
            <li key={i}>{formatInline(item)}</li>
          ))}
        </ol>
      );
    }

    return (
      <p key={idx} className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm sm:text-base">
        {formatInline(trimmed)}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPostsResult = await getBlogPosts(1, 10);
  const relatedPosts = (allPostsResult?.data || []).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 w-full space-y-8">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-brand-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to all articles
      </Link>

      {/* Article Header (For standard posts) */}
      {!/<[a-z][\s\S]*>/i.test(post.content || '') && (
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
            <span className="inline-flex items-center gap-1 text-brand-500 font-semibold bg-brand-50 dark:bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-200 dark:border-brand-500/20">
              <Tag className="w-3 h-3" /> Pinterest Guide
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
              <Clock className="w-3.5 h-3.5" /> 5 min read
            </span>
          </div>

          {post.title && (
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-tight">
              {post.title}
            </h1>
          )}

          {post.excerpt && (
            <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed font-medium">
              {post.excerpt}
            </p>
          )}
        </header>
      )}

      {/* Article Body */}
      <article className="bg-white dark:bg-stone-900 p-6 sm:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        {post.content ? (
          /<[a-z][\s\S]*>/i.test(post.content) ? (
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="space-y-6">
              {renderMarkdownContent(post.content)}
            </div>
          )
        ) : (
          <p className="text-stone-500">Content loading...</p>
        )}
      </article>

      {/* AdSense Banner */}
      <AdBanner />

      {/* CTA Banner Section */}
      <div className="pt-4">
        <CTABanner
          title="Ready to Save Pinterest Videos & Images in HD?"
          description="Try PintSave today—fast, 100% free, watermark-free, and with zero registration required."
          buttonText="Try PintSave Downloader Now"
        />
      </div>

      {/* Blog Discussion / Comments */}
      <BlogComments blogSlug={post.slug} blogId={post.id} />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pt-10 border-t border-stone-200 dark:border-stone-800 space-y-6">
          <h3 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-500" /> More Helpful Pinterest Guides
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.slug}`}
                className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-brand-500/50 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-stone-900 dark:text-white group-hover:text-brand-500 transition-colors line-clamp-2">
                    {related.title}
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-3">
                    {related.excerpt}
                  </p>
                </div>
                <span className="text-xs font-semibold text-brand-500 pt-3 inline-block">
                  Read article &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
