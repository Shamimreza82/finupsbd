/*
  Warnings:

  - The values [CREDIT_CARO] on the enum `CardTypes` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `cardType` on the `cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CardTypes_new" AS ENUM ('CREDIT_CARD', 'PREPAID_CARD', 'TRAVEL_CARD');
ALTER TABLE "cards" ALTER COLUMN "cardType" TYPE "CardTypes_new" USING ("cardType"::text::"CardTypes_new");
ALTER TYPE "CardTypes" RENAME TO "CardTypes_old";
ALTER TYPE "CardTypes_new" RENAME TO "CardTypes";
DROP TYPE "CardTypes_old";
COMMIT;

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "cardType",
ADD COLUMN     "cardType" "CardTypes" NOT NULL;
