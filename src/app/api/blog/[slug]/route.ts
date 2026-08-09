import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const rawSlug = params.slug;
    const cleanTarget = slugify(rawSlug);

    try {
      let dbPost = await prisma.blog.findUnique({
        where: { slug: rawSlug },
      });

      if (!dbPost && cleanTarget) {
        dbPost = await prisma.blog.findUnique({
          where: { slug: cleanTarget },
        });
      }

      if (!dbPost) {
        const allPosts = await prisma.blog.findMany({ where: { published: true } });
        dbPost = allPosts.find((p) => slugify(p.slug) === cleanTarget || p.slug.toLowerCase() === rawSlug.toLowerCase()) || null;
      }

      if (dbPost) {
        return NextResponse.json({ data: { ...dbPost, slug: slugify(dbPost.slug) || dbPost.slug } });
      }
    } catch (dbErr) {
      console.warn('DB blog slug fetch warning:', dbErr);
    }

    return NextResponse.json({ data: null, error: 'Post not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ data: null, error: 'Failed to fetch blog post' }, { status: 500 });
  }
}
