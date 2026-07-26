import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let contacts: any[] = [];
    try {
      contacts = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (dbErr) {
      console.warn('DB admin contacts query warning:', dbErr);
    }
    return NextResponse.json({ data: contacts });
  } catch (error: any) {
    return NextResponse.json({ data: [] });
  }
}
