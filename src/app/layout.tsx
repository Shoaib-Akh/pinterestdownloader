import type { Metadata } from 'next';
import Script from 'next/script';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import { ThemeProvider } from '@/providers/theme-provider';
import { LanguageProvider } from '@/providers/language-provider';

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
  verification: {
    google: 'HLUN0VTDgckwJbMntpwk5soeSlJH0-1qY__whGjmkpk',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('pintsave-theme');
                  var theme = saved || 'system';
                  var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 selection:bg-brand-500 selection:text-white">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BN3DQKHVSW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BN3DQKHVSW');
          `}
        </Script>
        {/* Google AdSense (Commented out) */}
        {/* <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6686252669097490"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        /> */}

        {/* CPM Ad Network Scripts (Temporarily commented out for AdSense approval) */}
        {/*
        <Script
          src="https://pl31196201.profitableratecpmnetwork.com/7c/3a/d7/7c3ad7c435d2378ed2c061d1eb400553.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://pl31196204.profitableratecpmnetwork.com/84/81/d7/8481d7ccfd8e37dd0c73bfe532d6a169.js"
          strategy="afterInteractive"
        />
        */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <LanguageProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieBanner />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
