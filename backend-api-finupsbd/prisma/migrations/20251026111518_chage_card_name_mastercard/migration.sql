/*
  Warnings:

  - The values [MASTER] on the enum `CardNetwork` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CardNetwork_new" AS ENUM ('VISA', 'MASTERCAED', 'AMEX', 'UNIONPAY', 'OTHER');
ALTER TABLE "cards" ALTER COLUMN "cardNetwork" TYPE "CardNetwork_new" USING ("cardNetwork"::text::"CardNetwork_new");
ALTER TYPE "CardNetwork" RENAME TO "CardNetwork_old";
ALTER TYPE "CardNetwork_new" RENAME TO "CardNetwork";
DROP TYPE "CardNetwork_old";
COMMIT;

-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "cardType" DROP DEFAULT;
