import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/providers/theme-provider';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PintSave – Fast, Free Pinterest Video, Image & GIF Downloader',
  description:
    'Save Pinterest videos, 4K high-resolution images, and animated GIFs in original HD quality with PintSave. 100% free, no signup required.',
  keywords: [
    'pinterest downloader',
    'pinterest video downloader',
    'pinterest image downloader',
    'pinterest gif downloader',
    'download pinterest video hd',
    'pinterest saver',
    'pintsave',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 selection:bg-brand-500 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
