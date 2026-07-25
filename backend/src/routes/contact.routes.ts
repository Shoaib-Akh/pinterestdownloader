import { Router } from 'express';
import { z } from 'zod';
import { handleCreateContact } from '../controllers/contact.controller.js';
import { validateBody } from '../middlewares/validateRequest.js';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Valid email is required.'),
  message: z.string().min(5, 'Message must be at least 5 characters long.'),
});

router.post('/contact', validateBody(contactSchema), handleCreateContact);

export default router;
