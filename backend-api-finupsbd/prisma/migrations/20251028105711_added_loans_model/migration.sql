-- CreateTable
CREATE TABLE "loans" (
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
    "loanType" "MainLoanType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturesLoans" (
    "id" TEXT NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "minimumAmount" TEXT NOT NULL,
    "maximumAmount" TEXT NOT NULL,
    "loanTenure" TEXT NOT NULL,
    "minimumYear" TEXT NOT NULL,
    "maximumYear" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,

    CONSTRAINT "FeaturesLoans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityLoans" (
    "id" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "minimumIncome" INTEGER NOT NULL,
    "minimumExperience" INTEGER NOT NULL,
    "ageRequirement" INTEGER NOT NULL,
    "loanId" TEXT NOT NULL,

    CONSTRAINT "EligibilityLoans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesChargesLoans" (
    "id" TEXT NOT NULL,
    "processingFee" TEXT NOT NULL,
    "earlySettlementFee" TEXT NOT NULL,
    "prepaymentFee" TEXT NOT NULL,
    "LoanReSchedulingFee" TEXT NOT NULL,
    "penalCharge" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,

    CONSTRAINT "FeesChargesLoans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeaturesLoans_loanId_key" ON "FeaturesLoans"("loanId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityLoans_loanId_key" ON "EligibilityLoans"("loanId");

-- CreateIndex
CREATE UNIQUE INDEX "FeesChargesLoans_loanId_key" ON "FeesChargesLoans"("loanId");

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturesLoans" ADD CONSTRAINT "FeaturesLoans_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityLoans" ADD CONSTRAINT "EligibilityLoans_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesChargesLoans" ADD CONSTRAINT "FeesChargesLoans_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
