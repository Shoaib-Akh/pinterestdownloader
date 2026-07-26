import { extractMedia } from '../helpers/extractMedia.js';

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error('❌ Please provide a Pinterest Pin URL. Example:');
    console.error('   npx tsx src/scripts/testDownload.ts "https://www.pinterest.com/pin/746401338258284566/"');
    process.exit(1);
  }

  console.log(`🔍 Testing extraction for: ${url}`);
  
  try {
    const result = await extractMedia(url);
    if (result.success) {
      console.log('✅ Extraction successful!');
      console.log('Media Details:');
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.error('❌ Extraction failed!');
      console.error('Error:', result.error);
    }
  } catch (error: any) {
    console.error('💥 Unexpected error during test:');
    console.error(error);
  }
}

main().catch(console.error);
