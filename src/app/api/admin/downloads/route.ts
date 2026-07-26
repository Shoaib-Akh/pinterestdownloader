import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '15', 10);
    const skip = (page - 1) * limit;

    let downloads: any[] = [];
    let total = 0;

    try {
      [downloads, total] = await Promise.all([
        prisma.download.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.download.count(),
      ]);
    } catch (dbErr) {
      console.warn('DB admin downloads query warning:', dbErr);
    }

    return NextResponse.json({
      data: downloads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ data: [], pagination: { page: 1, limit: 15, total: 0, totalPages: 1 } });
  }
}
