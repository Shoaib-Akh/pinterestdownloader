import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinterest Image Downloader — Save Original 4K High-Res Photos',
  description:
    'Download original, uncompressed 4K Pinterest photos and carousel slides bypassing low-res web thumbnails. Perfect for high-DPI poster printing and design mood boards.',
  alternates: {
    canonical: 'https://pintsave.site/pinterest-image-downloader',
  },
  openGraph: {
    title: 'Pinterest Image Downloader — Save Original 4K High-Res Photos',
    description:
      'Download original, uncompressed 4K Pinterest photos and carousel slides bypassing low-res web thumbnails.',
    url: 'https://pintsave.site/pinterest-image-downloader',
  },
};

export default function ImageDownloaderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
