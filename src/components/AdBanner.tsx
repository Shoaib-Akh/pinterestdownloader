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

  // Ads disabled until Google AdSense approval review is completed.
  return null;
}

export function NativeAdBanner({ className = '' }: { className?: string }) {
  return <AdBanner variant="native" className={className} />;
}
