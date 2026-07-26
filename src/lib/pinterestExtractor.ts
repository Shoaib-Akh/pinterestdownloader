import axios from 'axios';
import * as cheerio from 'cheerio';
import { PinterestMediaResult } from '@/types';

// Constants
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

// Helper to decode Base64
function decodeBase64(str: string): string {
  try {
    return Buffer.from(str, 'base64').toString('utf8');
  } catch {
    return '';
  }
}

// Check if Pin ID matches
function isPinIdMatch(objId: any, targetPinId: string): boolean {
  if (!objId || typeof objId !== 'string') return false;
  if (objId === targetPinId) return true;
  if (objId.startsWith('UGluO')) {
    const decoded = decodeBase64(objId);
    return decoded.includes(targetPinId);
  }
  return false;
}

// Find Pin object inside parsed JSON
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

// Extract best video url from video list or videoDataV2
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

// Clean title
function cleanTitle(str: string): string {
  if (!str) return 'Pinterest Pin';
  return str.replace(/\s+/g, ' ').trim().slice(0, 150);
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

// Parse extracted Pin object
function parsePinData(pinData: any, pinId: string): Omit<PinterestMediaResult, 'success'> | null {
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
        type: 'video',
        title,
        thumbnail: upgradeImageUrl(thumbnail),
        mediaUrl: videoUrl,
        pinId,
      };
    }
  }

  // 2. Check Story / Carousel Pins
  const storyPin = pinData.storyPinData || pinData.story_pin_data;
  if (storyPin && storyPin.pages && Array.isArray(storyPin.pages)) {
    let isVideoStory = false;
    let storyVideoUrl = '';
    const imgUrls: string[] = [];

    for (const page of storyPin.pages) {
      const blocks = page.blocks;
      if (blocks && Array.isArray(blocks)) {
        for (const block of blocks) {
          if ((block.type === 'video' || block.__typename?.includes('Video') || block.videoDataV2) && block.videoDataV2) {
            const vUrl = extractVideoUrl(block.videoDataV2);
            if (vUrl) {
              isVideoStory = true;
              storyVideoUrl = vUrl;
            }
          } else if (block.type === 'image' || block.__typename?.includes('Image') || block.image) {
            const imgUrl = block.image?.images?.orig?.url || block.image?.url;
            if (imgUrl) {
              imgUrls.push(upgradeImageUrl(imgUrl));
            }
          }
        }
      }
    }

    if (isVideoStory && storyVideoUrl) {
      const thumbnail = getPinImageUrl(pinData);
      return {
        type: 'video',
        title,
        thumbnail: upgradeImageUrl(thumbnail),
        mediaUrl: storyVideoUrl,
        pinId,
      };
    }

    if (imgUrls.length > 0) {
      return {
        type: 'image',
        title,
        thumbnail: imgUrls[0],
        mediaUrl: imgUrls[0],
        pinId,
      };
    }
  }

  // 3. Check Images / GIFs
  const imageUrl = getPinImageUrl(pinData);
  if (imageUrl) {
    const highResUrl = upgradeImageUrl(imageUrl);
    const isGif = highResUrl.toLowerCase().endsWith('.gif') || pinData.is_quick_loop === true;
    return {
      type: isGif ? 'gif' : 'image',
      title,
      thumbnail: highResUrl,
      mediaUrl: highResUrl,
      pinId,
    };
  }

  return null;
}

