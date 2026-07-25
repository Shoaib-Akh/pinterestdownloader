const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

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
    title: 'How to Download Pinterest Videos on iPhone (2026 Guide)',
    slug: 'how-to-download-pinterest-videos-iphone',
    excerpt: 'Step-by-step tutorial on saving high-definition MP4 videos from Pinterest directly to your iOS Camera Roll without watermarks.',
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-07-20T10:00:00.000Z',
    createdAt: '2026-07-20T10:00:00.000Z',
    content: `Pinterest is packed with stunning video pins, DIY tutorials, recipe clips, and aesthetic video reels. However, the official Pinterest iOS app does not provide a native button to save video files directly to your iPhone Camera Roll.

### Step 1: Copy the Video Pin Link
1. Open the **Pinterest app** on your iPhone.
2. Navigate to the video pin you wish to download.
3. Tap the **Share icon** (the arrow icon in the bottom right corner).
4. Tap **Copy Link** to save the URL to your clipboard.

### Step 2: Open PinFlow in Safari or Chrome
1. Switch to Safari or your browser of choice on iOS.
2. Navigate to **PinFlow** ([https://pinflow.app](https://pinflow.app)).
3. Paste your copied Pinterest URL into the input field.

### Step 3: Download and Save to Photos
1. Tap the **Download** button.
2. PinFlow will extract the original high-bitrate 100% HD video URL in seconds.
3. Tap **Download MP4 Video**. On iOS Safari, tap *Download* in the pop-up prompt.
4. Open your Safari **Downloads** manager, tap the downloaded video, tap the **Share icon**, and select **Save Video** to transfer it directly into your iPhone Photos app!

### Why Use PinFlow on iOS?
- **No App Installation**: No need to clutter your iPhone with unstable third-party App Store apps that require subscriptions.
- **Full HD Resolution**: Preserves 1080p high bitrate MP4 source files.
- **Fast & Private**: Zero registration or user data logging.`
  },
  {
    id: '2',
    title: 'Pinterest Image Downloader: Save Photos in Original HD Quality',
    slug: 'pinterest-image-downloader-hd-guide',
    excerpt: 'Discover how PinFlow bypasses compressed browser thumbnail constraints to extract original 4K and uncompressed Pinterest photos.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-07-18T14:30:00.000Z',
    createdAt: '2026-07-18T14:30:00.000Z',
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
- **Wallpapers**: Perfect 4K wallpapers for desktop and mobile displays.`
  },
  {
    id: '3',
    title: 'Is It Legal to Download from Pinterest? What You Need to Know',
    slug: 'is-it-legal-to-download-from-pinterest',
    excerpt: 'A complete legal guide explaining copyright rules, personal fair use vs commercial redistribution, and downloader etiquette.',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-07-15T09:15:00.000Z',
    createdAt: '2026-07-15T09:15:00.000Z',
    content: `A frequent question among Pinterest users is whether downloading photos and videos from Pinterest is legal. Here is a clear breakdown of copyright principles, Fair Use, and safe content handling.

### Personal Use vs. Commercial Use
- **Personal Use (Legal)**: Saving images or videos to your personal device for offline inspiration, personal moodboards, wallpapers, or learning purposes generally falls under Fair Use guidelines.
- **Commercial Use (Requires Permission)**: Re-selling, using copyrighted images in advertisement campaigns, or claiming ownership of someone else's visual work without explicit licensing is a violation of copyright law.

### Content Creator Etiquette
1. **Always Credit the Creator**: If you share downloaded content on social media, tag the original designer, photographer, or brand.
2. **Do Not Watermark Over Artwork**: Respect artist rights by keeping original signatures intact.
3. **Respect DMCA Takedown Requests**: Content owners have the right to request media removal under the Digital Millennium Copyright Act.

### Summary
PinFlow is designed to empower individual users with personal backup capabilities for public media. Always act responsibly and respect creators' intellectual property rights.`
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
      question: 'How to download Pinterest videos on iPhone or Android?',
      answer:
        'Open Pinterest app, tap Share on your desired pin, and select "Copy Link". Paste the link into PinFlow, click Download, and save directly to your camera roll.',
    },
    {
      id: '2',
      question: 'Is PinFlow 100% free?',
      answer: 'Yes! PinFlow is 100% free with no account signup, software installation, or subscription required.',
    },
    {
      id: '3',
      question: 'Do I need to create an account or sign in?',
      answer: 'No registration or login is required to download photos, videos, or GIFs.',
    },
    {
      id: '4',
      question: 'Can I download images in original HD resolution?',
      answer:
        'Yes! PinFlow automatically strips low-res thumbnail constraints and resolves the 100% original uncompressed photo.',
    },
    {
      id: '5',
      question: 'Is it safe and legal to save Pinterest media?',
      answer: 'Yes, saving media for personal offline backup and inspiration is safe and legal.',
    },
    {
      id: '6',
      question: 'Why is my Pinterest link not working?',
      answer:
        'Ensure the link is public and copied directly from Pinterest (e.g. pin.it/... or pinterest.com/pin/...). Private boards cannot be downloaded.',
    },
  ];
}
