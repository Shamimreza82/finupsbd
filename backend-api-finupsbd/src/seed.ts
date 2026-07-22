import { seedSuperAdmin, seedDemoUser } from './app/DB';
import { prisma } from './app';

(async () => {
  await seedSuperAdmin();
  await seedDemoUser();
  await prisma.$disconnect();
})().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
