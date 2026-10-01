import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinterest Video Downloader — Save 1080p Full HD MP4 with Audio',
  description:
    'Download Pinterest videos in high quality 1080p and 720p MP4 with full stereo AAC audio. Free, fast, unlimited, and compatible with iOS, Android, Mac, and PC.',
  alternates: {
    canonical: 'https://pintsave.site/pinterest-video-downloader',
  },
  openGraph: {
    title: 'Pinterest Video Downloader — Save 1080p Full HD MP4 with Audio',
    description:
      'Download Pinterest videos in high quality 1080p and 720p MP4 with full stereo AAC audio. Free, fast, and unlimited.',
    url: 'https://pintsave.site/pinterest-video-downloader',
  },
};

export default function VideoDownloaderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
