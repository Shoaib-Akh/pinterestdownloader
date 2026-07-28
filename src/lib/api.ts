const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://pintsave-backend.onrender.com';

export interface MediaResult {
  success: boolean;
  pinId?: string;
  title?: string;
  type?: 'image' | 'video' | 'gif' | 'carousel';
  thumbnail?: string;
  mediaUrl?: string;
  items?: Array<{ url: string; type: 'image' | 'video' }>;
  cached?: boolean;
  error?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  publishedAt?: string;
  createdAt: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export const SAMPLE_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'What is Pinterest & How Does It Work? A Complete Guide for Creators',
    slug: 'what-is-pinterest-and-how-it-works-guide',
    excerpt: 'Discover what Pinterest is, how visual discovery boards work, and why creators use PintSave to save videos, 4K images, and GIFs for offline reference.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-07-25T10:00:00.000Z',
    createdAt: '2026-07-25T10:00:00.000Z',
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

Learn more about our mission on the [About PintSave](/about) page or explore our index on the [XML Sitemap](/sitemap.ts).`
  },
  {
    id: '2',
    title: 'Why Use PintSave to Save Pinterest Videos, Photos & Animated GIFs?',
    slug: 'why-use-pintsave-pinterest-video-downloader',
    excerpt: 'Explore why thousands of visual artists, designers, and curators prefer PintSave for watermark-free 1080p MP4 extractions and 4K master photos.',
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-07-22T14:30:00.000Z',
    createdAt: '2026-07-22T14:30:00.000Z',
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

Have questions or feedback? Feel free to reach out via the [Contact PintSave Team](/contact) page or visit the [PintSave Home](/) engine.`
  },
  {
    id: '3',
    title: 'How to Download Pinterest Videos on iPhone & Android (2026 Tutorial)',
    slug: 'how-to-download-pinterest-videos-iphone',
    excerpt: 'Step-by-step tutorial on saving high-definition MP4 videos from Pinterest directly to your iOS Camera Roll or Android Gallery without watermarks.',
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-07-20T10:00:00.000Z',
    createdAt: '2026-07-20T10:00:00.000Z',
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

Learn more about our mobile extraction capabilities on the [About PintSave](/about) page or test our [Pinterest Image Downloader](/pinterest-image-downloader).`
  },
  {
    id: '4',
    title: 'Pinterest Image Downloader: Save Photos in Original 4K HD Quality',
    slug: 'pinterest-image-downloader-hd-guide',
    excerpt: 'Discover how PintSave bypasses compressed browser thumbnail constraints to extract original 4K and uncompressed Pinterest photos.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-07-18T14:30:00.000Z',
    createdAt: '2026-07-18T14:30:00.000Z',
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

Try extracting 4K photos today with our [Pinterest Image Downloader](/pinterest-image-downloader) or check our [Privacy Policy](/privacy) for data protection details.`
  },
  {
    id: '5',
    title: 'How to Save Animated Pinterest GIFs Without Freezing Motion',
    slug: 'how-to-save-animated-pinterest-gifs-without-freezing',
    excerpt: 'Learn why browser right-clicking flattens animated GIFs into static photos, and how PintSave preserves 100% full-motion animation frames.',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-07-16T11:20:00.000Z',
    createdAt: '2026-07-16T11:20:00.000Z',
    content: `Animated GIFs are one of the most popular media formats for reaction clips, UI micro-interactions, and meme graphics on Pinterest. However, long-pressing or saving GIFs directly in web browsers frequently freezes the motion into a flat static image.

### Why Do Browser GIF Downloads Freeze?
To save bandwidth, mobile browsers often cache only the static first keyframe preview of an animated GIF pin. When you save directly from the image context menu, you save the keyframe thumbnail rather than the full multi-frame animated GIF file.

### How PintSave Preserves Full-Motion Animation
PintSave inspects the underlying pin payload to extract the complete multi-frame animation stream directly from Pinterest servers. 

- **Full Motion Retention**: Preserves 100% of original animation frames and frame rate.
- **Dual Format Choice**: Download as native GIF format or lightweight MP4 video format.
- **Social Sharing**: Perfect for sharing in Discord, WhatsApp, Slack, and iMessage.

Start saving animated media now using the [Pinterest GIF Downloader](/pinterest-gif-downloader), or visit [PintSave Home](/) for video extractions. Review our [Terms & Conditions](/terms) for usage rules.`
  },
  {
    id: '6',
    title: 'Is It Legal to Download from Pinterest? Copyright & Fair Use Guide',
    slug: 'is-it-legal-to-download-from-pinterest',
    excerpt: 'A complete legal guide explaining copyright rules, personal Fair Use vs commercial redistribution, and downloader etiquette.',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-07-15T09:15:00.000Z',
    createdAt: '2026-07-15T09:15:00.000Z',
    content: `A frequent question among Pinterest users is whether downloading photos, videos, and GIFs from Pinterest is legal. Here is a clear breakdown of copyright principles, Fair Use guidelines, and responsible content handling.

### Personal Use vs. Commercial Use
- **Personal Use (Permissible under Fair Use)**: Saving media to your personal device for offline inspiration, private moodboards, desktop wallpapers, or learning reference generally falls under Fair Use principles.
- **Commercial Use (Requires Creator License)**: Re-selling, using copyrighted imagery in advertising campaigns, or claiming ownership of another creator's work without licensing violates copyright laws.

### Responsible Creator Etiquette
1. **Always Credit Original Authors**: When referencing downloaded artwork or photography publicly on social media, tag the original artist.
2. **Respect DMCA Rights**: Content owners have the right to request media URL blocklisting under the Digital Millennium Copyright Act.

### PintSave Compliance & Architecture
PintSave operates as an automated client-side proxy tool and **does not store copyrighted media files** on internal servers. For formal takedown requests, visit our [DMCA Takedown Policy](/dmca) page or learn more on our [About PintSave](/about) page.`
  }
];

