import { Router } from 'express';
import { handleGetPublicStats } from '../controllers/stats.controller.js';

const router = Router();

router.get('/stats/public', handleGetPublicStats);

export default router;
