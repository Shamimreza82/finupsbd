/*
  Warnings:

  - The values [TRAVEL_CARD] on the enum `CardTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CardTypes_new" AS ENUM ('CREDIT_CARD', 'PREPAID_CARD', 'DEBIT_CARD');
ALTER TABLE "cards" ALTER COLUMN "cardType" TYPE "CardTypes_new" USING ("cardType"::text::"CardTypes_new");
ALTER TYPE "CardTypes" RENAME TO "CardTypes_old";
ALTER TYPE "CardTypes_new" RENAME TO "CardTypes";
DROP TYPE "CardTypes_old";
COMMIT;
