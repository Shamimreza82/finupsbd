// Bank model type
export interface TInstantLoan {
  id?: string;
  bankName: string;
  coverImage?: string | undefined;
  amount?: string;
  periodMonths?: string;
  processingFee: string;
  interestRate: string;
  monthlyEmi?: string;
  totalAmount?: string;
  eligibleLoan?: string;
  featuresInstantLoan?: TFeaturesInstantLoan; // Optional relation to Features
  eligibilityInstantLoan?: TEligibilityInstantLoan; // Optional relation to Eligibility
  feesChargesInstantLoan?: TFeesChargesInstantLoan; // Optional relation to FeesCharges
}

// Features model type
export interface TFeaturesInstantLoan {
  id?: string;
  loanAmount: string;
  minimumAmount: string;
  maximumAmount: string;
  loanTenure: string;
  minimumYear: string;
  maximumYear: string;
}

// Eligibility model type
export interface TEligibilityInstantLoan {
  id?: string;
  condition: string;
  offer: string;
  minimumIncome: number;
  minimumExperience: number;
  ageRequirement: number;
}

// FeesCharges model type
export interface TFeesChargesInstantLoan {
  id?: string;
  processingFee: string;
  earlySettlementFee: string;
  prepaymentFee: string;
  LoanReSchedulingFee: string;
  penalCharge: string;
}
