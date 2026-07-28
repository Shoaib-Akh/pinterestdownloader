import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const isRead = Boolean(body.read);

    // Update via Supabase JS SDK
    try {
      await supabase
        .from('ContactMessage')
        .update({ read: isRead })
        .eq('id', id);

      await supabase
        .from('contact_messages')
        .update({ read: isRead })
        .eq('id', id);
    } catch (sbErr) {
      console.warn('Supabase update contact status warning:', sbErr);
    }

    // Update via Prisma
    let contact = null;
    try {
      contact = await prisma.contactMessage.update({
        where: { id },
        data: { read: isRead },
      });
    } catch (dbErr) {
      console.warn('Prisma update contact status warning:', dbErr);
    }

    return NextResponse.json({ success: true, data: contact || { id, read: isRead } });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to update contact message status' },
      { status: 500 }
    );
  }
}

