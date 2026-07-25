import { PrismaClient } from '@prisma/client';
import { logger } from './logger.js';

export const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => logger.info('Database connection established via Prisma'))
  .catch((err) => logger.warn(`Prisma DB connection deferred: ${err.message}`));
