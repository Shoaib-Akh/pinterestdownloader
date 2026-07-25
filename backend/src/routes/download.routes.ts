import { Router } from 'express';
import { z } from 'zod';
import { handleDownload, handlePreview, handleHealth } from '../controllers/download.controller.js';
import { downloadRateLimiter } from '../middlewares/rateLimiter.js';
import { validateBody } from '../middlewares/validateRequest.js';

const router = Router();

const downloadSchema = z.object({
  url: z.string().min(1, 'Pinterest URL is required.'),
});

router.post('/download', downloadRateLimiter, validateBody(downloadSchema), handleDownload);
router.post('/preview', downloadRateLimiter, validateBody(downloadSchema), handlePreview);
router.get('/health', handleHealth);

export default router;
