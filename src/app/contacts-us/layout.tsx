import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact PintSave Support — Get Help & Technical Support',
  description:
    'Need help downloading a Pinterest video, image, or GIF? Get in touch with PintSave technical support team. We reply within 24 hours.',
  alternates: {
    canonical: 'https://pintsave.site/contacts-us',
  },
  openGraph: {
    title: 'Contact PintSave Support — Get Help & Technical Support',
    description:
      'Need help downloading a Pinterest video, image, or GIF? Get in touch with PintSave technical support team.',
    url: 'https://pintsave.site/contacts-us',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
