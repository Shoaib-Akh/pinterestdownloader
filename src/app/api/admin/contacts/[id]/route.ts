import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { read } = body;

    const contact = await prisma.contactMessage.update({
      where: { id },
      data: { read: Boolean(read) },
    });

    return NextResponse.json({ success: true, data: contact });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to update contact message status' },
      { status: 500 }
    );
  }
}
