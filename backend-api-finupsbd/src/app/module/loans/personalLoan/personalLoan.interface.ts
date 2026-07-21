// Bank model type
export interface TPersonalLoan {
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
  features?: TFeatures; // Optional relation to Features
  eligibility?: TEligibility; // Optional relation to Eligibility
  feesCharges?: TFeesCharges; // Optional relation to FeesCharges
}

// Features model type
export interface TFeatures {
  id?: string;
  loanAmount: string;
  minimumAmount: string;
  maximumAmount: string;
  loanTenure: string;
  minimumYear: string;
  maximumYear: string;
  bankId?: string; // Foreign key referencing Bank
  bank?: TPersonalLoan; // Related Bank entity
}

// Eligibility model type
export interface TEligibility {
  id?: string;
  condition: string;
  offer: string;
  minimumIncome: number;
  minimumExperience: number;
  ageRequirement: number;
  bankId?: string; // Foreign key referencing Bank
  bank?: TPersonalLoan; // Related Bank entity
}

// FeesCharges model type
export interface TFeesCharges {
  id?: string;
  processingFee: string;
  earlySettlementFee: string;
  prepaymentFee: string;
  LoanReSchedulingFee: string;
  penalCharge: string;
  bankId?: string; // Foreign key referencing Bank
  bank?: TPersonalLoan; // Related Bank entity
}
