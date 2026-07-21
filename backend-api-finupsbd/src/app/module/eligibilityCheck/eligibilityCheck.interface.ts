/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
// Enums
export enum MainLoanType {
  PERSONAL_LOAN = 'PERSONAL_LOAN',
  HOME_LOAN = 'HOME_LOAN',
  CAR_LOAN = 'CAR_LOAN',
  SME_LOAN = 'SME_LOAN',
  INSTANT_LOAN = 'INSTANT_LOAN',
}

export enum EGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum Profession {
  BUSINESS_OWNER = 'BUSINESS_OWNER',
  SALARIED = 'SALARIED',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
}

export enum BusinessOwnerType {
  PROPRIETORSHIP = 'PROPRIETORSHIP',
  PARTNERSHIP = 'PARTNERSHIP',
  PUBLIC_LIMITED_COMPANY = 'PUBLIC_LIMITED_COMPANY',
}

export enum VehicleType {
  CAR_SEDAN = 'CAR_SEDAN',
  CAR_SUV = 'CAR_SUV',
  CAR_HATCHBACK = 'CAR_HATCHBACK',
  BIKE = 'BIKE',
}

export enum ExistingLoanType {
  HOME_LOAN = 'HOME_LOAN',
  PERSONAL_LOAN = 'PERSONAL_LOAN',
  CAR_LOAN = 'CAR_LOAN',
  SME_LOAN = 'SME_LOAN',
  CREDIT_CARD = 'CREDIT_CARD',
  OTHER = 'OTHER',
}

export enum CardType {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
}

// ExistingLoan type
export interface ExistingLoan {
  id: string;
  existingLoanType: ExistingLoanType;
  emiAmountBDT: number;
  interestRate: number;
  eligibilityCheckId: string;
  createdAt: Date;
  updatedAt: Date;
}

// EligibilityCheck type
export interface TEligibilityCheck {
  tenure: any;
  id: string;
  loanType: MainLoanType;
  gender: EGender;
  dateOfBirth: Date;
  profession: Profession;

  businessOwnerType?: BusinessOwnerType;
  businessType?: string;
  sharePortion?: number;
  tradeLicenseAge?: number;

  vehicleType?: VehicleType;
  expectedLoanTenure?: number;
  monthlyIncome: number;
  jobLocation?: string;

  haveAnyRentalIncome?: boolean;
  rentalArea?: string;
  rentalIncome?: number;

  haveAnyLoan?: boolean;
  haveAnyCreditCard?: boolean;
  numberOfCreditCards?: number;
  numberOfLoans: number;
  cardType?: CardType;
  cardLimitBDT?: number;

  secondaryApplicant?: boolean;
  termsAccepted?: boolean;

  name: string;
  email: string;
  phone: string;

  isAppliedLoan: boolean;
  createdAt: Date;
  updatedAt: Date;

  existingLoans: ExistingLoan[];
}

export type TEligiblityCheckData = {
  queryDataBody: any;
  payload: TEligibilityCheck;
};
