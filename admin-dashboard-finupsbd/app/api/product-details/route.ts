import { NextResponse } from "next/server";

export async function GET() {
  const loan = {
    bankName: "UNITED_COMMERCIAL_BANK_PLC",
    amount: "100000",
    periodMonths: "12",
    processingFee: "0.5%",
    interestRate: "13.0%",
    monthlyEmi: "9,000",
    totalAmount: "108,000",
    eligibleLoan: "Up to 3x monthly income",
    loanType: "HOME_LOAN",
    eligibility: {
      condition: "Salaried employee with payroll account",
      offer: "Disbursement within 24 hours",
      minimumIncome: 20000,
      minimumExperience: 6,
      ageRequirement: 21,
    },
    feesCharges: {
      processingFee: "0.5%",
      earlySettlementFee: "1%",
      prepaymentFee: "0.5%",
      LoanReSchedulingFee: "BDT 300",
      penalCharge: "2% per month on overdue",
    },
    features: {
      loanAmount: "BDT 100,000",
      minimumAmount: "BDT 10,000",
      maximumAmount: "BDT 300,000",
      loanTenure: "6–12 months",
      minimumYear: "0.5",
      maximumYear: "1",
    },
  };

  const card = {
    cardName: "EBL Platinum Credit Card",
    bankName: "EASTERN_BANK_PLC",
    interestPerDay: "0.055%",
    freeAnnualFee: "First year free",
    regularAnnualFee: "BDT 3,000 per year",
    interestFreePeriod: "Up to 50 days",
    latePaymentFees: "BDT 500 or 2% of due, whichever is higher",
    currency: "DUAL",
    cardFeaturesType: "PLATINUM",
    cardNetwork: "VISA",
    annualFeeWaivedReward: "Spend BDT 200,000 annually to waive next year's fee",
    freeSupplementaryCards: "2",
    maxSupplementaryCards: "5",
    balanceTransferAvailability: "Available up to 80% of limit",
    ownBankATMFee: "Free",
    otherBankATMFee: "BDT 100 per withdrawal",
    loungeFacility: "International + Domestic lounges",
    loungeVisit: "8 free visits per year",
    cardChequeProcessingFee: "BDT 300 per cheque",
    processingFeeMinimum: "BDT 500 or 2%, whichever is higher",
    cashWithdrawalLimit: "50% of credit limit",
    cardType: "CREDIT_CARD",
    features: {
      features1: "Up to 50 days interest-free credit period",
      features2: "Accepted at over 30 million VISA merchants worldwide",
      features3: "Complimentary access to airport lounges",
      features4: "EMI facility on purchases and transfers",
      features5: "24/7 customer care support",
    },
    eligibility: {
      condition: "Bangladeshi citizens with stable income",
      offer: "Priority processing for salaried professionals",
      minimumIncome: 40000,
      minimumExperience: 12,
      ageRequirement: 21,
    },
    feesCharges: {
      annualFee: "BDT 3,000",
      annualFeeWaived: "Spend BDT 200,000 annually to waive next year's fee",
      latePaymentFee: "BDT 500 or 2% of due, whichever is higher",
      interestRate: "20% per annum",
      balanceTransferRate: "12% per annum",
    },
  };

  return NextResponse.json({ loan, card });
}
