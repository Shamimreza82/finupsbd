/*
  Warnings:

  - You are about to drop the `EligibilityCarLoan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EligibilityHomeLoan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EligibilitySMELoan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeaturesCarLoan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeaturesHomeLoan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeaturesSMELoan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeesChargesCarLoan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeesChargesHomeLoan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeesChargesSMELoan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carLoan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `homeLoan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `smeLoan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bankName` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EligibilityCarLoan" DROP CONSTRAINT "EligibilityCarLoan_carLoanId_fkey";

-- DropForeignKey
ALTER TABLE "EligibilityHomeLoan" DROP CONSTRAINT "EligibilityHomeLoan_homeLoanId_fkey";

-- DropForeignKey
ALTER TABLE "EligibilitySMELoan" DROP CONSTRAINT "EligibilitySMELoan_smeLoanId_fkey";

-- DropForeignKey
ALTER TABLE "FeaturesCarLoan" DROP CONSTRAINT "FeaturesCarLoan_carLoanId_fkey";

-- DropForeignKey
ALTER TABLE "FeaturesHomeLoan" DROP CONSTRAINT "FeaturesHomeLoan_homeLoanId_fkey";

-- DropForeignKey
ALTER TABLE "FeaturesSMELoan" DROP CONSTRAINT "FeaturesSMELoan_smeLoanId_fkey";

-- DropForeignKey
ALTER TABLE "FeesChargesCarLoan" DROP CONSTRAINT "FeesChargesCarLoan_carLoanId_fkey";

-- DropForeignKey
ALTER TABLE "FeesChargesHomeLoan" DROP CONSTRAINT "FeesChargesHomeLoan_homeLoanId_fkey";

-- DropForeignKey
ALTER TABLE "FeesChargesSMELoan" DROP CONSTRAINT "FeesChargesSMELoan_smeLoanId_fkey";

-- DropForeignKey
ALTER TABLE "carLoan" DROP CONSTRAINT "carLoan_userId_fkey";

-- DropForeignKey
ALTER TABLE "homeLoan" DROP CONSTRAINT "homeLoan_userId_fkey";

-- DropForeignKey
ALTER TABLE "smeLoan" DROP CONSTRAINT "smeLoan_userId_fkey";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "bankName",
ADD COLUMN     "bankName" "BankName" NOT NULL;

-- DropTable
DROP TABLE "EligibilityCarLoan";

-- DropTable
DROP TABLE "EligibilityHomeLoan";

-- DropTable
DROP TABLE "EligibilitySMELoan";

-- DropTable
DROP TABLE "FeaturesCarLoan";

-- DropTable
DROP TABLE "FeaturesHomeLoan";

-- DropTable
DROP TABLE "FeaturesSMELoan";

-- DropTable
DROP TABLE "FeesChargesCarLoan";

-- DropTable
DROP TABLE "FeesChargesHomeLoan";

-- DropTable
DROP TABLE "FeesChargesSMELoan";

-- DropTable
DROP TABLE "carLoan";

-- DropTable
DROP TABLE "homeLoan";

-- DropTable
DROP TABLE "smeLoan";
