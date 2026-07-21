/*
  Warnings:

  - The values [SUPERADMIN,SYSTEM] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');
ALTER TABLE "ApplicationEvent" ALTER COLUMN "createdRole" TYPE "UserRole_new" USING ("createdRole"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;
