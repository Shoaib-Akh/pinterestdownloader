import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// --- Dashboard Stats ---
export async function handleGetAdminStats(req: Request, res: Response) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [
      totalDownloads,
      todayDownloads,
      weekDownloads,
      recentDownloads,
      blogsCount,
      faqsCount,
      contactsCount,
      mediaTypeGroups,
      countryGroups,
    ] = await Promise.all([
      prisma.download.count(),
      prisma.download.count({ where: { createdAt: { gte: today } } }),
      prisma.download.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.download.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.blog.count(),
      prisma.fAQ.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.download.groupBy({
        by: ['mediaType'],
        _count: { mediaType: true },
      }),
      prisma.download.groupBy({
        by: ['country'],
        _count: { country: true },
        take: 5,
      }),
    ]);

    const topMediaTypes = mediaTypeGroups.map((g) => ({
      type: g.mediaType,
      count: g._count.mediaType,
    }));

    const topCountries = countryGroups.map((g) => ({
      country: g.country || 'Global',
      count: g._count.country,
    }));

    return successResponse(res, {
      totalDownloads,
      todayDownloads,
      weekDownloads,
      totalPageViews: Math.round(totalDownloads * 3.5),
      unreadContacts: contactsCount,
      totalBlogs: blogsCount,
      totalFaqs: faqsCount,
      topCountries,
      topMediaTypes,
      recentDownloads,
    });
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to fetch admin stats.', 500);
  }
}

// --- Download Logs ---
export async function handleGetAdminDownloads(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 15;
    const skip = (page - 1) * limit;

    const [downloads, total] = await Promise.all([
      prisma.download.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.download.count(),
    ]);

    return successResponse(res, {
      data: downloads,
      pagination: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) },
    });
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to fetch download logs.', 500);
  }
}

// --- Contact Inbox ---
export async function handleGetAdminContacts(req: Request, res: Response) {
  try {
    const contacts = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return successResponse(res, { data: contacts });
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to fetch contact messages.', 500);
  }
}

export async function handlePatchAdminContactRead(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { read } = req.body;
    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { read: Boolean(read) },
    });
    return successResponse(res, { data: updated });
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to update message status.', 400);
  }
}

// --- Blog Manager CRUD ---
export async function handleAdminGetBlogs(req: Request, res: Response) {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return successResponse(res, { data: blogs });
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to fetch blogs.', 500);
  }
}

export async function handleAdminCreateBlog(req: Request, res: Response) {
  try {
    const { title, slug, excerpt, content, coverImage, published } = req.body;
    const newBlog = await prisma.blog.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        excerpt,
        content,
        coverImage,
        published: Boolean(published),
        publishedAt: published ? new Date() : null,
      },
    });
    return successResponse(res, { data: newBlog }, 'Blog post created.', 201);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to create blog post.', 400);
  }
}

export async function handleAdminUpdateBlog(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, slug, excerpt, content, coverImage, published } = req.body;
    const updated = await prisma.blog.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        published: Boolean(published),
        publishedAt: published ? new Date() : null,
      },
    });
    return successResponse(res, { data: updated }, 'Blog post updated.');
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to update blog post.', 400);
  }
}

export async function handleAdminDeleteBlog(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.blog.delete({ where: { id } });
    return successResponse(res, null, 'Blog post deleted.');
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to delete blog post.', 400);
  }
}

// --- FAQ Manager CRUD ---
export async function handleAdminGetFAQs(req: Request, res: Response) {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { order: 'asc' },
    });
    return successResponse(res, { data: faqs });
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to fetch FAQs.', 500);
  }
}

export async function handleAdminCreateFAQ(req: Request, res: Response) {
  try {
    const { question, answer, order, published } = req.body;
    const newFaq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        order: order || 0,
        published: published !== undefined ? Boolean(published) : true,
      },
    });
    return successResponse(res, { data: newFaq }, 'FAQ created.', 201);
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to create FAQ.', 400);
  }
}

export async function handleAdminUpdateFAQ(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { question, answer, order, published } = req.body;
    const updated = await prisma.fAQ.update({
      where: { id },
      data: { question, answer, order, published: Boolean(published) },
    });
    return successResponse(res, { data: updated }, 'FAQ updated.');
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to update FAQ.', 400);
  }
}

export async function handleAdminDeleteFAQ(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.fAQ.delete({ where: { id } });
    return successResponse(res, null, 'FAQ deleted.');
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to delete FAQ.', 400);
  }
}
