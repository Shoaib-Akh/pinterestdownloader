import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/apiResponse.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'pinflow_super_secret_jwt_key_2026';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication token missing or invalid.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };

    if (!decoded || decoded.role !== 'ADMIN') {
      return errorResponse(res, 'Access denied. Admin privileges required.', 403);
    }

    req.user = decoded;
    next();
  } catch {
    return errorResponse(res, 'Invalid or expired authentication token.', 401);
  }
}
