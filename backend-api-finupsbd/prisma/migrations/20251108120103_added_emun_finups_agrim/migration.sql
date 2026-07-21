-- CreateEnum
CREATE TYPE "InsuranceType" AS ENUM ('CAR_INSRUNCE', 'BIKE_INSRUNCE');

-- AlterEnum
ALTER TYPE "BankName" ADD VALUE 'FINUPS_AGRIM';

-- CreateTable
CREATE TABLE "insurances" (
    "id" TEXT NOT NULL,
    "bankName" "BankName" NOT NULL,
    "amount" TEXT,
    "coverImage" TEXT,
    "periodMonths" TEXT,
    "processingFee" TEXT NOT NULL,
    "interestRate" TEXT NOT NULL,
    "monthlyEmi" TEXT,
    "totalAmount" TEXT,
    "eligibleLoan" TEXT,
    "insuranceType" "InsuranceType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "insurances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesInsurance" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "insuranceId" TEXT NOT NULL,

    CONSTRAINT "FeaturesInsurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityInsurance" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "insuranceId" TEXT NOT NULL,

    CONSTRAINT "EligibilityInsurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesInsurance" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "insuranceId" TEXT NOT NULL,

    CONSTRAINT "FeesChargesInsurance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesInsurance_insuranceId_key" ON "FeaturesInsurance"("insuranceId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityInsurance_insuranceId_key" ON "EligibilityInsurance"("insuranceId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesInsurance_insuranceId_key" ON "FeesChargesInsurance"("insuranceId");

-- AddForeignKey
ALTER TABLE "insurances" ADD CONSTRAINT "insurances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesInsurance" ADD CONSTRAINT "FeaturesInsurance_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "insurances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityInsurance" ADD CONSTRAINT "EligibilityInsurance_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "insurances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesChargesInsurance" ADD CONSTRAINT "FeesChargesInsurance_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "insurances"("id") ON DELETE CASCADE ON UPDATE CASCADE;
