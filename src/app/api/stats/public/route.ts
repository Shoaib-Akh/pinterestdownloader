import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let totalDownloads = 0;
    let todayDownloads = 0;
    let hasRealData = false;

    try {
      const [totalCount, todayCount] = await Promise.all([
        prisma.download.count(),
        prisma.download.count({
          where: {
            createdAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
          },
        }),
      ]);

      if (totalCount > 0) {
        totalDownloads = totalCount;
        todayDownloads = todayCount;
        hasRealData = true;
      }
    } catch (dbErr) {
      console.warn('DB public stats query warning:', dbErr);
    }

    if (!hasRealData) {
      return NextResponse.json({
        success: false,
        totalDownloads: 0,
        todayDownloads: 0,
        supportedTypes: ['image', 'video', 'gif', 'carousel'],
      });
    }

    return NextResponse.json({
      success: true,
      totalDownloads,
      todayDownloads,
      supportedTypes: ['image', 'video', 'gif', 'carousel'],
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Unable to retrieve statistics',
    }, { status: 500 });
  }
}

