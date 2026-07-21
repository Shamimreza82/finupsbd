-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CardType" ADD VALUE 'PREPAID_CARD';
ALTER TYPE "CardType" ADD VALUE 'TRAVEL_CARD';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MainLoanType" ADD VALUE 'TRAVEL_CARD';
ALTER TYPE "MainLoanType" ADD VALUE 'PREPAID_CARD';
