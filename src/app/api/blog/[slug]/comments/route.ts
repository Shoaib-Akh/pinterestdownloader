import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET comments for a specific blog slug
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    // Find the blog post first to get its ID
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!blog) {
      // Return empty if blog not in DB (or if it's fallback only)
      return NextResponse.json({ success: true, data: [] });
    }

    const comments = await prisma.comment.findMany({
      where: {
        blogId: blog.id,
        approved: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        blogId: true,
        name: true,
        content: true,
        createdAt: true,
      }
    });

    return NextResponse.json({ success: true, data: comments });
  } catch (error: any) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST a comment on a specific blog slug
export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const { name, email, content } = await request.json();

    if (!name || !email || !content) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Find the blog post
    let blog = await prisma.blog.findUnique({
      where: { slug },
    });

    // If blog doesn't exist in the database (e.g. if we are on a static fallback),
    // let's create the blog post shell in the database so the comments relation works!
    if (!blog) {
      // Find the template content in static posts to seed it
      const { SAMPLE_BLOG_POSTS } = require('@/lib/api');
      const staticPost = SAMPLE_BLOG_POSTS.find((p: any) => p.slug === slug);
      
      if (staticPost) {
        blog = await prisma.blog.create({
          data: {
            id: staticPost.id.startsWith('blog-') ? staticPost.id : `blog-${staticPost.id}`,
            title: staticPost.title,
            slug: staticPost.slug,
            excerpt: staticPost.excerpt,
            content: staticPost.content || '',
            coverImage: staticPost.coverImage,
            published: true,
            publishedAt: new Date(staticPost.publishedAt || staticPost.createdAt),
          }
        });
      } else {
        return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
      }
    }

    const newComment = await prisma.comment.create({
      data: {
        blogId: blog.id,
        name,
        email,
        content,
        approved: true, // Auto-approved for simple setup
      },
      select: {
        id: true,
        blogId: true,
        name: true,
        content: true,
        createdAt: true,
      }
    });

    return NextResponse.json({ success: true, data: newComment });
  } catch (error: any) {
    console.error('Error saving comment:', error);
    return NextResponse.json({ success: false, error: 'Failed to post comment' }, { status: 500 });
  }
}
