import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export async function handleGetBlogs(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where: { published: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          publishedAt: true,
          createdAt: true,
        },
      }),
      prisma.blog.count({ where: { published: true } }),
    ]);

    return successResponse(res, {
      data: blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (err: any) {
    return errorResponse(res, err.message || 'Failed to fetch blog posts.', 500);
  }
}

export async function handleGetBlogBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const blog = await prisma.blog.findUnique({
      where: { slug, published: true },
    });

    if (!blog) {
      return errorResponse(res, 'Blog post not found.', 404);
    }

    return successResponse(res, { data: blog });
  } catch (err: any) {
    return errorResponse(res, err.message || 'Error fetching blog post.', 500);
  }
}
