import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // 1. Primary insertion via Supabase Client SDK
    let supabaseSuccess = false;
    try {
      const { error: sbError } = await supabase
        .from('ContactMessage')
        .insert([
          {
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage,
            read: false,
          },
        ]);

      if (!sbError) {
        supabaseSuccess = true;
      } else {
        console.warn('Supabase JS insert warning:', sbError.message);
        // Try snake_case table fallback in case table was created with contact_messages
        const { error: sbFallbackErr } = await supabase
          .from('contact_messages')
          .insert([
            {
              name: trimmedName,
              email: trimmedEmail,
              message: trimmedMessage,
              read: false,
            },
          ]);
        if (!sbFallbackErr) supabaseSuccess = true;
      }
    } catch (sbErr) {
      console.warn('Supabase SDK exception:', sbErr);
    }

    // 2. Secondary insertion via Prisma PostgreSQL client (Supabase DB connection pool)
    try {
      await prisma.contactMessage.create({
        data: {
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        },
      });
    } catch (dbError) {
      console.warn('Prisma DB store contact warning:', dbError);
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

