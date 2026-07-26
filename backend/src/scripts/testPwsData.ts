import fs from 'fs';
import * as cheerio from 'cheerio';

async function main() {
  try {
    const html = fs.readFileSync('pinterest_pin_debug.html', 'utf8');
    const $ = cheerio.load(html);

    const pwsDataHtml = $('#__PWS_DATA__').html();
    if (pwsDataHtml) {
      console.log('✅ Found #__PWS_DATA__!');
      console.log('Length:', pwsDataHtml.length);
      const parsed = JSON.parse(pwsDataHtml);
      console.log('Top level keys:', Object.keys(parsed));
      
      // Let's search for our Pin ID and video data inside it
      const pinId = '973129432211157554';
      
      // Recursive search function to find the pin object
      const findPinObj = (obj: any): any => {
        if (!obj || typeof obj !== 'object') return null;
        if (obj.id === pinId || obj.id === 'UGluOjk3MzEyOTQzMjIxMTE1NzU1NA==') {
          return obj;
        }
        for (const key of Object.keys(obj)) {
          const res = findPinObj(obj[key]);
          if (res) return res;
        }
        return null;
      };
      
      const pinObj = findPinObj(parsed);
      if (pinObj) {
        console.log('✅ Found Pin Object inside #__PWS_DATA__!');
        console.log('Keys of Pin Object:', Object.keys(pinObj));
        console.log('story_pin_data keys:', pinObj.story_pin_data ? Object.keys(pinObj.story_pin_data) : 'N/A');
        console.log('videos keys:', pinObj.videos ? Object.keys(pinObj.videos) : 'N/A');
        
        // Let's print the video or image data found
        console.log('Pin Type:', pinObj.type);
        if (pinObj.videos) {
          console.log('Videos:', JSON.stringify(pinObj.videos, null, 2));
        }
        if (pinObj.story_pin_data) {
          console.log('Story Pin Data Pages:', JSON.stringify(pinObj.story_pin_data.pages, null, 2).substring(0, 1000));
        }
      } else {
        console.log('❌ Could not find Pin Object for ID:', pinId);
      }
    } else {
      console.log('❌ Could not find #__PWS_DATA__ tag');
    }
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

main().catch(console.error);
