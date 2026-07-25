import { unshortenUrl } from './unshortenUrl.js';
import { fetchPinData } from './pinterestApi.js';
import { MediaResult } from '../types/media.types.js';
import { logger } from '../config/logger.js';

export async function extractMedia(inputUrl: string): Promise<MediaResult> {
  if (!inputUrl || typeof inputUrl !== 'string') {
    return {
      success: false,
      error: 'A valid Pinterest URL string is required.',
    };
  }

  // 1. Unshorten URL & extract Pin ID
  const resolved = await unshortenUrl(inputUrl);
  if (!resolved || !resolved.pinId) {
    return {
      success: false,
      error: 'Invalid Pinterest URL. Please paste a valid pin.it link or pinterest.com/pin/ URL.',
    };
  }

  logger.info(`Extracting media for Pin ID: ${resolved.pinId} (${resolved.canonicalUrl})`);

  // 2. Fetch Pin Data using Pinterest internal API / fallbacks
  const result = await fetchPinData(resolved.pinId, resolved.canonicalUrl);

  if (!result.success || !result.mediaUrl) {
    return {
      success: false,
      error: result.error || 'Failed to extract media from this pin. Make sure the pin is public.',
    };
  }

  return result;
}
