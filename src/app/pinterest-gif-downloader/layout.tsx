import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinterest GIF Downloader — Save Full Animated GIFs in High Frame Rate',
  description:
    'Download Pinterest animated GIFs with frame continuity, loop tags, and alpha transparency intact. No frozen frames or static image conversion.',
  alternates: {
    canonical: 'https://pintsave.site/pinterest-gif-downloader',
  },
  openGraph: {
    title: 'Pinterest GIF Downloader — Save Full Animated GIFs in High Frame Rate',
    description:
      'Download Pinterest animated GIFs with frame continuity, loop tags, and alpha transparency intact.',
    url: 'https://pintsave.site/pinterest-gif-downloader',
  },
};

export default function GifDownloaderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
