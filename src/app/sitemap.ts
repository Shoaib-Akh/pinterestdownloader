import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pintsave.site';

  let blogPosts: Array<{ slug: string; publishedAt?: Date | null; createdAt: Date }> = [];
  try {
    blogPosts = await prisma.blog.findMany({
      where: { published: true },
      select: { slug: true, publishedAt: true, createdAt: true },
    });
  } catch (err) {
    console.warn('Sitemap DB query warning:', err);
  }

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${slugify(post.slug) || post.slug}`,
    lastModified: new Date(post.publishedAt || post.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pinterest-video-downloader`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pinterest-image-downloader`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pinterest-gif-downloader`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacts-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/dmca`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  return [...routes, ...blogUrls];
}
