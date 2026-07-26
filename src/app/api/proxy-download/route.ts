import { NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mediaUrl = searchParams.get('url');
    const filename = searchParams.get('filename') || 'pinterest_download.mp4';

    if (!mediaUrl) {
      return new NextResponse('Media URL parameter missing', { status: 400 });
    }

    // Stream or fetch media content from Pinterest CDN
    const response = await axios({
      method: 'GET',
      url: mediaUrl,
      responseType: 'arraybuffer',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://www.pinterest.com/',
      },
    });

    const contentType = String(response.headers['content-type'] || 'video/mp4');

    return new NextResponse(response.data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error: any) {
    console.error('Proxy download route error:', error.message);
    return new NextResponse('Failed to stream media file.', { status: 500 });
  }
}
