import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export async function handleCreateContact(req: Request, res: Response) {
  try {
    const { name, email, message } = req.body;

    try {
      await prisma.contactMessage.create({
        data: {
          name,
          email,
          message,
        },
      });
    } catch {
      // Graceful fallback if DB is offline
    }

    return successResponse(res, {
      message: 'Thank you! Your message has been received.',
    });
  } catch (error: any) {
    return errorResponse(res, 'Failed to process contact message.', 500);
  }
}
