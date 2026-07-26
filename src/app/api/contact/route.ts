import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    try {
      await prisma.contactMessage.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        },
      });
    } catch (dbError) {
      console.warn('DB store contact warning:', dbError);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent! We'll reply within 24 hours.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to send message.' },
      { status: 500 }
    );
  }
}
