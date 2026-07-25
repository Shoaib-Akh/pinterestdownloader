import { Router } from 'express';
import { handleGetBlogs, handleGetBlogBySlug } from '../controllers/blog.controller.js';

const router = Router();

router.get('/blog', handleGetBlogs);
router.get('/blog/:slug', handleGetBlogBySlug);

export default router;
