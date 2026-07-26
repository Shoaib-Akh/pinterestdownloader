import axios from 'import'; // wait, import is not correct, should be 'axios'
import axios from 'axios';
import * as cheerio from 'cheerio';
import { unshortenUrl } from '../helpers/unshortenUrl.js';

// Helper to decode Base64
function decodeBase64(str: string): string {
  try {
    return Buffer.from(str, 'base64').toString('utf8');
  } catch {
    return '';
  }
}

// Check if Pin ID matches (supports base64 and standard IDs)
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

// Main parser logic
function parsePinData(pinData: any, pinId: string) {
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
      return {
        success: true,
        pinId,
        title,
        type: 'video',
        thumbnail: getPinImageUrl(pinData),
        mediaUrl: videoUrl,
      };
    }
  }

  // 2. Check Story / Carousel Pins
  const storyPin = pinData.storyPinData || pinData.story_pin_data;
  if (storyPin && storyPin.pages && Array.isArray(storyPin.pages)) {
    const items: any[] = [];
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
              items.push({ url: imgUrl, type: 'image' });
            }
          }
        }
      }
    }

    if (isVideoStory && storyVideoUrl) {
      return {
        success: true,
        pinId,
        title,
        type: 'video',
        thumbnail: getPinImageUrl(pinData),
        mediaUrl: storyVideoUrl,
        items: items.length > 1 ? items : undefined,
      };
    }

    if (items.length > 0) {
      return {
        success: true,
        pinId,
        title,
        type: items.length > 1 ? 'carousel' : 'image',
        thumbnail: items[0].url,
        mediaUrl: items[0].url,
        items: items.length > 1 ? items : undefined,
      };
    }
  }

  // 3. Fallback to Images
  const imageUrl = getPinImageUrl(pinData);
  if (imageUrl) {
    const isGif = imageUrl.toLowerCase().endsWith('.gif') || pinData.is_quick_loop === true;
    return {
      success: true,
      pinId,
      title,
      type: isGif ? 'gif' : 'image',
      thumbnail: imageUrl,
      mediaUrl: imageUrl,
    };
  }

  return null;
}

function getPinImageUrl(pinData: any): string {
  const images = pinData.images || pinData.images_orig || pinData.imageSpec_236x;
  if (!images) return '';
  
  const url = images.orig?.url ||
              images.url ||
              images['1200x']?.url ||
              images['736x']?.url ||
              images['474x']?.url ||
              images['236x']?.url ||
              '';
              
  if (url) {
    return url.replace(/\/(236x|474x|736x)\//, '/originals/');
  }
  return '';
}

async function main() {
  const url = process.argv[2] || 'https://pin.it/2KubWi6Kd';
  console.log(`🌐 Testing extraction for: ${url}`);

  const resolved = await unshortenUrl(url);
  if (!resolved) {
    console.error('❌ Failed to unshorten URL');
    process.exit(1);
  }

  const { canonicalUrl, pinId } = resolved;
  console.log(`Canonical URL: ${canonicalUrl}`);
  console.log(`Pin ID: ${pinId}`);

  try {
    const response = await axios.get(canonicalUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    let scriptData: any = null;

    // Check #__PWS_DATA__
    const pwsDataHtml = $('#__PWS_DATA__').html();
    if (pwsDataHtml) {
      try {
        const parsed = JSON.parse(pwsDataHtml);
        const pinObj = findPinInObject(parsed, pinId);
        if (pinObj) {
          scriptData = pinObj;
        }
      } catch (err: any) {
        // ignore
      }
    }

    // Check __PWS_RELAY_REGISTER_COMPLETED_REQUEST__
    if (!scriptData) {
      $('script').each((i, elem) => {
        const content = $(elem).html() || '';
        if (content.includes('__PWS_RELAY_REGISTER_COMPLETED_REQUEST__')) {
          const startCall = content.indexOf('__PWS_RELAY_REGISTER_COMPLETED_REQUEST__(');
          if (startCall !== -1) {
            const endCall = content.lastIndexOf(');');
            const firstQuote = content.indexOf('"', startCall);
            const secondQuote = content.indexOf('"', firstQuote + 1);
            const commaIndex = content.indexOf(',', secondQuote);
            
            if (commaIndex !== -1 && endCall !== -1) {
              const jsonText = content.substring(commaIndex + 1, endCall).trim();
              try {
                const parsed = JSON.parse(jsonText);
                const pinObj = findPinInObject(parsed, pinId);
                if (pinObj) {
                  scriptData = pinObj;
                }
              } catch (err: any) {
                // ignore
              }
            }
          }
        }
      });
    }

    if (scriptData) {
      const result = parsePinData(scriptData, pinId);
      console.log('\n--- FINAL PARSED RESULT ---');
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log('❌ Could not find Pin object in any script.');
    }

  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

main().catch(console.error);
