/*
  Warnings:

  - The values [SUBMITTED,APPROVED,REJECTED,FEEDBACK] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('CREATE_APPLICATION', 'FILE_UPLOADED', 'STATUS_CHANGED', 'OTHER');
ALTER TABLE "ApplicationEvent" ALTER COLUMN "eventType" TYPE "EventType_new" USING ("eventType"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "EventType_old";
COMMIT;
