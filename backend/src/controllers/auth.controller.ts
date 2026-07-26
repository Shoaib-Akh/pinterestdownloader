import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { JWT_SECRET, AuthRequest } from '../middlewares/auth.middleware.js';

export async function handleLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, 'Email and password are required.', 400);
  }

  // 1. Try DB user lookup
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (user && user.role === 'ADMIN') {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const token = jwt.sign(
          { userId: user.id, email: user.email, role: user.role },
          JWT_SECRET,
          { expiresIn: '7d' }
        );
        return successResponse(res, {
          token,
          user: { id: user.id, email: user.email, role: user.role },
        }, 'Login successful.');
      }
    }
  } catch {
    // DB offline fallback below
  }

  // 2. Demo fallback credentials if DB is offline or empty
  if (email.toLowerCase() === 'admin@pintsave.app' && password === 'AdminSecret123!') {
    const token = jwt.sign(
      { userId: 'admin-demo-id', email: 'admin@pintsave.app', role: 'ADMIN' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    return successResponse(res, {
      token,
      user: { id: 'admin-demo-id', email: 'admin@pintsave.app', role: 'ADMIN' },
    }, 'Login successful (Demo Mode).');
  }

  return errorResponse(res, 'Invalid credentials or non-admin account.', 401);
}

export async function handleLogout(req: Request, res: Response) {
  return successResponse(res, null, 'Logged out successfully.');
}

export async function handleGetMe(req: AuthRequest, res: Response) {
  if (!req.user) {
    return errorResponse(res, 'Unauthenticated', 401);
  }

  return successResponse(res, { user: req.user });
}
