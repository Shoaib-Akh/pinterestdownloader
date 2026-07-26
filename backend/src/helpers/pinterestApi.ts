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
  // Strategy 2: HTML Script Scraping & Relay completed requests
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
    let scriptData: any = null;

    // A. Check #__PWS_DATA__ tag first (modern Pinterest layout data)
    const pwsDataHtml = $('#__PWS_DATA__').html();
    if (pwsDataHtml) {
      try {
        const parsed = JSON.parse(pwsDataHtml);
        const pinObj = findPinInObject(parsed, pinId);
        if (pinObj) {
          logger.info(`Successfully found Pin ID ${pinId} in #__PWS_DATA__`);
          scriptData = pinObj;
        }
      } catch (err: any) {
        logger.warn(`Failed to parse #__PWS_DATA__ JSON: ${err.message}`);
      }
    }

    // B. Check __PWS_RELAY_REGISTER_COMPLETED_REQUEST__ scripts (GraphQL response payloads)
    if (!scriptData) {
      $('script').each((_, elem) => {
        const content = $(elem).html() || '';
        if (content.includes('__PWS_RELAY_REGISTER_COMPLETED_REQUEST__')) {
          try {
            const startCall = content.indexOf('__PWS_RELAY_REGISTER_COMPLETED_REQUEST__(');
            if (startCall !== -1) {
              const endCall = content.lastIndexOf(');');
              const firstQuote = content.indexOf('"', startCall);
              const secondQuote = content.indexOf('"', firstQuote + 1);
              const commaIndex = content.indexOf(',', secondQuote);
              
              if (commaIndex !== -1 && endCall !== -1) {
                const jsonText = content.substring(commaIndex + 1, endCall).trim();
                const parsed = JSON.parse(jsonText);
                const pinObj = findPinInObject(parsed, pinId);
                if (pinObj) {
                  logger.info(`Successfully found Pin ID ${pinId} in __PWS_RELAY_REGISTER_COMPLETED_REQUEST__`);
                  scriptData = pinObj;
                }
              }
            }
          } catch (err: any) {
            // ignore malformed JSON or parsing errors for individual script tags
          }
        }
      });
    }

    // C. Fallback: Legacy JSON state tags (__PJS_DATA__ / __INITIAL_STATE__)
    if (!scriptData) {
      $('script').each((_, elem) => {
        const content = $(elem).html() || '';
        if (content.includes('__PJS_DATA__') || content.includes('__INITIAL_STATE__') || content.includes('PinResource')) {
          try {
            const jsonMatch = content.match(/(\{.*\})/s);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[1]);
              const pinObj = findPinInObject(parsed, pinId);
              if (pinObj) {
                logger.info(`Successfully found Pin ID ${pinId} in legacy scripts`);
                scriptData = pinObj;
              }
            }
          } catch {
            // ignore
          }
        }
      });
    }

    if (scriptData) {
      const result = parsePinData(scriptData, pinId);
      if (result && result.mediaUrl) {
        logger.info(`HTML Script data successfully extracted Pin ID ${pinId}`);
        return result;
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

function decodeBase64(str: string): string {
  try {
    return Buffer.from(str, 'base64').toString('utf8');
  } catch {
    return '';
  }
}

function isPinIdMatch(objId: any, targetPinId: string): boolean {
  if (!objId || typeof objId !== 'string') return false;
  if (objId === targetPinId) return true;
  if (objId.startsWith('UGluO')) {
    const decoded = decodeBase64(objId);
    return decoded.includes(targetPinId);
  }
  return false;
}

function findPinInObject(obj: any, pinId: string): any {
  if (!obj || typeof obj !== 'object') return null;
  
  if (
    (isPinIdMatch(obj.id, pinId) || isPinIdMatch(obj.entityId, pinId)) &&
    (obj.images || obj.videos || obj.storyPinData || obj.story_pin_data || obj.images_orig)
  ) {
    return obj;
  }

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

function extractVideoUrl(videoData: any): string {
  if (!videoData || typeof videoData !== 'object') return '';
  
  if (typeof videoData.url === 'string' && videoData.url.includes('.mp4')) {
    return videoData.url;
  }

  const urls: string[] = [];
  const searchUrls = (obj: any) => {
    if (!obj) return;
    if (typeof obj === 'string') {
      if (obj.startsWith('http') && (obj.includes('.mp4') || obj.includes('/expMp4/'))) {
        urls.push(obj);
      }
      return;
    }
    if (typeof obj === 'object') {
      const keys = Object.keys(obj).sort((a, b) => {
        const priority = (k: string) => {
          if (k.includes('720') || k.includes('1080')) return 1;
          if (k.includes('EXP') || k.includes('v_')) return 2;
          return 3;
        };
        return priority(a) - priority(b);
      });
      for (const key of keys) {
        searchUrls(obj[key]);
      }
    }
  };

  searchUrls(videoData);
  if (urls.length > 0) {
    return urls[0];
  }

  const hlsUrls: string[] = [];
  const searchHls = (obj: any) => {
    if (!obj) return;
    if (typeof obj === 'string') {
      if (obj.startsWith('http') && (obj.includes('.m3u8') || obj.includes('/hls/'))) {
        hlsUrls.push(obj);
      }
      return;
    }
    if (typeof obj === 'object') {
      for (const key of Object.keys(obj)) {
        searchHls(obj[key]);
      }
    }
  };
  searchHls(videoData);
  return hlsUrls[0] || '';
}

function parsePinData(pinData: any, pinId: string): MediaResult | null {
  const title = cleanTitle(
    pinData.title ||
    pinData.grid_title ||
    pinData.seoTitle ||
    pinData.description ||
    pinData.gridDescription ||
    'Pinterest Pin'
  );

  // 1. Check Standard Videos
  const videoList = pinData.videos?.video_list || pinData.videos;
  if (videoList) {
    const videoUrl = extractVideoUrl(videoList);
    if (videoUrl) {
      const thumbnail = getPinImageUrl(pinData);
      return {
        success: true,
        pinId,
        title,
        type: 'video',
        thumbnail: upgradeImageUrl(thumbnail),
        mediaUrl: videoUrl,
      };
    }
  }

  // 2. Check Story / Carousel Pins
  const storyPin = pinData.storyPinData || pinData.story_pin_data;
  if (storyPin && storyPin.pages && Array.isArray(storyPin.pages)) {
    const items: CarouselItem[] = [];
    let isVideoStory = false;
    let storyVideoUrl = '';

    for (const page of storyPin.pages) {
      const blocks = page.blocks;
      if (blocks && Array.isArray(blocks)) {
        for (const block of blocks) {
          if ((block.type === 'video' || block.__typename?.includes('Video') || block.videoDataV2) && block.videoDataV2) {
            const vUrl = extractVideoUrl(block.videoDataV2);
            if (vUrl) {
              isVideoStory = true;
              storyVideoUrl = vUrl;
              items.push({ url: vUrl, type: 'video' });
            }
          } else if (block.type === 'image' || block.__typename?.includes('Image') || block.image) {
            const imgUrl = block.image?.images?.orig?.url || block.image?.url;
            if (imgUrl) {
              items.push({ url: upgradeImageUrl(imgUrl), type: 'image' });
            }
          }
        }
      }
    }

    if (isVideoStory && storyVideoUrl) {
      const thumbnail = getPinImageUrl(pinData);
      return {
        success: true,
        pinId,
        title,
        type: 'video',
        thumbnail: upgradeImageUrl(thumbnail),
        mediaUrl: storyVideoUrl,
        items: items.length > 1 ? items : undefined,
      };
    }

    if (items.length > 0) {
      const firstThumbnail = items[0].url;
      return {
        success: true,
        pinId,
        title,
        type: items.length > 1 ? 'carousel' : 'image',
        thumbnail: firstThumbnail,
        mediaUrl: firstThumbnail,
        items: items.length > 1 ? items : undefined,
      };
    }
  }

  // 3. Check Images / GIFs
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
  const images = pinData.images || pinData.images_orig || pinData.imageSpec_236x;
  if (!images) return '';
  return (
    images.orig?.url ||
    images.url ||
    images['1200x']?.url ||
    images['736x']?.url ||
    images['474x']?.url ||
    images['236x']?.url ||
    ''
  );
}

function upgradeImageUrl(url: string): string {
  if (!url) return '';
  return url.replace(/\/(236x|474x|736x)\//, '/originals/');
}

function cleanTitle(str: string): string {
  if (!str) return 'Pinterest Pin';
  return str.replace(/\s+/g, ' ').trim().slice(0, 150);
}

