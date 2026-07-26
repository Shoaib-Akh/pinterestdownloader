import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let faqs: any[] = [];
    try {
      faqs = await prisma.fAQ.findMany({
        orderBy: { order: 'asc' },
      });
    } catch (dbErr) {
      console.warn('DB admin faq query warning:', dbErr);
    }
    return NextResponse.json({ data: faqs });
  } catch (error: any) {
    return NextResponse.json({ data: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, answer, order, published } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { success: false, error: 'Question and answer are required.' },
        { status: 400 }
      );
    }

    const faq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        order: order ?? 0,
        published: published ?? true,
      },
    });

    return NextResponse.json({ success: true, data: faq });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}