export async function extractPinterestMedia(inputUrl: string): Promise<PinterestMediaResult> {
  try {
    const cleanUrl = inputUrl.trim();
    if (!cleanUrl.includes('pinterest.com') && !cleanUrl.includes('pin.it')) {
      return {
        success: false,
        type: 'image',
        title: '',
        thumbnail: '',
        mediaUrl: '',
        error: 'Please enter a valid Pinterest URL (e.g., https://pin.it/... or https://pinterest.com/pin/...)',
      };
    }

    // 1. Follow short link (pin.it) redirects to get the real canonical URL
    let targetUrl = cleanUrl;
    if (targetUrl.includes('pin.it')) {
      const res = await axios.get(targetUrl, {
        headers: { 'User-Agent': USER_AGENT },
        maxRedirects: 5,
        timeout: 10000,
        validateStatus: (status) => status >= 200 && status < 400,
      });
      targetUrl = res.request?.res?.responseUrl || res.config?.url || targetUrl;
    }

    const pinIdMatch = targetUrl.match(/\/pin\/([0-9a-zA-Z_-]+)/);
    if (!pinIdMatch || !pinIdMatch[1]) {
      return {
        success: false,
        type: 'image',
        title: '',
        thumbnail: '',
        mediaUrl: '',
        error: 'Could not parse Pin ID from Pinterest URL.',
      };
    }

    const pinId = pinIdMatch[1];
    const canonicalUrl = `https://www.pinterest.com/pin/${pinId}/`;

    // Strategy 1: PinResource API
    try {
      const apiUrl = `https://www.pinterest.com/resource/PinResource/get/`;
      const params = new URLSearchParams({
        source_url: `/pin/${pinId}/`,
        data: JSON.stringify({
          options: { id: pinId, field_set_key: 'detailed' },
          context: {},
        }),
      });

      const response = await axios.get(`${apiUrl}?${params.toString()}`, {
        headers: {
          'User-Agent': USER_AGENT,
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Referer': 'https://www.pinterest.com/',
        },
        timeout: 10000,
      });

      const pinData = response.data?.resource_response?.data;
      if (pinData) {
        const parsed = parsePinData(pinData, pinId);
        if (parsed && parsed.mediaUrl) {
          return { success: true, ...parsed };
        }
      }
    } catch {
      // fallback
    }

    // Strategy 2: HTML Scraping
    try {
      const htmlRes = await axios.get(canonicalUrl, {
        headers: {
          'User-Agent': USER_AGENT,
          'Accept-Language': 'en-US,en;q=0.9',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(htmlRes.data);
      let scriptData: any = null;

      // A. Check #__PWS_DATA__ tag
      const pwsDataHtml = $('#__PWS_DATA__').html();
      if (pwsDataHtml) {
        try {
          const parsed = JSON.parse(pwsDataHtml);
          const pinObj = findPinInObject(parsed, pinId);
          if (pinObj) scriptData = pinObj;
        } catch {
          // ignore
        }
      }

      // B. Check __PWS_RELAY_REGISTER_COMPLETED_REQUEST__ scripts
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
                  if (pinObj) scriptData = pinObj;
                }
              }
            } catch {
              // ignore
            }
          }
        });
      }

      // C. Check Legacy state variables
      if (!scriptData) {
        $('script').each((_, elem) => {
          const content = $(elem).html() || '';
          if (content.includes('__PJS_DATA__') || content.includes('__INITIAL_STATE__')) {
            try {
              const jsonMatch = content.match(/(\{.*\})/s);
              if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[1]);
                const pinObj = findPinInObject(parsed, pinId);
                if (pinObj) scriptData = pinObj;
              }
            } catch {
              // ignore
            }
          }
        });
      }

      if (scriptData) {
        const parsed = parsePinData(scriptData, pinId);
        if (parsed && parsed.mediaUrl) {
          return { success: true, ...parsed };
        }
      }

      // OG Meta tags
      const ogImage = $('meta[property="og:image"]').attr('content');
      const ogTitle = $('meta[property="og:title"]').attr('content') || $('title').text() || 'Pinterest Pin';
      const ogVideo = $('meta[property="og:video:secure_url"]').attr('content') || $('meta[property="og:video"]').attr('content');

      if (ogVideo) {
        return {
          success: true,
          type: 'video',
          title: cleanTitle(ogTitle),
          thumbnail: ogImage ? upgradeImageUrl(ogImage) : '',
          mediaUrl: ogVideo,
          pinId,
        };
      }

      if (ogImage) {
        const highResImage = upgradeImageUrl(ogImage);
        return {
          success: true,
          type: highResImage.endsWith('.gif') ? 'gif' : 'image',
          title: cleanTitle(ogTitle),
          thumbnail: highResImage,
          mediaUrl: highResImage,
          pinId,
        };
      }
    } catch {
      // fallback
    }

    // Strategy 3: oEmbed API
    try {
      const oembedUrl = `https://www.pinterest.com/oembed.json?url=${encodeURIComponent(canonicalUrl)}`;
      const oembedRes = await axios.get(oembedUrl, { timeout: 8000 });
      if (oembedRes.data && oembedRes.data.url) {
        const highResImage = upgradeImageUrl(oembedRes.data.url);
        return {
          success: true,
          type: highResImage.endsWith('.gif') ? 'gif' : 'image',
          title: cleanTitle(oembedRes.data.title || 'Pinterest Pin'),
          thumbnail: highResImage,
          mediaUrl: highResImage,
          pinId,
        };
      }
    } catch {
      // fallback
    }

    return {
      success: false,
      type: 'image',
      title: '',
      thumbnail: '',
      mediaUrl: '',
      error: 'Failed to extract media from this pin. Make sure the pin is public.',
    };
  } catch (error: any) {
    console.error('Pinterest extraction error:', error.message);
    return {
      success: false,
      type: 'image',
      title: '',
      thumbnail: '',
      mediaUrl: '',
      error: 'Failed to parse Pinterest link. Make sure the pin is public and try again.',
    };
  }
}
