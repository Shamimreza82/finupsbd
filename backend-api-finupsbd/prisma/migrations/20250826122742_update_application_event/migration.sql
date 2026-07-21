/*
  Warnings:

  - Changed the type of `eventType` on the `ApplicationEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('SUBMITTED', 'APPROVED', 'REJECTED', 'FILE_UPLOADED', 'FEEDBACK', 'STATUS_CHANGED', 'OTHER');

-- CreateEnum
CREATE TYPE "FeedbackLevel" AS ENUM ('INFO', 'WARNING', 'ERROR', 'CRITICAL');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'SUPERADMIN', 'SYSTEM');

-- AlterTable
ALTER TABLE "ApplicationEvent" ADD COLUMN     "createdRole" "UserRole",
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "severity" "FeedbackLevel",
ADD COLUMN     "stateAfter" TEXT,
ADD COLUMN     "stateBefore" TEXT,
DROP COLUMN "eventType",
ADD COLUMN     "eventType" "EventType" NOT NULL;
