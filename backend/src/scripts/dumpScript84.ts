import fs from 'fs';
import * as cheerio from 'cheerio';

async function main() {
  try {
    const html = fs.readFileSync('pinterest_pin_debug.html', 'utf8');
    const $ = cheerio.load(html);

    $('script').each((i, elem) => {
      const content = $(elem).html() || '';
      if (content.includes('__PWS_RELAY_REGISTER_COMPLETED_REQUEST__') && content.includes('.m3u8')) {
        console.log(`Found it in Script ${i}!`);
        const matches = content.match(/__PWS_RELAY_REGISTER_COMPLETED_REQUEST__\((['"`])(.*?)\1/);
        if (matches) {
          const encoded = matches[2];
          const decoded = decodeURIComponent(encoded);
          fs.writeFileSync('script_84_decoded.json', decoded);
          console.log('Saved decoded script payload to script_84_decoded.json');
          
          const parsed = JSON.parse(decoded);
          console.log('Keys of parsed object:', Object.keys(parsed));
          if (parsed.response) {
            console.log('Keys of response:', Object.keys(parsed.response));
            if (parsed.response.data) {
              console.log('Keys of response.data:', Object.keys(parsed.response.data));
            }
          }
        }
      }
    });
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

main().catch(console.error);
