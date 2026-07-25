import axios from 'axios';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

export interface UnshortenResult {
  pinId: string;
  canonicalUrl: string;
}

export async function unshortenUrl(inputUrl: string): Promise<UnshortenResult | null> {
  try {
    let targetUrl = inputUrl.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = `https://${targetUrl}`;
    }

    if (targetUrl.includes('pin.it')) {
      logger.info(`Resolving short link: ${targetUrl}`);
      const res = await axios.get(targetUrl, {
        maxRedirects: 10,
        headers: {
          'User-Agent': env.PINTEREST_USER_AGENT,
        },
        validateStatus: (status) => status >= 200 && status < 400,
      });

      targetUrl = res.request?.res?.responseUrl || res.config?.url || targetUrl;
      logger.info(`Resolved to: ${targetUrl}`);
    }

    // Match pin ID pattern: e.g. pinterest.com/pin/1149473431086687483/ or pinterest.com/pin/xyz123
    const pinIdMatch = targetUrl.match(/\/pin\/([0-9a-zA-Z_-]+)/);
    if (!pinIdMatch || !pinIdMatch[1]) {
      logger.warn(`Could not parse Pin ID from URL: ${targetUrl}`);
      return null;
    }

    const pinId = pinIdMatch[1];
    const canonicalUrl = `https://www.pinterest.com/pin/${pinId}/`;

    return { pinId, canonicalUrl };
  } catch (error: any) {
    logger.error(`Error unshortening URL ${inputUrl}: ${error.message}`);
    return null;
  }
}
