import { seedSuperAdmin, seedDemoUser } from './app/DB';
import { seedLoans } from './app/DB/seed-loans';
import { prisma } from './app';

(async () => {
  await seedSuperAdmin();
  await seedDemoUser();
  await seedLoans();
  await prisma.$disconnect();
})().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
