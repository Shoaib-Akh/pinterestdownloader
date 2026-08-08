import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SAMPLE_BLOG_POSTS } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    try {
      const dbPost = await prisma.blog.findUnique({
        where: { slug },
      });
      if (dbPost) {
        return NextResponse.json({ data: dbPost });
      }
    } catch (dbErr) {
      console.warn('DB blog slug fetch warning:', dbErr);
    }

    const fallbackPost = SAMPLE_BLOG_POSTS.find((p) => p.slug === slug);
    if (fallbackPost) {
      return NextResponse.json({ data: fallbackPost });
    }

    return NextResponse.json({ data: null, error: 'Post not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ data: null, error: 'Failed to fetch blog post' }, { status: 500 });
  }
}
