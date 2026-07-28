import { Router } from 'express';
import { handleGetBlogs, handleGetBlogBySlug } from '../controllers/blog.controller.js';
import { handleGetCommentsByBlogSlug, handleAddCommentByBlogSlug } from '../controllers/comment.controller.js';

const router = Router();

router.get('/blog', handleGetBlogs);
router.get('/blog/:slug', handleGetBlogBySlug);
router.get('/blog/:slug/comments', handleGetCommentsByBlogSlug);
router.post('/blog/:slug/comments', handleAddCommentByBlogSlug);

export default router;
