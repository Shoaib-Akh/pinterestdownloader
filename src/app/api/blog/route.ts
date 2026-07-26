import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SAMPLE_BLOG_POSTS } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    let posts: any[] = [];
    let total = 0;

    try {
      [posts, total] = await Promise.all([
        prisma.blog.findMany({
          where: { published: true },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.blog.count({ where: { published: true } }),
      ]);
    } catch (dbErr) {
      console.warn('DB blog query warning:', dbErr);
    }

    if (!posts || posts.length === 0) {
      return NextResponse.json({
        data: SAMPLE_BLOG_POSTS,
        pagination: {
          page: 1,
          limit,
          total: SAMPLE_BLOG_POSTS.length,
          totalPages: 1,
        },
      });
    }

    return NextResponse.json({
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      data: SAMPLE_BLOG_POSTS,
      pagination: { page: 1, limit: 10, total: SAMPLE_BLOG_POSTS.length, totalPages: 1 },
    });
  }
}
