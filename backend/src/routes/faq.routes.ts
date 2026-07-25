import { Router } from 'express';
import { handleGetFaqs } from '../controllers/faq.controller.js';

const router = Router();

router.get('/faq', handleGetFaqs);

export default router;
