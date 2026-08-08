import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let blogs: any[] = [];
    try {
      blogs = await prisma.blog.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (dbErr) {
      console.warn('DB admin blog query warning:', dbErr);
    }
    return NextResponse.json({ data: blogs });
  } catch (error: any) {
    return NextResponse.json({ data: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, coverImage, published } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, error: 'Title, slug, and content are required.' },
        { status: 400 }
      );
    }

    const cleanSlug = slugify(slug) || slug;

    const blog = await prisma.blog.create({
      data: {
        title,
        slug: cleanSlug,
        excerpt: excerpt || null,
        content,
        coverImage: coverImage || null,
        published: published ?? true,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, data: blog });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save blog' },
      { status: 500 }
    );
  }
}
