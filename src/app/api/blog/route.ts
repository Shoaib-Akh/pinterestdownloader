import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get('limit') || '6', 10) || 6));
    const skip = (page - 1) * limit;

    let posts: any[] = [];
    let total = 0;

    try {
      [posts, total] = await Promise.all([
        prisma.blog.findMany({
          where: { published: true },
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            coverImage: true,
            publishedAt: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.blog.count({ where: { published: true } }),
      ]);
    } catch (dbErr) {
      console.warn('DB blog query warning:', dbErr);
    }

    if (!posts) {
      posts = [];
    }

    return NextResponse.json({
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (error: any) {
    console.error('API /api/blog error:', error);
    return NextResponse.json(
      { data: [], pagination: { page: 1, limit: 6, total: 0, totalPages: 1 }, error: 'Failed to fetch blog posts from database' },
      { status: 500 }
    );
  }
}
