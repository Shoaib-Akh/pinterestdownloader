import { Router } from 'express';
import { handleLogin, handleLogout, handleGetMe } from '../controllers/auth.controller.js';
import { requireAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/auth/login', handleLogin);
router.post('/auth/logout', handleLogout);
router.get('/auth/me', requireAdmin, handleGetMe);

export default router;
