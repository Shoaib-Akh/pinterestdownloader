'use client';

import React from 'react';

interface AdBannerProps {
  variant?: 'banner' | 'native' | 'both';
  className?: string;
  // Kept for backward compatibility if AdSense is re-enabled in the future:
  dataAdSlot?: string;
  dataAdFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  dataFullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

export default function AdBanner({
  variant = 'banner',
  className = '',
}: AdBannerProps) {
  /*
  // ==========================================
  // Google AdSense (Commented out)
  // ==========================================
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      if (adRef.current && !pushedRef.current) {
        ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch (err) {
      console.warn('AdSense push error or ad block detected:', err);
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-6686252669097490"
      data-ad-slot={dataAdSlot || '1234567890'}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive ? 'true' : 'false'}
    />
  );
  */

  const bannerSrcDoc = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <base target="_blank">
    <style>
      body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        'key' : '33bae28498f8a16de568d78d07cc8105',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://www.highrevenueformat.com/33bae28498f8a16de568d78d07cc8105/invoke.js"></script>
  </body>
</html>`;

  const nativeSrcDoc = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <base target="_blank">
    <style>
      body {
        margin: 0;
        padding: 0;
        background: transparent;
        display: flex;
        justify-content: center;
      }
      #container-908d29533417cb79e771fbb021b9b125 {
        width: 100%;
      }
    </style>
  </head>
  <body>
    <script async="async" data-cfasync="false" src="https://pl31196203.profitableratecpmnetwork.com/908d29533417cb79e771fbb021b9b125/invoke.js"></script>
    <div id="container-908d29533417cb79e771fbb021b9b125"></div>
  </body>
</html>`;

  // CPM network ads temporarily commented out for AdSense approval review.
  // To re-enable, uncomment the JSX below:
  return null;

  /*
  return (
    <div className={`w-full my-6 flex flex-col items-center justify-center overflow-hidden min-h-[90px] ${className}`}>
      <div className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1 select-none font-medium">
        Advertisement
      </div>
      <div className="w-full max-w-5xl overflow-hidden text-center rounded-xl bg-stone-50/50 dark:bg-stone-900/40 border border-stone-200/50 dark:border-stone-800/50 p-2 min-h-[90px] flex flex-wrap items-center justify-center gap-4">
        {(variant === 'banner' || variant === 'both') && (
          <iframe
            title="Ad Banner"
            width={300}
            height={250}
            className="border-0 overflow-hidden shrink-0"
            scrolling="no"
            srcDoc={bannerSrcDoc}
          />
        )}
        {(variant === 'native' || variant === 'both') && (
          <iframe
            title="Native Advertisement"
            className="w-full min-h-[160px] border-0 overflow-hidden"
            scrolling="no"
            srcDoc={nativeSrcDoc}
          />
        )}
      </div>
    </div>
  );
  */
}

export function NativeAdBanner({ className = '' }: { className?: string }) {
  return <AdBanner variant="native" className={className} />;
}
