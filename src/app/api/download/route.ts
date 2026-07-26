import { NextResponse } from 'next/server';
import { extractPinterestMedia } from '@/lib/pinterestExtractor';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid Pinterest URL is required.' },
        { status: 400 }
      );
    }

    // Extract media details using internal Pinterest extractor
    const result = await extractPinterestMedia(url);

    if (result.success) {
      // Record download analytics into PostgreSQL DB via Prisma asynchronously
      try {
        await prisma.download.create({
          data: {
            url,
            pinId: result?.pinId || null,
            mediaType: result.type || 'image',
            quality: 'original',
          },
        });
      } catch (dbErr) {
        console.warn('Prisma DB download recording warning:', dbErr);
      }
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Download route error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error processing download.' },
      { status: 500 }
    );
  }
}
