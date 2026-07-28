import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let contacts: any[] = [];

    // 1. Try Supabase JS client
    try {
      const { data, error } = await supabase
        .from('ContactMessage')
        .select('*')
        .order('createdAt', { ascending: false });

      if (!error && data && data.length > 0) {
        contacts = data;
      } else {
        // Fallback to snake_case table name 'contact_messages'
        const { data: fallbackData } = await supabase
          .from('contact_messages')
          .select('*')
          .order('createdAt', { ascending: false });
        if (fallbackData && fallbackData.length > 0) {
          contacts = fallbackData;
        }
      }
    } catch (sbErr) {
      console.warn('Supabase GET contacts warning:', sbErr);
    }

    // 2. Fallback to Prisma if Supabase SDK returned empty array or errored
    if (contacts.length === 0) {
      try {
        contacts = await prisma.contactMessage.findMany({
          orderBy: { createdAt: 'desc' },
        });
      } catch (dbErr) {
        console.warn('Prisma admin contacts query warning:', dbErr);
      }
    }

    return NextResponse.json({ data: contacts });
  } catch (error: any) {
    return NextResponse.json({ data: [] });
  }
}

