/*
  Warnings:

  - You are about to drop the `EligibilityCreditCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeaturesCreditCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeesChargesCreditCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `creditCards` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CardTypes" AS ENUM ('CREDIT_CARO', 'PREPAID_CARD', 'TRAVEL_CARD');

-- AlterEnum
ALTER TYPE "CardFeaturesType" ADD VALUE 'PREMIUM';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CardNetwork" ADD VALUE 'UNIONPAY';
ALTER TYPE "CardNetwork" ADD VALUE 'OTHER';

-- DropForeignKey
ALTER TABLE "EligibilityCreditCard" DROP CONSTRAINT "EligibilityCreditCard_creditCardId_fkey";

-- DropForeignKey
ALTER TABLE "FeaturesCreditCard" DROP CONSTRAINT "FeaturesCreditCard_creditCardId_fkey";

-- DropForeignKey
ALTER TABLE "FeesChargesCreditCard" DROP CONSTRAINT "FeesChargesCreditCard_creditCardId_fkey";

-- DropForeignKey
ALTER TABLE "creditCards" DROP CONSTRAINT "creditCards_userId_fkey";

-- DropTable
DROP TABLE "EligibilityCreditCard";

-- DropTable
DROP TABLE "FeaturesCreditCard";

-- DropTable
DROP TABLE "FeesChargesCreditCard";

-- DropTable
DROP TABLE "creditCards";

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "cardName" TEXT NOT NULL,
    "bankName" TEXT,
    "cardImage" TEXT,
    "coverImage" TEXT,
    "interestPerDay" TEXT,
    "freeAnnualFee" TEXT,
    "regularAnnualFee" TEXT,
    "interestFreePeriod" TEXT,
    "latePaymentFees" TEXT,
    "currency" "Currency" NOT NULL,
    "cardFeaturesType" "CardFeaturesType" NOT NULL,
    "cardNetwork" "CardNetwork" NOT NULL,
    "annualFeeWaivedReward" TEXT,
    "freeSupplementaryCards" TEXT,
    "maxSupplementaryCards" TEXT,
    "balanceTransferAvailability" TEXT,
    "ownBankATMFee" TEXT,
    "otherBankATMFee" TEXT,
    "loungeFacility" TEXT,
    "loungeVisit" TEXT,
    "cardChequeProcessingFee" TEXT,
    "processingFeeMinimum" TEXT,
    "cashWithdrawalLimit" TEXT,
    "cardType" "CardType" NOT NULL DEFAULT 'CREDIT_CARD',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesCard" (
    "id" TEXT NOT NULL,
    "features1" TEXT,
    "features2" TEXT,
    "features3" TEXT,
    "features4" TEXT,
    "features5" TEXT,
    "cardId" TEXT,

    CONSTRAINT "FeaturesCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityCard" (
    "id" TEXT NOT NULL,
    "condition" TEXT,
    "offer" TEXT,
    "minimumIncome" INTEGER,
    "minimumExperience" INTEGER,
    "ageRequirement" INTEGER,
    "cardId" TEXT,

    CONSTRAINT "EligibilityCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesCard" (
    "id" TEXT NOT NULL,
    "annualFee" TEXT,
    "annualFeeWaived" TEXT,
    "latePaymentFee" TEXT,
    "interestRate" TEXT,
    "balanceTransferRate" TEXT,
    "cardId" TEXT,

    CONSTRAINT "FeesChargesCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesCard_cardId_key" ON "FeaturesCard"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityCard_cardId_key" ON "EligibilityCard"("cardId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesCard_cardId_key" ON "FeesChargesCard"("cardId");

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesCard" ADD CONSTRAINT "FeaturesCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityCard" ADD CONSTRAINT "EligibilityCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesChargesCard" ADD CONSTRAINT "FeesChargesCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
