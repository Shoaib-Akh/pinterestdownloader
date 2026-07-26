import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let faqs: any[] = [];
    try {
      faqs = await prisma.fAQ.findMany({
        where: { published: true },
        orderBy: { order: 'asc' },
      });
    } catch (dbErr) {
      console.warn('DB FAQ fetch warning:', dbErr);
    }

    if (!faqs || faqs.length === 0) {
      return NextResponse.json({
        data: [
          {
            id: '1',
            question: 'How to download Pinterest videos on iPhone or Android?',
            answer:
              'Open Pinterest app, tap Share on your desired pin, and select "Copy Link". Paste the link into PintSave, click Download, and save directly to your camera roll.',
          },
          {
            id: '2',
            question: 'Is PintSave 100% free?',
            answer: 'Yes! PintSave is 100% free with no account signup, software installation, or subscription required.',
          },
          {
            id: '3',
            question: 'Do I need to create an account or sign in?',
            answer: 'No registration or login is required to download photos, videos, or GIFs.',
          },
          {
            id: '4',
            question: 'Can I download images in original HD resolution?',
            answer:
              'Yes! PintSave automatically strips low-res thumbnail constraints and resolves the 100% original uncompressed photo.',
          },
          {
            id: '5',
            question: 'Is it safe and legal to save Pinterest media?',
            answer: 'Yes, saving media for personal offline backup and inspiration is safe and legal.',
          },
          {
            id: '6',
            question: 'Why is my Pinterest link not working?',
            answer:
              'Ensure the link is public and copied directly from Pinterest (e.g. pin.it/... or pinterest.com/pin/...). Private boards cannot be downloaded.',
          },
        ],
      });
    }

    return NextResponse.json({ data: faqs });
  } catch (error: any) {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
