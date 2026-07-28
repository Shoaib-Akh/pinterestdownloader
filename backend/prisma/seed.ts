import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting full database seeding...');

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@pintsave.app';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminSecret123!';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword, role: 'ADMIN' },
    create: { email: adminEmail, password: hashedPassword, role: 'ADMIN' },
  });
  console.log(`👤 Admin user seeded: ${adminEmail}`);

  // 2. Seed FAQs
  await prisma.fAQ.deleteMany({});
  const faqs = [
    {
      question: 'How to download Pinterest videos on iPhone or Android?',
      answer:
        'Open the Pinterest app, tap Share on your desired pin, and select "Copy Link". Paste the link into PintSave, click Download, and tap "Download HD Video" to save directly to your device camera roll or gallery.',
      order: 1,
      published: true,
    },
    {
      question: 'Is PintSave 100% free to use?',
      answer:
        'Yes! PintSave is 100% free with no hidden fees, subscription plans, software downloads, or browser extension requirements.',
      order: 2,
      published: true,
    },
    {
      question: 'Do I need to create an account or log in?',
      answer:
        'No registration or account login is required. You can download videos, images, and animated GIFs anonymously.',
      order: 3,
      published: true,
    },
    {
      question: 'What quality resolution will my downloaded media have?',
      answer:
        'PintSave automatically strips low-resolution thumbnail constraints and resolves the 100% original uncompressed photo, high-bitrate MP4 video (720p/1080p), or HD GIF source.',
      order: 4,
      published: true,
    },
    {
      question: 'Is it safe and legal to save Pinterest media?',
      answer:
        'Yes, downloading content for personal offline inspiration, design backup, or archiving is safe and legal. Please adhere to copyright guidelines if re-using media commercially.',
      order: 5,
      published: true,
    },
    {
      question: 'Why is my Pinterest link not working?',
      answer:
        'Ensure the pin URL is public and copied directly from the Pinterest app or website (e.g., https://pin.it/... or https://pinterest.com/pin/...). Private board links cannot be resolved.',
      order: 6,
      published: true,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
  }
  console.log(`❓ ${faqs.length} FAQs seeded.`);

  // 3. Seed Blog Posts
  await prisma.blog.deleteMany({});
  const posts = [
    {
      id: 'blog-1',
      title: 'What is Pinterest & How Does It Work? A Complete Guide for Creators',
      slug: 'what-is-pinterest-and-how-it-works-guide',
      excerpt:
        'Discover what Pinterest is, how visual discovery boards work, and why creators use PintSave to save videos, 4K images, and GIFs for offline reference.',
      content: `Pinterest is one of the world's most expansive visual search engines and bookmarking hubs. Unlike traditional social media platforms where content feeds expire quickly, Pinterest operates as a digital catalog where millions of users curate ideas for home decor, fashion lookbooks, recipe tutorials, and visual design.

### What is a Pin & How Do Boards Work?
Every piece of content on Pinterest is called a **Pin**. Pins consist of images, video clips, or animated GIFs linked back to original web sources. Users categorize these pins into curated collections called **Boards**.

### Why Do Creators Need a Pinterest Media Downloader?
While Pinterest is fantastic for online browsing, the official application has notable limitations when saving media for offline use:
- **No Native Video Saver**: The official app does not provide a button to save MP4 video reels or recipe clips directly to your mobile phone gallery.
- **Compressed Image Preview Files**: Saving photos directly from web browser grids downloads compressed 736px thumbnail images rather than the full-resolution master photo.
- **Frozen Animated GIFs**: Long-pressing GIFs on mobile browsers often flattens the animation into a frozen keyframe.

### How PintSave Solves These Problems
That is where [PintSave Main Engine](/) comes in. PintSave is an automated media extraction tool engineered specifically to resolve direct source links hosted on Pinterest CDN servers:
- Use our dedicated [Pinterest Video Downloader](/pinterest-video-downloader) to save 1080p HD MP4 videos with full audio.
- Use our [Pinterest Image Downloader](/pinterest-image-downloader) to extract uncompressed 4K master photos for high-DPI printing and design moodboards.
- Use our [Pinterest GIF Downloader](/pinterest-gif-downloader) to preserve full-motion frame rate animations.

Learn more about our mission on the [About PintSave](/about) page or explore our index on the [XML Sitemap](/sitemap.ts).`,
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      published: true,
      publishedAt: new Date('2026-07-25T10:00:00.000Z'),
    },
    {
      id: 'blog-2',
      title: 'Why Use PintSave to Save Pinterest Videos, Photos & Animated GIFs?',
      slug: 'why-use-pintsave-pinterest-video-downloader',
      excerpt:
        'Explore why thousands of visual artists, designers, and curators prefer PintSave for watermark-free 1080p MP4 extractions and 4K master photos.',
      content: `When searching for online video and photo downloaders, users are often confronted with intrusive popups, mandatory account signups, slow waiting queues, and quality-reducing watermarks. PintSave was created to offer a clean, fast, and privacy-first solution.

### Core Advantages of PintSave
Here is why creators choose PintSave over generic downloader sites:

- **100% Watermark-Free**: We never stamp logos, brand overlays, or site watermarks over your downloaded media files. You get clean original files.
- **Zero Registration & Anonymous**: You do not need to disclose your email address, register an account, or log in with social profiles.
- **Sub-Second Direct CDN Extractions**: Our system processes public CDN metadata in under 1 second without forcing you to wait in slow queue lines.
- **Universal Mobile & Desktop Support**: Works effortlessly on iOS Safari, Android Chrome, macOS, and Windows PC.

### Specialized Extraction Tools
PintSave offers dedicated pages tailored to specific media types:
1. Extract high-bitrate video clips on the [Pinterest Video Downloader](/pinterest-video-downloader).
2. Download master 4K photos on the [Pinterest Image Downloader](/pinterest-image-downloader).
3. Save looping reaction animations on the [Pinterest GIF Downloader](/pinterest-gif-downloader).

Have questions or feedback? Feel free to reach out via the [Contact PintSave Team](/contact) page or visit the [PintSave Home](/) engine.`,
      coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      published: true,
      publishedAt: new Date('2026-07-22T14:30:00.000Z'),
    },
    {
      id: 'blog-3',
      title: 'How to Download Pinterest Videos on iPhone & Android (2026 Tutorial)',
      slug: 'how-to-download-pinterest-videos-iphone',
      excerpt:
        'Step-by-step tutorial on saving high-definition MP4 videos from Pinterest directly to your iOS Camera Roll or Android Gallery without watermarks.',
      content: `Pinterest is packed with stunning video pins, DIY tutorials, recipe clips, and aesthetic video reels. However, the official Pinterest iOS and Android apps do not provide a native button to save video files directly to your smartphone Camera Roll.

### Step 1: Copy the Video Pin Link
1. Open the **Pinterest app** on your iPhone or Android device.
2. Navigate to the video pin you wish to download.
3. Tap the **Share icon** (the arrow button in the bottom right corner).
4. Tap **Copy Link** to copy the URL to your clipboard.

### Step 2: Open PintSave in Mobile Browser
1. Switch to Safari (on iOS) or Chrome (on Android).
2. Open the [Pinterest Video Downloader](/pinterest-video-downloader) or visit [PintSave Home](/).
3. Paste your copied Pinterest URL into the input search bar.

### Step 3: Save Directly to Camera Roll / Gallery
1. Tap the **Download** button to extract the MP4 stream.
2. Tap **Download HD Video**. 
3. On iOS Safari, tap *Download* in the browser prompt, open Safari Downloads, tap Share, and select **Save Video** to transfer it directly into your Photos app!
4. On Android, the MP4 file automatically saves directly into your device Gallery and Downloads directory.

Learn more about our mobile extraction capabilities on the [About PintSave](/about) page or test our [Pinterest Image Downloader](/pinterest-image-downloader).`,
      coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
      published: true,
      publishedAt: new Date('2026-07-20T10:00:00.000Z'),
    },
    {
      id: 'blog-4',
      title: 'Pinterest Image Downloader: Save Photos in Original 4K HD Quality',
      slug: 'pinterest-image-downloader-hd-guide',
      excerpt:
        'Discover how PintSave bypasses compressed browser thumbnail constraints to extract original 4K and uncompressed Pinterest photos.',
      content: `Pinterest stores images in multiple resolution tiers to ensure fast page loads across web feeds. When you right-click and save an image from your web browser grid, you usually end up saving a low-resolution thumbnail.

### Understanding Pinterest Image Resolutions
When a photographer or creator uploads a high-resolution photo to Pinterest, the platform generates several scaled file tiers:
- **236px**: Small grid preview thumbnail
- **474px**: Mobile feed thumbnail
- **736px**: Expanded pin modal preview
- **Originals**: The 100% uncompressed master photo (4K / 8K resolution)

### How PintSave Unlocks Original Quality
PintSave's extraction engine inspects the pin payload directly to resolve the direct link to the /originals/ file path on the CDN. This ensures you get the exact pixel-for-pixel master file uploaded by the artist.

### Primary Use Cases for 4K Photo Downloads
- **Graphic Design & Moodboarding**: Sourcing uncompressed visual assets for Photoshop and Figma.
- **Physical Printing**: Obtaining 300+ DPI images for poster printing and physical vision boards.
- **Wallpapers**: Downloading 4K desktop and mobile wallpapers.

Try extracting 4K photos today with our [Pinterest Image Downloader](/pinterest-image-downloader) or check our [Privacy Policy](/privacy) for data protection details.`,
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      published: true,
      publishedAt: new Date('2026-07-18T14:30:00.000Z'),
    },
    {
      id: 'blog-5',
      title: 'How to Save Animated Pinterest GIFs Without Freezing Motion',
      slug: 'how-to-save-animated-pinterest-gifs-without-freezing',
      excerpt:
        'Learn why browser right-clicking flattens animated GIFs into static photos, and how PintSave preserves 100% full-motion animation frames.',
      content: `Animated GIFs are one of the most popular media formats for reaction clips, UI micro-interactions, and meme graphics on Pinterest. However, long-pressing or saving GIFs directly in web browsers frequently freezes the motion into a flat static image.

### Why Do Browser GIF Downloads Freeze?
To save bandwidth, mobile browsers often cache only the static first keyframe preview of an animated GIF pin. When you save directly from the image context menu, you save the keyframe thumbnail rather than the full multi-frame animated GIF file.

### How PintSave Preserves Full-Motion Animation
PintSave inspects the underlying pin payload to extract the complete multi-frame animation stream directly from Pinterest servers. 

- **Full Motion Retention**: Preserves 100% of original animation frames and frame rate.
- **Dual Format Choice**: Download as native GIF format or lightweight MP4 video format.
- **Social Sharing**: Perfect for sharing in Discord, WhatsApp, Slack, and iMessage.

Start saving animated media now using the [Pinterest GIF Downloader](/pinterest-gif-downloader), or visit [PintSave Home](/) for video extractions. Review our [Terms & Conditions](/terms) for usage rules.`,
      coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      published: true,
      publishedAt: new Date('2026-07-16T11:20:00.000Z'),
    },
    {
      id: 'blog-6',
      title: 'Is It Legal to Download from Pinterest? Copyright & Fair Use Guide',
      slug: 'is-it-legal-to-download-from-pinterest',
      excerpt:
        'A complete legal guide explaining copyright rules, personal Fair Use vs commercial redistribution, and downloader etiquette.',
      content: `A frequent question among Pinterest users is whether downloading photos, videos, and GIFs from Pinterest is legal. Here is a clear breakdown of copyright principles, Fair Use guidelines, and responsible content handling.

### Personal Use vs. Commercial Use
- **Personal Use (Permissible under Fair Use)**: Saving media to your personal device for offline inspiration, private moodboards, desktop wallpapers, or learning reference generally falls under Fair Use principles.
- **Commercial Use (Requires Creator License)**: Re-selling, using copyrighted imagery in advertising campaigns, or claiming ownership of another creator's work without licensing violates copyright laws.

### Responsible Creator Etiquette
1. **Always Credit Original Authors**: When referencing downloaded artwork or photography publicly on social media, tag the original artist.
2. **Respect DMCA Rights**: Content owners have the right to request media URL blocklisting under the Digital Millennium Copyright Act.

### PintSave Compliance & Architecture
PintSave operates as an automated client-side proxy tool and **does not store copyrighted media files** on internal servers. For formal takedown requests, visit our [DMCA Takedown Policy](/dmca) page or learn more on our [About PintSave](/about) page.`,
      coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      published: true,
      publishedAt: new Date('2026-07-15T09:15:00.000Z'),
    },
    {
      id: 'blog-7',
      title: 'How to Download Pinterest Story Pins & Idea Pins with Full Audio',
      slug: 'how-to-download-pinterest-story-and-idea-pins-audio',
      excerpt:
        'Pinterest Idea Pins are highly engaging but don\'t have a direct download option. Learn how to save Idea Pins with their original high-quality audio tracks using PintSave.',
      content: `Pinterest introduced **Idea Pins** (formerly known as Story Pins) to allow creators to share multi-slide video stories, visual guides, and creative journeys. While normal video pins are straightforward, Idea Pins are notoriously difficult to save because Pinterest does not offer a download option within the app.

Furthermore, because Idea Pins combine multiple video segments and audio tracks, typical screen recording options result in layout overlays and low-quality sound.

### The Challenge with Saving Idea Pins
Unlike standard pins, Idea Pins serve dynamic HTML layouts with nested media elements:
- **Segmented Videos**: A single Idea Pin can consist of up to 20 individual short video segments.
- **Separate Audio Streams**: Background music or voiceovers are often mixed dynamically, meaning simple HTML link parsers only extract the video without any audio.
- **No Web Context Download**: Right-clicking in web browsers only downloads static previews.

### How PintSave Extracts Idea Pins with Audio
PintSave uses a proprietary media-stitching engine that reads the full manifest file of the Idea Pin. It resolves each individual page video stream, extracts the original audio overlay, and compiles them into a unified, high-definition 1080p MP4 file.

### Step-by-Step Guide to Saving Idea Pins
1. Open Pinterest and locate the **Idea Pin** you want to download.
2. Tap the **Share icon** and select **Copy Link**.
3. Go to the [Pinterest Video Downloader](/pinterest-video-downloader) page on PintSave.
4. Paste the URL into the extraction field and click **Download**.
5. PintSave will compile all slides and audio. Click **Download HD MP4** to save the fully combined video directly to your iPhone or Android gallery!

Have questions or need assistance? Reach out to us via the [Contact PintSave Team](/contact) page.`,
      coverImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
      published: true,
      publishedAt: new Date('2026-07-13T14:00:00.000Z'),
    },
    {
      id: 'blog-8',
      title: 'Pinterest Board Downloader: How to Batch Download Entire Boards',
      slug: 'pinterest-board-downloader-batch-download-guide',
      excerpt:
        'Need to backup an entire Pinterest board for design research or offline moodboarding? Here is a complete guide on how to batch extract multiple images and videos simultaneously.',
      content: `As designers, architects, and visual storytellers, we often curate huge **Pinterest Boards** filled with thousands of pins for project moodboards and research. But what happens if you need to access these assets offline, import them into design tools like Photoshop/Figma, or back them up in case the board is deleted?

Manually saving hundreds of pins one-by-one is tedious and time-consuming. Here is how you can use PintSave to batch download entire boards efficiently.

### Why Batch Download Pinterest Boards?
- **Offline Creative Moodboards**: Access your visual assets during flights, remote locations, or offline presentations.
- **Design Asset Backups**: Protect your curated ideas from copyright takedowns or creator account deletions.
- **Fast Importing**: Easily import large batches of high-resolution images into collaborative whiteboards.

### How to Use the Batch Extraction Method
1. Go to your Pinterest account and open the **Board** you want to download.
2. Copy the board's URL from your web browser address bar (e.g., \`https://pinterest.com/username/board-name/\`).
3. Open [PintSave Home](/) or our specialized batch interface.
4. Paste the board link. Our engine will read the public API board metadata and list all individual pins.
5. Click **Download Zip** to export all uncompressed media files in a single organized archive, or download individual items selectively at original quality.

Always remember to credit the original artists when using these assets in public projects!`,
      coverImage: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=1200&q=80',
      published: true,
      publishedAt: new Date('2026-07-11T11:30:00.000Z'),
    },
    {
      id: 'blog-9',
      title: 'Troubleshooting Pinterest Downloader Errors: Quick Fixes for Common Issues',
      slug: 'troubleshooting-pinterest-downloader-errors',
      excerpt:
        'Is your Pinterest download stuck or showing an extraction failed error? Learn about CDN token expirations, private boards, copyright restrictions, and how to fix them.',
      content: `PintSave is engineered to be highly reliable, resolving and downloading Pinterest media in seconds. However, occasionally you might encounter an error message like "Unable to parse link" or "Download failed."

Here are the most common reasons why Pinterest downloads fail and how to fix them in under a minute.

### 1. The Pin is on a Private or Secret Board
**The Problem**: Our server cannot access pins stored on secret boards or private group boards because Pinterest restricts external API access for privacy.
**The Solution**: Temporarily change the board setting to public, download the media using PintSave, and then switch it back to private.

### 2. URL Copy Formatting Issues
**The Problem**: Sometimes copying a link from a mobile app includes extra text like "Look at this pin..." or tracking parameters that confuse simple downloaders.
**The Solution**: Ensure you copy only the clean URL (e.g., \`https://pin.it/XXXX\` or \`https://www.pinterest.com/pin/XXXX\`). PintSave automatically cleans tracking parameters, but if it fails, delete the extra text in the search bar.

### 3. CDN Token Expiration
**The Problem**: Pinterest CDN links use temporary authorization tokens. If you leave the download page open for a long time before clicking the final download button, the link might expire.
**The Solution**: Simply refresh the page and paste the link again to generate a fresh, active download URL.

If you run into persistent errors, contact us via the [Contact PintSave Team](/contact) page and we'll investigate!`,
      coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
      published: true,
      publishedAt: new Date('2026-07-09T09:45:00.000Z'),
    },
  ];

  for (const post of posts) {
    await prisma.blog.create({ data: post });
  }
  console.log(`📝 ${posts.length} Blog posts seeded.`);

  // 3b. Seed Comments on Blog Posts
  await prisma.comment.deleteMany({});
  const initialComments = [
    {
      blogId: 'blog-7',
      name: 'Sarah Connor',
      email: 'sarah@resistance.net',
      content: 'This is a lifesaver! I\'ve been struggling to save Idea Pins with their sound. PintSave worked instantly!',
      approved: true,
    },
    {
      blogId: 'blog-7',
      name: 'Devin Patel',
      email: 'devin@designstudio.co',
      content: 'Are you planning to support multi-clip stitching options where we can pick only specific slides of the Story?',
      approved: true,
    },
    {
      blogId: 'blog-8',
      name: 'Jessica Miller',
      email: 'jessica.m@creative.com',
      content: 'Being able to download the entire moodboard as a zip file saves me hours of work every week. Kudos to the dev team!',
      approved: true,
    },
    {
      blogId: 'blog-9',
      name: 'Marcus Aurelius',
      email: 'stoic@philosophy.gr',
      content: 'Very clear guide. The private board issue is exactly what was blocking my downloads.',
      approved: true,
    },
  ];

  for (const c of initialComments) {
    await prisma.comment.create({ data: c });
  }
  console.log(`💬 ${initialComments.length} Comments seeded.`);


  // 4. Seed Initial Contact Messages
  await prisma.contactMessage.deleteMany({});
  const contactMessages = [
    {
      name: 'Alex Rivera',
      email: 'alex@example.com',
      message: 'Hi PintSave Team, love the speed of the downloader! Is there an official browser extension planned?',
      read: false,
    },
    {
      name: 'Elena Rostova',
      email: 'elena@designstudio.co',
      message: 'Great service! How can I submit a copyright removal request under DMCA?',
      read: true,
    },
  ];

  for (const contact of contactMessages) {
    await prisma.contactMessage.create({ data: contact });
  }
  console.log(`✉️ ${contactMessages.length} Contact messages seeded.`);

  // 5. Seed Initial Download Logs
  await prisma.download.deleteMany({});
  const initialDownloads = [
    {
      url: 'https://pinterest.com/pin/11259005943891002/',
      pinId: '11259005943891002',
      mediaType: 'video',
      quality: '1080p HD',
      country: 'United States',
      browser: 'Safari',
      device: 'iOS iPhone',
      ipHash: 'a1b2c3d4e5f67890',
    },
    {
      url: 'https://pinterest.com/pin/88235370823490111/',
      pinId: '88235370823490111',
      mediaType: 'image',
      quality: '4K Original',
      country: 'India',
      browser: 'Chrome 122',
      device: 'Android Smartphone',
      ipHash: 'f6e5d4c3b2a10987',
    },
    {
      url: 'https://pinterest.com/pin/55449876231002233/',
      pinId: '55449876231002233',
      mediaType: 'gif',
      quality: 'Original GIF',
      country: 'Germany',
      browser: 'Firefox',
      device: 'Mac Desktop',
      ipHash: '1234567890abcdef',
    },
  ];

  for (const dl of initialDownloads) {
    await prisma.download.create({ data: dl });
  }
  console.log(`📥 ${initialDownloads.length} Initial download logs seeded.`);

  console.log('✅ Complete production database seeding finished!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
