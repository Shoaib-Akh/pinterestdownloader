import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { successResponse } from '../utils/apiResponse.js';

export async function handleGetFaqs(req: Request, res: Response) {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
    if (faqs && faqs.length > 0) {
      return successResponse(res, { data: faqs });
    }
  } catch {
    // Fallback if DB is not initialized
  }

  const defaultFaqs = [
    {
      id: '1',
      question: 'How to download Pinterest videos on iPhone or Android?',
      answer:
        'Open the Pinterest app, tap Share on your desired pin, and select "Copy Link". Paste the link into PintSave, click Download, and save directly to your device.',
      order: 1,
    },
    {
      id: '2',
      question: 'Is PintSave 100% free?',
      answer: 'Yes! PintSave is 100% free and requires no registration, logins, or software installation.',
      order: 2,
    },
    {
      id: '3',
      question: 'Do I need to create an account or sign in?',
      answer: 'No account or login is required to download photos, videos, or GIFs.',
      order: 3,
    },
    {
      id: '4',
      question: 'Can I download images in original HD resolution?',
      answer: 'Yes! PintSave automatically strips thumbnail resolution limits and fetches the 100% original uncompressed photo.',
      order: 4,
    },
    {
      id: '5',
      question: 'Is downloading Pinterest media safe and legal?',
      answer: 'Yes, downloading media for personal offline backup and inspiration is safe and legal.',
      order: 5,
    },
    {
      id: '6',
      question: 'Why is my Pinterest link not working?',
      answer:
        'Ensure the pin link is public and formatted correctly (e.g. pin.it/... or pinterest.com/pin/...). Private board links cannot be downloaded.',
      order: 6,
    },
  ];

  return successResponse(res, { data: defaultFaqs });
}
