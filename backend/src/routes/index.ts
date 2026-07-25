import { Router } from 'express';
import downloadRoutes from './download.routes.js';
import faqRoutes from './faq.routes.js';
import blogRoutes from './blog.routes.js';
import contactRoutes from './contact.routes.js';
import statsRoutes from './stats.routes.js';
import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';

const router = Router();

router.use('/api', downloadRoutes);
router.use('/api', faqRoutes);
router.use('/api', blogRoutes);
router.use('/api', contactRoutes);
router.use('/api', statsRoutes);
router.use('/api', authRoutes);
router.use('/api', adminRoutes);

export default router;
