import axios from 'axios';
import * as cheerio from 'cheerio';
import { PinterestMediaResult } from '@/types';

export async function extractPinterestMedia(inputUrl: string): Promise<PinterestMediaResult> {
  try {
    // Clean input URL
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
    const response = await axios.get(cleanUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      maxRedirects: 5,
      timeout: 10000,
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Extract basic OpenGraph Metadata
    const title =
      $('meta[property="og:title"]').attr('content') ||
      $('title').text() ||
      'Pinterest Media Pin';
    let thumbnail = $('meta[property="og:image"]').attr('content') || '';
    let videoUrl =
      $('meta[property="og:video"]').attr('content') ||
      $('meta[property="og:video:secure_url"]').attr('content') ||
      '';

    // 2. Scan script tags for Pinterest JSON data (__PJS_DATA__ or initial-state)
    $('script').each((_, element) => {
      const scriptContent = $(element).html();
      if (scriptContent && (scriptContent.includes('video_list') || scriptContent.includes('images'))) {
        try {
          // Check for video stream URLs in JSON
          const videoMatch = scriptContent.match(/"url"\s*:\s*"([^"]+\.mp4[^"]*)"/);
          if (videoMatch && !videoUrl) {
            videoUrl = videoMatch[1].replace(/\\/g, '');
          }

          // Check for highest quality image URL in JSON
          const origImageMatch = scriptContent.match(/"originals"\s*:\s*\{\s*"url"\s*:\s*"([^"]+)"/);
          if (origImageMatch) {
            thumbnail = origImageMatch[1].replace(/\\/g, '');
          }
        } catch (e) {
          // Continue scanning if JSON parse fails
        }
      }
    });

    // 3. Upgrade lower-resolution image thumbnails to raw 100% HD originals
    let fullResImage = thumbnail;
    if (thumbnail) {
      // RegEx replaces thumbnail dimension segments (236x, 474x, 564x, 736x) with /originals/
      fullResImage = thumbnail.replace(/\/(236x|474x|564x|736x)\//, '/originals/');
    }

    // 4. Extract Pin ID from final URL if available
    const finalUrl = response.request?.res?.responseUrl || cleanUrl;
    const pinIdMatch = finalUrl.match(/\/pin\/([0-9a-zA-Z_-]+)/);
    const pinId = pinIdMatch ? pinIdMatch[1] : undefined;

    // 5. Return result structure
    if (videoUrl) {
      return {
        success: true,
        type: 'video',
        title,
        thumbnail: fullResImage || thumbnail,
        mediaUrl: videoUrl,
        pinId,
      };
    }

    const isGif = fullResImage.toLowerCase().endsWith('.gif') || fullResImage.includes('.gif');

    return {
      success: true,
      type: isGif ? 'gif' : 'image',
      title,
      thumbnail: fullResImage,
      mediaUrl: fullResImage,
      pinId,
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
