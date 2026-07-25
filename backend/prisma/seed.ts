import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting full database seeding...');

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@pinflow.app';
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
        'Open the Pinterest app, tap Share on your desired pin, and select "Copy Link". Paste the link into PinFlow, click Download, and tap "Download HD Video" to save directly to your device camera roll or gallery.',
      order: 1,
      published: true,
    },
    {
      question: 'Is PinFlow 100% free to use?',
      answer:
        'Yes! PinFlow is 100% free with no hidden fees, subscription plans, software downloads, or browser extension requirements.',
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
        'PinFlow automatically strips low-resolution thumbnail constraints and resolves the 100% original uncompressed photo, high-bitrate MP4 video (720p/1080p), or HD GIF source.',
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
      title: 'How to Download Pinterest Videos on iPhone (2026 Guide)',
      slug: 'how-to-download-pinterest-videos-iphone',
      excerpt:
        'Step-by-step tutorial on saving high-definition MP4 videos from Pinterest directly to your iOS Camera Roll without watermarks.',
      content: `Pinterest is packed with stunning video pins, DIY tutorials, recipe clips, and aesthetic video reels. However, the official Pinterest iOS app does not provide a native button to save video files directly to your iPhone Camera Roll.

### Step 1: Copy the Video Pin Link
1. Open the **Pinterest app** on your iPhone.
2. Navigate to the video pin you wish to download.
3. Tap the **Share icon** (the arrow icon in the bottom right corner).
4. Tap **Copy Link** to save the URL to your clipboard.

### Step 2: Open PinFlow in Safari or Chrome
1. Switch to Safari or your browser of choice on iOS.
2. Navigate to **PinFlow** (https://pinflow.app).
3. Paste your copied Pinterest URL into the input field.

### Step 3: Download and Save to Photos
1. Tap the **Download** button.
2. PinFlow will extract the original high-bitrate 100% HD video URL in seconds.
3. Tap **Download MP4 Video**. On iOS Safari, tap *Download* in the pop-up prompt.
4. Open your Safari **Downloads** manager, tap the downloaded video, tap the **Share icon**, and select **Save Video** to transfer it directly into your iPhone Photos app!

### Why Use PinFlow on iOS?
- **No App Installation**: No need to clutter your iPhone with unstable third-party App Store apps that require subscriptions.
- **Full HD Resolution**: Preserves 1080p high bitrate MP4 source files.
- **Fast & Private**: Zero registration or user data logging.`,
      coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
      published: true,
      publishedAt: new Date('2026-07-20T10:00:00.000Z'),
    },
    {
      title: 'Pinterest Image Downloader: Save Photos in Original HD Quality',
      slug: 'pinterest-image-downloader-hd-guide',
      excerpt:
        'Discover how PinFlow bypasses compressed browser thumbnail constraints to extract original 4K and uncompressed Pinterest photos.',
      content: `Pinterest stores images in multiple resolution tiers to keep its web app loading fast. When you right-click and save an image from your web browser grid, you often end up with a low-res thumbnail.

### Understanding Pinterest Image Resolutions
When a creator uploads a high-resolution image to Pinterest, the CDN automatically generates several scaled versions:
- **236px**: Board grid preview thumbnail
- **474px**: Mobile feed thumbnail
- **736px**: Expanded pin modal preview
- **Originals**: The uncompressed full resolution photo (4K / 8K)

### How PinFlow Unlocks Original Quality
PinFlow's extraction engine inspects the pin payload directly to resolve the direct link to the \`/originals/\` file path. This ensures you get the exact pixel-for-pixel master photo uploaded by the photographer or artist.

### Benefits of Saving HD Pinterest Photos
- **Graphic Design & Moodboards**: Crisp assets for design software like Photoshop and Figma.
- **Printing**: High DPI quality for printing physical posters and vision boards.
- **Wallpapers**: Perfect 4K wallpapers for desktop and mobile displays.`,
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      published: true,
      publishedAt: new Date('2026-07-18T14:30:00.000Z'),
    },
    {
      title: 'Is It Legal to Download from Pinterest? What You Need to Know',
      slug: 'is-it-legal-to-download-from-pinterest',
      excerpt:
        'A complete legal guide explaining copyright rules, personal fair use vs commercial redistribution, and downloader etiquette.',
      content: `A frequent question among Pinterest users is whether downloading photos and videos from Pinterest is legal. Here is a clear breakdown of copyright principles, Fair Use, and safe content handling.

### Personal Use vs. Commercial Use
- **Personal Use (Legal)**: Saving images or videos to your personal device for offline inspiration, personal moodboards, wallpapers, or learning purposes generally falls under Fair Use guidelines.
- **Commercial Use (Requires Permission)**: Re-selling, using copyrighted images in advertisement campaigns, or claiming ownership of someone else's visual work without explicit licensing is a violation of copyright law.

### Content Creator Etiquette
1. **Always Credit the Creator**: If you share downloaded content on social media, tag the original designer, photographer, or brand.
2. **Do Not Watermark Over Artwork**: Respect artist rights by keeping original signatures intact.
3. **Respect DMCA Takedown Requests**: Content owners have the right to request media removal under the Digital Millennium Copyright Act.

### Summary
PinFlow is designed to empower individual users with personal backup capabilities for public media. Always act responsibly and respect creators' intellectual property rights.`,
      coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      published: true,
      publishedAt: new Date('2026-07-15T09:15:00.000Z'),
    },
  ];

  for (const post of posts) {
    await prisma.blog.create({ data: post });
  }
  console.log(`📝 ${posts.length} Blog posts seeded.`);

  // 4. Seed Initial Contact Messages
  await prisma.contactMessage.deleteMany({});
  const contactMessages = [
    {
      name: 'Alex Rivera',
      email: 'alex@example.com',
      message: 'Hi PinFlow Team, love the speed of the downloader! Is there an official browser extension planned?',
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
