import { Router } from 'express';
import { requireAdmin } from '../middlewares/auth.middleware.js';
import {
  handleGetAdminStats,
  handleGetAdminDownloads,
  handleGetAdminContacts,
  handlePatchAdminContactRead,
  handleAdminGetBlogs,
  handleAdminCreateBlog,
  handleAdminUpdateBlog,
  handleAdminDeleteBlog,
  handleAdminGetFAQs,
  handleAdminCreateFAQ,
  handleAdminUpdateFAQ,
  handleAdminDeleteFAQ,
} from '../controllers/admin.controller.js';

const router = Router();

// Protect all admin routes
router.use(requireAdmin);

// Dashboard stats & logs
router.get('/admin/stats', handleGetAdminStats);
router.get('/admin/downloads', handleGetAdminDownloads);

// Contacts
router.get('/admin/contacts', handleGetAdminContacts);
router.patch('/admin/contacts/:id', handlePatchAdminContactRead);

// Blog CRUD
router.get('/admin/blog', handleAdminGetBlogs);
router.post('/admin/blog', handleAdminCreateBlog);
router.put('/admin/blog/:id', handleAdminUpdateBlog);
router.delete('/admin/blog/:id', handleAdminDeleteBlog);

// FAQ CRUD
router.get('/admin/faq', handleAdminGetFAQs);
router.post('/admin/faq', handleAdminCreateFAQ);
router.put('/admin/faq/:id', handleAdminUpdateFAQ);
router.delete('/admin/faq/:id', handleAdminDeleteFAQ);

export default router;
