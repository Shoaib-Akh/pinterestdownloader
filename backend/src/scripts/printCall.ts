import fs from 'fs';

async function main() {
  try {
    const html = fs.readFileSync('pinterest_pin_debug.html', 'utf8');
    const index = html.indexOf('__PWS_RELAY_REGISTER_COMPLETED_REQUEST__');
    if (index !== -1) {
      console.log(`Found __PWS_RELAY_REGISTER_COMPLETED_REQUEST__ at index ${index}`);
      // Let's print the next 2000 characters
      console.log(html.substring(index, index + 2000));
    }
  } catch (error: any) {
    console.error(error);
  }
}

main().catch(console.error);
