'use client';

import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  dataAdSlot?: string;
  dataAdFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  dataFullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdBanner({
  dataAdSlot,
  dataAdFormat = 'auto',
  dataFullWidthResponsive = true,
  className = '',
  style = { display: 'block' },
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      if (adRef.current && !pushedRef.current) {
        // Ensure window.adsbygoogle exists
        ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch (err) {
      console.warn('AdSense push error or ad block detected:', err);
    }
  }, []);

  return (
    <div className={`w-full my-6 flex flex-col items-center justify-center overflow-hidden min-h-[90px] ${className}`}>
      <div className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1 select-none font-medium">
        Advertisement
      </div>
      <div className="w-full max-w-5xl overflow-hidden text-center rounded-xl bg-stone-50/50 dark:bg-stone-900/40 border border-stone-200/50 dark:border-stone-800/50 p-2 min-h-[90px] flex items-center justify-center">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={style}
          data-ad-client="ca-pub-6686252669097490"
          data-ad-slot={dataAdSlot || '1234567890'}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={dataFullWidthResponsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
}
