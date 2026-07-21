/*
  Warnings:

  - Changed the type of `loanType` on the `loans` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LoanTypes" AS ENUM ('PERSONAL_LOAN', 'HOME_LOAN', 'CAR_LOAN', 'SME_LOAN', 'INSTANT_LOAN');

-- AlterTable
ALTER TABLE "loans" DROP COLUMN "loanType",
ADD COLUMN     "loanType" "LoanTypes" NOT NULL;
