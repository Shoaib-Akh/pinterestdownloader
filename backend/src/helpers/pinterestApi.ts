import axios from 'axios';
import * as cheerio from 'cheerio';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';
import { MediaResult, CarouselItem } from '../types/media.types.js';

export async function fetchPinData(pinId: string, canonicalUrl: string): Promise<MediaResult> {
  // Strategy 1: Pinterest PinResource API
  try {
    const apiUrl = `https://www.pinterest.com/resource/PinResource/get/`;
    const params = new URLSearchParams({
      source_url: `/pin/${pinId}/`,
      data: JSON.stringify({
        options: {
          id: pinId,
          field_set_key: 'detailed',
        },
        context: {},
      }),
    });

    const response = await axios.get(`${apiUrl}?${params.toString()}`, {
      headers: {
        'User-Agent': env.PINTEREST_USER_AGENT,
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Referer': 'https://www.pinterest.com/',
      },
      timeout: 10000,
    });

    const pinData = response.data?.resource_response?.data;
    if (pinData) {
      const result = parsePinData(pinData, pinId);
      if (result && result.mediaUrl) {
        logger.info(`PinResource API successfully extracted Pin ID ${pinId}`);
        return result;
      }
    }
  } catch (err: any) {
    logger.warn(`PinResource API failed for Pin ID ${pinId}: ${err.message}`);
  }

  // Strategy 2: HTML Script Scraping (__PJS_DATA__ / __INITIAL_STATE__)
  try {
    logger.info(`Attempting HTML JSON extraction for Pin ID ${pinId}`);
    const htmlRes = await axios.get(canonicalUrl, {
      headers: {
        'User-Agent': env.PINTEREST_USER_AGENT,
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(htmlRes.data);

    // Look for script tags with JSON state
    let scriptData: any = null;
    $('script').each((_, elem) => {
      const content = $(elem).html() || '';
      if (content.includes('__PJS_DATA__') || content.includes('__INITIAL_STATE__') || content.includes('PinResource')) {
        try {
          const jsonMatch = content.match(/(\{.*\})/s);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[1]);
            if (parsed) scriptData = parsed;
          }
        } catch {
          // ignore JSON parse error for script tags
        }
      }
    });

    if (scriptData) {
      // Traverse scriptData for pin details
      const pinObj = findPinInObject(scriptData, pinId);
      if (pinObj) {
        const result = parsePinData(pinObj, pinId);
        if (result && result.mediaUrl) {
          logger.info(`HTML Script data successfully extracted Pin ID ${pinId}`);
          return result;
        }
      }
    }

    // Direct og:image meta tag fallback
    const ogImage = $('meta[property="og:image"]').attr('content');
    const ogTitle = $('meta[property="og:title"]').attr('content') || $('title').text() || 'Pinterest Pin';
    const ogVideo = $('meta[property="og:video:secure_url"]').attr('content') || $('meta[property="og:video"]').attr('content');

    if (ogVideo) {
      return {
        success: true,
        pinId,
        title: cleanTitle(ogTitle),
        type: 'video',
        thumbnail: ogImage ? upgradeImageUrl(ogImage) : '',
        mediaUrl: ogVideo,
      };
    }

    if (ogImage) {
      const highResImage = upgradeImageUrl(ogImage);
      return {
        success: true,
        pinId,
        title: cleanTitle(ogTitle),
        type: highResImage.endsWith('.gif') ? 'gif' : 'image',
        thumbnail: highResImage,
        mediaUrl: highResImage,
      };
    }
  } catch (err: any) {
    logger.warn(`HTML extraction failed for Pin ID ${pinId}: ${err.message}`);
  }

  // Strategy 3: Pinterest oEmbed API fallback
  try {
    logger.info(`Attempting oEmbed fallback for Pin ID ${pinId}`);
    const oembedUrl = `https://www.pinterest.com/oembed.json?url=${encodeURIComponent(canonicalUrl)}`;
    const oembedRes = await axios.get(oembedUrl, { timeout: 8000 });
    if (oembedRes.data && oembedRes.data.url) {
      const highResImage = upgradeImageUrl(oembedRes.data.url);
      return {
        success: true,
        pinId,
        title: cleanTitle(oembedRes.data.title || 'Pinterest Pin'),
        type: highResImage.endsWith('.gif') ? 'gif' : 'image',
        thumbnail: highResImage,
        mediaUrl: highResImage,
      };
    }
  } catch (err: any) {
    logger.warn(`oEmbed fallback failed for Pin ID ${pinId}: ${err.message}`);
  }

  return {
    success: false,
    error: 'This pin is private, deleted, or unavailable.',
  };
}

function parsePinData(pinData: any, pinId: string): MediaResult | null {
  const title = cleanTitle(pinData.title || pinData.grid_title || pinData.description || 'Pinterest Pin');

  // Check Videos
  const videoList = pinData.videos?.video_list;
  if (videoList && typeof videoList === 'object') {
    let bestVideoUrl = '';
    // Priority: V_720P, V_HLSV4, V_EXP7, V_EXP5, any mp4
    const qualityKeys = ['V_720P', 'V_1080P', 'V_EXP7', 'V_EXP5', 'V_480P', 'V_360P', 'V_HLSV4'];
    for (const key of qualityKeys) {
      if (videoList[key]?.url) {
        bestVideoUrl = videoList[key].url;
        if (bestVideoUrl.endsWith('.mp4') || bestVideoUrl.includes('mp4')) break;
      }
    }

    if (!bestVideoUrl) {
      const keys = Object.keys(videoList);
      if (keys.length > 0 && videoList[keys[0]]?.url) {
        bestVideoUrl = videoList[keys[0]].url;
      }
    }

    const thumbnail = getPinImageUrl(pinData);

    if (bestVideoUrl) {
      return {
        success: true,
        pinId,
        title,
        type: 'video',
        thumbnail: upgradeImageUrl(thumbnail),
        mediaUrl: bestVideoUrl,
      };
    }
  }

  // Check Story / Carousel Pins
  const storyPinData = pinData.story_pin_data;
  if (storyPinData && storyPinData.pages && Array.isArray(storyPinData.pages) && storyPinData.pages.length > 1) {
    const items: CarouselItem[] = [];
    for (const page of storyPinData.pages) {
      const blocks = page.blocks;
      if (blocks && Array.isArray(blocks)) {
        for (const block of blocks) {
          if (block.type === 'video' && block.video?.video_list) {
            const vList = block.video.video_list;
            const firstVid = (Object.values(vList) as any[])[0];
            const vUrl = vList.V_720P?.url || vList.V_HLSV4?.url || firstVid?.url;
            if (vUrl) items.push({ url: vUrl, type: 'video' });
          } else if (block.type === 'image' && block.image?.images) {
            const imgUrl = getBestImageFromMap(block.image.images);
            if (imgUrl) items.push({ url: upgradeImageUrl(imgUrl), type: 'image' });
          }
        }
      }
    }

    if (items.length > 0) {
      const firstThumbnail = items[0].url;
      return {
        success: true,
        pinId,
        title,
        type: 'carousel',
        thumbnail: firstThumbnail,
        mediaUrl: firstThumbnail,
        items,
      };
    }
  }

  // Check Images / GIFs
  const imageUrl = getPinImageUrl(pinData);
  if (imageUrl) {
    const highResUrl = upgradeImageUrl(imageUrl);
    const isGif = highResUrl.toLowerCase().endsWith('.gif') || pinData.is_quick_loop === true;
    return {
      success: true,
      pinId,
      title,
      type: isGif ? 'gif' : 'image',
      thumbnail: highResUrl,
      mediaUrl: highResUrl,
    };
  }

  return null;
}

function getPinImageUrl(pinData: any): string {
  if (pinData.images) {
    return getBestImageFromMap(pinData.images);
  }
  return '';
}

function getBestImageFromMap(images: any): string {
  if (!images) return '';
  return (
    images.orig?.url ||
    images['1200x']?.url ||
    images['736x']?.url ||
    images['474x']?.url ||
    images['236x']?.url ||
    ''
  );
}

function upgradeImageUrl(url: string): string {
  if (!url) return '';
  // Replace thumbnail resolutions (/236x/, /474x/, /736x/) with /originals/
  return url.replace(/\/(236x|474x|736x)\//, '/originals/');
}

function cleanTitle(str: string): string {
  if (!str) return 'Pinterest Pin';
  return str.replace(/\s+/g, ' ').trim().slice(0, 150);
}

function findPinInObject(obj: any, pinId: string): any {
  if (!obj || typeof obj !== 'object') return null;
  if (obj.id === pinId && (obj.images || obj.videos)) return obj;

  for (const key of Object.keys(obj)) {
    try {
      const res = findPinInObject(obj[key], pinId);
      if (res) return res;
    } catch {
      // recursive safety check
    }
  }
  return null;
}
