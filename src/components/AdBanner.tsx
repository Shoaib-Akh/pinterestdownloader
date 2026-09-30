'use client';

import React from 'react';

interface AdBannerProps {
  variant?: 'banner' | 'native' | 'both';
  className?: string;
  // Kept for future AdSense re-enable:
  dataAdSlot?: string;
  dataAdFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  dataFullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

export default function AdBanner({ className = '' }: AdBannerProps) {
  /*
  // ==========================================
  // Google AdSense — uncomment after approval
  // ==========================================
  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-6686252669097490"
      data-ad-slot={dataAdSlot || ''}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive ? 'true' : 'false'}
    />
  );
  */

  // Third-party CPM / popunder ads removed for AdSense review.
  // This component renders nothing until AdSense is approved.
  return <div className={className} aria-hidden="true" />;
}

export function NativeAdBanner({ className = '' }: { className?: string }) {
  return <AdBanner className={className} />;
}
