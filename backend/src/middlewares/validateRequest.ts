import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { errorResponse } from '../utils/apiResponse.js';

export const validateBody = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      const errorMessage = error.errors?.[0]?.message || 'Invalid request parameters.';
      return errorResponse(res, errorMessage, 400);
    }
  };
};