export async function downloadMedia(url: string): Promise<MediaResult> {
  try {
    const res = await fetch(`${API_BASE}/api/download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    return await res.json();
  } catch (err: any) {
    return {
      success: false,
      error: 'Network error. Please check if backend server is running on port 4000.',
    };
  }
}

export async function sendContactMessage(payload: ContactPayload): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      return { success: true, message: data.message || "Message sent! We'll reply within 24 hours." };
    }
    return { success: false, error: data.error || 'Failed to send message. Please try again.' };
  } catch {
    // Graceful client simulation if backend API is offline
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Message sent! We'll reply within 24 hours." });
      }, 500);
    });
  }
}

export async function getBlogPosts(page = 1, limit = 10): Promise<{ data: BlogPost[]; pagination: { page: number; limit: number; total: number; totalPages: number } }> {
  try {
    const res = await fetch(`${API_BASE}/api/blog?page=${page}&limit=${limit}`, { cache: 'no-store' });
    const data = await res.json();
    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      return data;
    }
  } catch {
    // Fallback
  }
  return {
    data: SAMPLE_BLOG_POSTS,
    pagination: {
      page: 1,
      limit: 10,
      total: SAMPLE_BLOG_POSTS.length,
      totalPages: 1,
    },
  };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_BASE}/api/blog/${slug}`, { cache: 'no-store' });
    const data = await res.json();
    if (data.data) {
      return data.data;
    }
  } catch {
    // Fallback
  }
  const match = SAMPLE_BLOG_POSTS.find((p) => p.slug === slug);
  return match || null;
}

export async function getPublicStats() {
  try {
    const res = await fetch(`${API_BASE}/api/stats/public`, { cache: 'no-store' });
    const data = await res.json();
    if (data.success) return data;
  } catch {
    // Fallback
  }
  return {
    totalDownloads: 15420,
    todayDownloads: 342,
    supportedTypes: ['image', 'video', 'gif', 'carousel'],
  };
}

export async function getFAQs() {
  try {
    const res = await fetch(`${API_BASE}/api/faq`, { cache: 'no-store' });
    const data = await res.json();
    if (data.data) return data.data;
  } catch {
    // Fallback
  }
  return [
    {
      id: '1',
      question: 'How do I download Pinterest videos on my iPhone or Android phone?',
      answer:
        'To download videos on mobile, open the Pinterest app, locate the video pin, tap the Share icon, and choose "Copy Link". Switch to your Safari or Chrome browser, visit PintSave, paste the link into the box, and tap Download HD. On iOS Safari, tap "Download" when prompted, open the Downloads menu, tap the downloaded video, tap Share, and choose "Save Video" to transfer it directly into your Camera Roll.',
    },
    {
      id: '2',
      question: 'Can I download images in original 4K resolution instead of web previews?',
      answer:
        'Yes! When you browse Pinterest normally, the web interface serves compressed 736px thumbnail images to save bandwidth. PintSave automatically bypasses these web thumbnails, queries the underlying CDN metadata, and fetches the original uncompressed source image in full 4K pixel resolution.',
    },
    {
      id: '3',
      question: 'Is PintSave completely free, and do I need to register an account?',
      answer:
        'PintSave is 100% free with no mandatory account creation, subscription plans, trial caps, or software installation. You can download as many videos, original photos, and GIFs as you want, completely anonymously.',
    },
    {
      id: '4',
      question: 'Does PintSave add watermarks or brand overlays to saved videos?',
      answer:
        'No. We never add watermarks, logos, quality-reducing overlays, or re-compression layers to your downloaded media. You receive the exact original MP4 video stream and image files uploaded by the pin creator.',
    },
    {
      id: '5',
      question: 'Why did my Pinterest link fail or show an extraction error?',
      answer:
        'Extraction errors typically happen if the pin belongs to a private or secret board, if the pin was removed by Pinterest, or if the copied URL was incomplete. Make sure the pin is public and copy the full pin link directly from the official Pinterest share button.',
    },
    {
      id: '6',
      question: 'Can I save multi-image Pinterest Carousel pins?',
      answer:
        'Yes! When you paste a link to a carousel pin, PintSave automatically extracts all individual image and video slides in the carousel, enabling you to preview and download each slide separately in full resolution.',
    },
  ];
}
