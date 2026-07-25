import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.js';
import { errorResponse } from '../utils/apiResponse.js';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Unhandled Error [${req.method} ${req.url}]: ${err.stack || err.message}`);
  return errorResponse(res, 'An unexpected server error occurred.', 500);
};
