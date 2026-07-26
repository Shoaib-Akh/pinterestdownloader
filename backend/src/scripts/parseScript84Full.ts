import fs from 'fs';
import * as cheerio from 'cheerio';

async function main() {
  try {
    const html = fs.readFileSync('pinterest_pin_debug.html', 'utf8');
    const $ = cheerio.load(html);

    $('script').each((i, elem) => {
      const content = $(elem).html() || '';
      if (content.includes('__PWS_RELAY_REGISTER_COMPLETED_REQUEST__') && content.includes('.m3u8')) {
        const startCall = content.indexOf('__PWS_RELAY_REGISTER_COMPLETED_REQUEST__(');
        if (startCall !== -1) {
          const endCall = content.lastIndexOf(');');
          const firstQuote = content.indexOf('"', startCall);
          const secondQuote = content.indexOf('"', firstQuote + 1);
          const commaIndex = content.indexOf(',', secondQuote);
          
          if (commaIndex !== -1 && endCall !== -1) {
            const secondArgText = content.substring(commaIndex + 1, endCall).trim();
            const responseData = new Function(`return ${secondArgText};`)();
            fs.writeFileSync('script_84_response.json', JSON.stringify(responseData, null, 2));
            console.log('Saved responseData to script_84_response.json');
          }
        }
      }
    });
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

main().catch(console.error);
