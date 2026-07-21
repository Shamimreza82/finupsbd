import { PrismaClient } from '@prisma/client';
import { logger } from '../app/utils/logger/logger';

const prisma = new PrismaClient();

export async function runCriticalChecks() {
  try {
    await prisma.$connect();
    // logger.info("✅ Database connected");
  } catch (err) {
    logger.error('❌ Database error please check database connaction:', err);
    process.exit(1); // stop server iase connection failef DB is critical
  }
}
