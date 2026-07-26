import { Request, Response } from 'express';
import crypto from 'crypto';
import { extractMedia } from '../helpers/extractMedia.js';
import { getCache, setCache } from '../config/redis.js';
import { prisma } from '../config/database.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { logger } from '../config/logger.js';

export async function handleDownload(req: Request, res: Response) {
  try {
    const { url } = req.body;

    // Check Redis cache first using unshortened pinId if available
    const pinIdMatch = url.match(/\/pin\/([0-9a-zA-Z_-]+)/);
    const pinId = pinIdMatch ? pinIdMatch[1] : null;

    if (pinId) {
      const cachedData = await getCache(`download:${pinId}`);
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          logger.info(`Cache HIT for Pin ID: ${pinId}`);
          return successResponse(res, { ...parsed, cached: true });
        } catch {
          // ignore parse error, proceed to fetch fresh
        }
      }
    }

    const result = await extractMedia(url);

    if (!result.success) {
      return errorResponse(res, result.error || 'Failed to extract Pinterest media.', 422);
    }

    // Cache successful result for 1 hour (3600 seconds)
    const targetPinId = result?.pinId || pinId;
    if (targetPinId) {
      await setCache(`download:${targetPinId}`, 3600, JSON.stringify(result));
    }

    // Asynchronously log download record & increment analytics
    logDownloadAndAnalytics(url, result, req).catch((err) => {
      logger.warn(`Failed to log download to database: ${err.message}`);
    });

    return successResponse(res, { ...result, cached: false });
  } catch (error: any) {
    return errorResponse(res, error.message || 'Server error processing download.', 500);
  }
}

export async function handlePreview(req: Request, res: Response) {
  try {
    const { url } = req.body;
    const result = await extractMedia(url);

    if (!result.success) {
      return errorResponse(res, result.error || 'Failed to generate preview.', 422);
    }

    return successResponse(res, {
      title: result.title,
      type: result.type,
      thumbnail: result.thumbnail,
    });
  } catch (error: any) {
    return errorResponse(res, error.message || 'Server error generating preview.', 500);
  }
}

export async function handleHealth(req: Request, res: Response) {
  return res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}

async function logDownloadAndAnalytics(url: string, result: any, req: Request) {
  try {
    const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const country = (req.headers['cf-ipcountry'] as string) || 'Unknown';

    await prisma.download.create({
      data: {
        url,
        pinId: result?.pinId || null,
        mediaType: result.type || 'unknown',
        quality: 'original',
        country,
        browser: parseBrowser(userAgent),
        device: parseDevice(userAgent),
        ipHash,
      },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.analytics.upsert({
      where: {
        page_date: {
          page: '/',
          date: today,
        },
      },
      update: {
        downloads: { increment: 1 },
      },
      create: {
        page: '/',
        downloads: 1,
        date: today,
      },
    });
  } catch {
    // Database connection silent fallback
  }
}

function parseBrowser(ua: string): string {
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edge')) return 'Edge';
  return 'Other';
}

function parseDevice(ua: string): string {
  if (/mobile/i.test(ua)) return 'Mobile';
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  return 'Desktop';
}
