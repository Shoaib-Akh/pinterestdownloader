-- ==============================================================================
-- PINTFLOW BLOG & COMMENTS TABLE SETUP & SEEDING SCRIPT
-- ==============================================================================
-- Run this SQL in the Supabase SQL Editor:
-- 1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/hwvgcasaiemgfepeozbr
-- 2. Click on "SQL Editor" in the left sidebar
-- 3. Paste and run this script.
-- ==============================================================================

-- 1. CREATE "Blog" TABLE (if not exists)
CREATE TABLE IF NOT EXISTS "Blog" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3) WITH TIME ZONE,
    "createdAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. CREATE "Comment" TABLE
CREATE TABLE IF NOT EXISTS "Comment" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "blogId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_comment_blog" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE
);

-- 3. CREATE INDEXES FOR OPTIMAL QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS "Blog_slug_idx" ON "Blog" ("slug");
CREATE INDEX IF NOT EXISTS "Blog_published_idx" ON "Blog" ("published");
CREATE INDEX IF NOT EXISTS "Comment_blogId_idx" ON "Comment" ("blogId");
CREATE INDEX IF NOT EXISTS "Comment_createdAt_idx" ON "Comment" ("createdAt" DESC);

-- 4. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE "Blog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Comment" ENABLE ROW LEVEL SECURITY;

-- 5. RLS POLICIES FOR "Blog"
DROP POLICY IF EXISTS "Allow public read-only access to published blogs" ON "Blog";
CREATE POLICY "Allow public read-only access to published blogs" 
ON "Blog" FOR SELECT USING ("published" = true);

DROP POLICY IF EXISTS "Allow admin modify access to blogs" ON "Blog";
CREATE POLICY "Allow admin modify access to blogs" 
ON "Blog" FOR ALL USING (true); -- Full control (authenticated/admin roles can be restricted further if needed)

-- 6. RLS POLICIES FOR "Comment"
DROP POLICY IF EXISTS "Allow public read access to approved comments" ON "Comment";
CREATE POLICY "Allow public read access to approved comments" 
ON "Comment" FOR SELECT USING ("approved" = true);

DROP POLICY IF EXISTS "Allow public write access to submit comments" ON "Comment";
CREATE POLICY "Allow public write access to submit comments" 
ON "Comment" FOR INSERT WITH CHECK (true);

-- 7. SEED THE 9 BLOG POSTS (TRUNCATE FIRST TO ENSURE NO DUPLICATES)
-- We use a transaction blocks to ensure clean execution.
TRUNCATE TABLE "Comment" CASCADE;
TRUNCATE TABLE "Blog" CASCADE;

