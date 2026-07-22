import { prisma } from '../../app';
import bcrypt from 'bcrypt';
import { ConfigFile } from '../../config';
import { generateUserId } from '../utils/generateUserId';
import { logger } from '../utils/logger/logger';

const seedSuperAdmin = async () => {
  try {
    const userId = await generateUserId();
    const passwordHash = await bcrypt.hash(
      ConfigFile.SUPER_ADMIN_PASSWORD as string,
      Number(ConfigFile.BCRYPT_SALT_ROUNDS),
    );

    await prisma.user.upsert({
      where: { email: ConfigFile.SUPER_ADMIN_EMAIL! }, // unique field to identify super admin
      update: {
        name: 'Md Rasel',
        phone: '01719185563',
        password: passwordHash,
        role: 'SUPER_ADMIN',
        emailVerified: true,
        userId: userId,
      },
      create: {
        name: 'Md Rasel',
        userId: userId,
        email: ConfigFile.SUPER_ADMIN_EMAIL!,
        phone: '01719185563',
        password: passwordHash,
        role: 'SUPER_ADMIN',
        emailVerified: true,
      },
    });

    console.log('Super admin seeded successfully');
    logger.info('Super admin upserted successfully');
  } catch (error) {
    logger.error(`Super admin upsert failed: ${error}`);
  }
};

const seedDemoUser = async () => {
  try {
    const userId = await generateUserId();
    const passwordHash = await bcrypt.hash(
      ConfigFile.DEMO_USER_PASSWORD as string,
      Number(ConfigFile.BCRYPT_SALT_ROUNDS),
    );

    await prisma.user.upsert({
      where: { email: ConfigFile.DEMO_USER_EMAIL! },
      update: {
        name: 'Demo User',
        phone: '01700000000',
        password: passwordHash,
        role: 'USER',
        emailVerified: true,
        userId: userId,
      },
      create: {
        name: 'Demo User',
        userId: userId,
        email: ConfigFile.DEMO_USER_EMAIL!,
        phone: '01700000000',
        password: passwordHash,
        role: 'USER',
        emailVerified: true,
      },
    });

    console.log('Demo user seeded successfully');
    logger.info('Demo user upserted successfully');
  } catch (error) {
    logger.error(`Demo user upsert failed: ${error}`);
  }
};

export { seedSuperAdmin, seedDemoUser };
