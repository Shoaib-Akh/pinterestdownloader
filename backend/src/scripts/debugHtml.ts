import axios from 'axios';
import * as cheerio from 'cheerio';
import { unshortenUrl } from '../helpers/unshortenUrl.js';

async function main() {
  const inputUrl = process.argv[2] || 'https://pin.it/2KubWi6Kd';
  console.log(`🔍 Input URL: ${inputUrl}`);

  const resolved = await unshortenUrl(inputUrl);
  if (!resolved) {
    console.error('❌ Failed to unshorten URL');
    process.exit(1);
  }

  const { canonicalUrl, pinId } = resolved;
  console.log(`Resolved Pin ID: ${pinId}`);
  console.log(`Resolved Canonical URL: ${canonicalUrl}`);

  console.log(`🌐 Fetching HTML...`);

  try {
    const response = await axios.get(canonicalUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);

    console.log('\n--- META TAGS ---');
    $('meta').each((_, elem) => {
      const name = $(elem).attr('name') || $(elem).attr('property');
      const content = $(elem).attr('content');
      if (name && (name.includes('og:') || name.includes('video') || name.includes('image') || name.includes('twitter:'))) {
        console.log(`${name}: ${content}`);
      }
    });

    console.log('\n--- SCRIPT TAGS ---');
    $('script').each((i, elem) => {
      const src = $(elem).attr('src');
      const content = $(elem).html() || '';
      
      if (content.includes('__PWS_RELAY_REGISTER_COMPLETED_REQUEST__')) {
        console.log(`\n[Script ${i}] Contains __PWS_RELAY_REGISTER_COMPLETED_REQUEST__`);
        const matches = content.match(/__PWS_RELAY_REGISTER_COMPLETED_REQUEST__\((['"`])(.*?)\1/g);
        if (matches) {
          matches.forEach((match, idx) => {
            try {
              const stringMatch = match.match(/__PWS_RELAY_REGISTER_COMPLETED_REQUEST__\((['"`])(.*?)\1/);
              if (stringMatch) {
                const encoded = stringMatch[2];
                const decoded = decodeURIComponent(encoded);
                const parsed = JSON.parse(decoded);
                console.log(`   Match ${idx} queryID:`, parsed.queryID || parsed.name);
                
                // search for mp4 / m3u8
                const videoUrls: string[] = [];
                const searchUrls = (obj: any) => {
                  if (!obj) return;
                  if (typeof obj === 'string') {
                    if (obj.includes('.mp4') || obj.includes('.m3u8')) {
                      videoUrls.push(obj);
                    }
                    return;
                  }
                  if (typeof obj === 'object') {
                    for (const key of Object.keys(obj)) {
                      searchUrls(obj[key]);
                    }
                  }
                };
                searchUrls(parsed);
                if (videoUrls.length > 0) {
                  console.log(`   🎥 Found video URLs!`, videoUrls);
                }
              }
            } catch (err: any) {
              console.error(`   Failed to parse Match ${idx}:`, err.message);
            }
          });
        }
      } else if (content.includes('__PJS_DATA__') || content.includes('__INITIAL_STATE__') || content.includes('PinResource')) {
        console.log(`\n[Script ${i}] Contains JSON/State Keywords (PJS/InitialState/PinResource)`);
        console.log(`Length: ${content.length}`);
        
        // Let's print occurrences of mp4 / m3u8 / video in this script
        const matches = content.match(/"[^"]*?\.(?:mp4|m3u8)[^"]*?"/g);
        if (matches) {
          console.log(`   🎥 Found video URLs directly in string literals:`, matches);
        }
      }
    });

  } catch (error: any) {
    console.error('❌ Error fetching HTML:', error.message);
  }
}

main().catch(console.error);