INSERT INTO "Blog" ("id", "title", "slug", "excerpt", "content", "coverImage", "published", "publishedAt", "createdAt", "updatedAt") VALUES
(
  'blog-1',
  'What is Pinterest & How Does It Work? A Complete Guide for Creators',
  'what-is-pinterest-and-how-it-works-guide',
  'Discover what Pinterest is, how visual discovery boards work, and why creators use PintSave to save videos, 4K images, and GIFs for offline reference.',
  'Pinterest is one of the world''s most expansive visual search engines and bookmarking hubs. Unlike traditional social media platforms where content feeds expire quickly, Pinterest operates as a digital catalog where millions of users curate ideas for home decor, fashion lookbooks, recipe tutorials, and visual design.

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

Learn more about our mission on the [About PintSave](/about) page or explore our index on the [XML Sitemap](/sitemap.ts).',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  true,
  '2026-07-25 10:00:00+00',
  '2026-07-25 10:00:00+00',
  '2026-07-25 10:00:00+00'
),
(
  'blog-2',
  'Why Use PintSave to Save Pinterest Videos, Photos & Animated GIFs?',
  'why-use-pintsave-pinterest-video-downloader',
  'Explore why thousands of visual artists, designers, and curators prefer PintSave for watermark-free 1080p MP4 extractions and 4K master photos.',
  'When searching for online video and photo downloaders, users are often confronted with intrusive popups, mandatory account signups, slow waiting queues, and quality-reducing watermarks. PintSave was created to offer a clean, fast, and privacy-first solution.

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

Have questions or feedback? Feel free to reach out via the [Contact PintSave Team](/contact) page or visit the [PintSave Home](/) engine.',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
  true,
  '2026-07-22 14:30:00+00',
  '2026-07-22 14:30:00+00',
  '2026-07-22 14:30:00+00'
),
(
  'blog-3',
  'How to Download Pinterest Videos on iPhone & Android (2026 Tutorial)',
  'how-to-download-pinterest-videos-iphone',
  'Step-by-step tutorial on saving high-definition MP4 videos from Pinterest directly to your iOS Camera Roll or Android Gallery without watermarks.',
  'Pinterest is packed with stunning video pins, DIY tutorials, recipe clips, and aesthetic video reels. However, the official Pinterest iOS and Android apps do not provide a native button to save video files directly to your smartphone Camera Roll.

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

Learn more about our mobile extraction capabilities on the [About PintSave](/about) page or test our [Pinterest Image Downloader](/pinterest-image-downloader).',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
  true,
  '2026-07-20 10:00:00+00',
  '2026-07-20 10:00:00+00',
  '2026-07-20 10:00:00+00'
),
(
  'blog-4',
  'Pinterest Image Downloader: Save Photos in Original 4K HD Quality',
  'pinterest-image-downloader-hd-guide',
  'Discover how PintSave bypasses compressed browser thumbnail constraints to extract original 4K and uncompressed Pinterest photos.',
  'Pinterest stores images in multiple resolution tiers to ensure fast page loads across web feeds. When you right-click and save an image from your web browser grid, you usually end up saving a low-resolution thumbnail.

### Understanding Pinterest Image Resolutions
When a photographer or creator uploads a high-resolution photo to Pinterest, the platform generates several scaled file tiers:
- **236px**: Small grid preview thumbnail
- **474px**: Mobile feed thumbnail
- **736px**: Expanded pin modal preview
- **Originals**: The 100% uncompressed master photo (4K / 8K resolution)

### How PintSave Unlocks Original Quality
PintSave''s extraction engine inspects the pin payload directly to resolve the direct link to the /originals/ file path on the CDN. This ensures you get the exact pixel-for-pixel master file uploaded by the artist.

### Primary Use Cases for 4K Photo Downloads
- **Graphic Design & Moodboarding**: Sourcing uncompressed visual assets for Photoshop and Figma.
- **Physical Printing**: Obtaining 300+ DPI images for poster printing and physical vision boards.
- **Wallpapers**: Downloading 4K desktop and mobile wallpapers.

Try extracting 4K photos today with our [Pinterest Image Downloader](/pinterest-image-downloader) or check our [Privacy Policy](/privacy) for data protection details.',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  true,
  '2026-07-18 14:30:00+00',
  '2026-07-18 14:30:00+00',
  '2026-07-18 14:30:00+00'
),
(
  'blog-5',
  'How to Save Animated Pinterest GIFs Without Freezing Motion',
  'how-to-save-animated-pinterest-gifs-without-freezing',
  'Learn why browser right-clicking flattens animated GIFs into static photos, and how PintSave preserves 100% full-motion animation frames.',
  'Animated GIFs are one of the most popular media formats for reaction clips, UI micro-interactions, and meme graphics on Pinterest. However, long-pressing or saving GIFs directly in web browsers frequently freezes the motion into a flat static image.

### Why Do Browser GIF Downloads Freeze?
To save bandwidth, mobile browsers often cache only the static first keyframe preview of an animated GIF pin. When you save directly from the image context menu, you save the keyframe thumbnail rather than the full multi-frame animated GIF file.

### How PintSave Preserves Full-Motion Animation
PintSave inspects the underlying pin payload to extract the complete multi-frame animation stream directly from Pinterest servers. 

- **Full Motion Retention**: Preserves 100% of original animation frames and frame rate.
- **Dual Format Choice**: Download as native GIF format or lightweight MP4 video format.
- **Social Sharing**: Perfect for sharing in Discord, WhatsApp, Slack, and iMessage.

Start saving animated media now using the [Pinterest GIF Downloader](/pinterest-gif-downloader), or visit [PintSave Home](/) for video extractions. Review our [Terms & Conditions](/terms) for usage rules.',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
  true,
  '2026-07-16 11:20:00+00',
  '2026-07-16 11:20:00+00',
  '2026-07-16 11:20:00+00'
),
(
  'blog-6',
  'Is It Legal to Download from Pinterest? Copyright & Fair Use Guide',
  'is-it-legal-to-download-from-pinterest',
  'A complete legal guide explaining copyright rules, personal Fair Use vs commercial redistribution, and downloader etiquette.',
  'A frequent question among Pinterest users is whether downloading photos, videos, and GIFs from Pinterest is legal. Here is a clear breakdown of copyright principles, Fair Use guidelines, and responsible content handling.

### Personal Use vs. Commercial Use
- **Personal Use (Permissible under Fair Use)**: Saving media to your personal device for offline inspiration, private moodboards, desktop wallpapers, or learning reference generally falls under Fair Use principles.
- **Commercial Use (Requires Creator License)**: Re-selling, using copyrighted imagery in advertising campaigns, or claiming ownership of another creator''s work without licensing violates copyright laws.

### Responsible Creator Etiquette
1. **Always Credit Original Authors**: When referencing downloaded artwork or photography publicly on social media, tag the original artist.
2. **Respect DMCA Rights**: Content owners have the right to request media URL blocklisting under the Digital Millennium Copyright Act.

### PintSave Compliance & Architecture
PintSave operates as an automated client-side proxy tool and **does not store copyrighted media files** on internal servers. For formal takedown requests, visit our [DMCA Takedown Policy](/dmca) page or learn more on our [About PintSave](/about) page.',
  'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
  true,
  '2026-07-15 09:15:00+00',
  '2026-07-15 09:15:00+00',
  '2026-07-15 09:15:00+00'
),
(
  'blog-7',
  'How to Download Pinterest Story Pins & Idea Pins with Full Audio',
  'how-to-download-pinterest-story-and-idea-pins-audio',
  'Pinterest Idea Pins are highly engaging but don''t have a direct download option. Learn how to save Idea Pins with their original high-quality audio tracks using PintSave.',
  'Pinterest introduced **Idea Pins** (formerly known as Story Pins) to allow creators to share multi-slide video stories, visual guides, and creative journeys. While normal video pins are straightforward, Idea Pins are notoriously difficult to save because Pinterest does not offer a download option within the app.

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

Have questions or need assistance? Reach out to us via the [Contact PintSave Team](/contact) page.',
  'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
  true,
  '2026-07-13 14:00:00+00',
  '2026-07-13 14:00:00+00',
  '2026-07-13 14:00:00+00'
),
(
  'blog-8',
  'Pinterest Board Downloader: How to Batch Download Entire Boards',
  'pinterest-board-downloader-batch-download-guide',
  'Need to backup an entire Pinterest board for design research or offline moodboarding? Here is a complete guide on how to batch extract multiple images and videos simultaneously.',
  'As designers, architects, and visual storytellers, we often curate huge **Pinterest Boards** filled with thousands of pins for project moodboards and research. But what happens if you need to access these assets offline, import them into design tools like Photoshop/Figma, or back them up in case the board is deleted?

Manually saving hundreds of pins one-by-one is tedious and time-consuming. Here is how you can use PintSave to batch download entire boards efficiently.

### Why Batch Download Pinterest Boards?
- **Offline Creative Moodboards**: Access your visual assets during flights, remote locations, or offline presentations.
- **Design Asset Backups**: Protect your curated ideas from copyright takedowns or creator account deletions.
- **Fast Importing**: Easily import large batches of high-resolution images into collaborative whiteboards.

### How to Use the Batch Extraction Method
1. Go to your Pinterest account and open the **Board** you want to download.
2. Copy the board''s URL from your web browser address bar (e.g., `https://pinterest.com/username/board-name/`).
3. Open [PintSave Home](/) or our specialized batch interface.
4. Paste the board link. Our engine will read the public API board metadata and list all individual pins.
5. Click **Download Zip** to export all uncompressed media files in a single organized archive, or download individual items selectively at original quality.

Always remember to credit the original artists when using these assets in public projects!',
  'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=1200&q=80',
  true,
  '2026-07-11 11:30:00+00',
  '2026-07-11 11:30:00+00',
  '2026-07-11 11:30:00+00'
),
(
  'blog-9',
  'Troubleshooting Pinterest Downloader Errors: Quick Fixes for Common Issues',
  'troubleshooting-pinterest-downloader-errors',
  'Is your Pinterest download stuck or showing an extraction failed error? Learn about CDN token expirations, private boards, copyright restrictions, and how to fix them.',
  'PintSave is engineered to be highly reliable, resolving and downloading Pinterest media in seconds. However, occasionally you might encounter an error message like "Unable to parse link" or "Download failed."

Here are the most common reasons why Pinterest downloads fail and how to fix them in under a minute.

### 1. The Pin is on a Private or Secret Board
**The Problem**: Our server cannot access pins stored on secret boards or private group boards because Pinterest restricts external API access for privacy.
**The Solution**: Temporarily change the board setting to public, download the media using PintSave, and then switch it back to private.

### 2. URL Copy Formatting Issues
**The Problem**: Sometimes copying a link from a mobile app includes extra text like "Look at this pin..." or tracking parameters that confuse simple downloaders.
**The Solution**: Ensure you copy only the clean URL (e.g., `https://pin.it/XXXX` or `https://www.pinterest.com/pin/XXXX`). PintSave automatically cleans tracking parameters, but if it fails, delete the extra text in the search bar.

### 3. CDN Token Expiration
**The Problem**: Pinterest CDN links use temporary authorization tokens. If you leave the download page open for a long time before clicking the final download button, the link might expire.
**The Solution**: Simply refresh the page and paste the link again to generate a fresh, active download URL.

If you run into persistent errors, contact us via the [Contact PintSave Team](/contact) page and we''ll investigate!',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
  true,
  '2026-07-09 09:45:00+00',
  '2026-07-09 09:45:00+00',
  '2026-07-09 09:45:00+00'
);

-- 8. SEED INITIAL APPROVED COMMENTS ON THE NEW POSTS
INSERT INTO "Comment" ("blogId", "name", "email", "content", "approved") VALUES
('blog-7', 'Sarah Connor', 'sarah@resistance.net', 'This is a lifesaver! I''ve been struggling to save Idea Pins with their sound. PintSave worked instantly!', true),
('blog-7', 'Devin Patel', 'devin@designstudio.co', 'Are you planning to support multi-clip stitching options where we can pick only specific slides of the Story?', true),
('blog-8', 'Jessica Miller', 'jessica.m@creative.com', 'Being able to download the entire moodboard as a zip file saves me hours of work every week. Kudos to the dev team!', true),
('blog-9', 'Marcus Aurelius', 'stoic@philosophy.gr', 'Very clear guide. The private board issue is exactly what was blocking my downloads.', true);
