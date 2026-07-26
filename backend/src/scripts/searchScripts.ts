import fs from 'fs';
import * as cheerio from 'cheerio';

async function main() {
  try {
    const html = fs.readFileSync('pinterest_pin_debug.html', 'utf8');
    const $ = cheerio.load(html);

    $('script').each((i, elem) => {
      const content = $(elem).html() || '';
      if (content.includes('.m3u8')) {
        console.log(`\n🎥 Script ${i} contains ".m3u8"!`);
        console.log(`Length: ${content.length}`);
        console.log(`Start of script: ${content.substring(0, 300)}`);
        
        // Let's decode if it's __PWS_RELAY_REGISTER_COMPLETED_REQUEST__
        if (content.includes('__PWS_RELAY_REGISTER_COMPLETED_REQUEST__')) {
          console.log(`This is a __PWS_RELAY_REGISTER_COMPLETED_REQUEST__ script!`);
        } else {
          console.log(`This is a regular script tag.`);
        }
      }
    });
  } catch (error: any) {
    console.error('❌ Error reading file:', error.message);
  }
}

main().catch(console.error);
