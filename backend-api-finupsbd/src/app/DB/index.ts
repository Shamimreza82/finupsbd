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

    // logger.info("Super admin upserted successfully")
  } catch (error) {
    logger.error(`Super admin upsert failed: ${error}`);
  }
};

export default seedSuperAdmin;
