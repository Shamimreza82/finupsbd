/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TApplicationData {
  adminNotes: string | null;
  applicationId: string;
  businessGuarantor: any; // No data provided for structure
  createdAt: string;
  document: Document[];
  additionalDocument: AdditionalDocument[];
  eligibleLoanOffer: EligibleLoanOffer;
  employmentInformation: any; // No data provided
  guarantorInfo: GuarantorInfo;
  id: string;
  isActive: boolean;
  isDeleted: boolean;
  loanInfo: LoanInfo;
  loanRequest: LoanRequest;
  personalGuarantor: any; // No data provided
  personalInfo: PersonalInfo;
  residentialInformation: ResidentialInformation;
  status: string;
  updatedAt: string;
  user: User;
  userId: string;
}

export interface Document {
  id: string;
  loanApplicationFormId: string;
  mimeType: string;
  originalName: string;
  uploadedAt: string;
  url: string;
}

export interface AdditionalDocument {
  id: string;
  fieldName: string | null;
  loanApplicationFormId: string;
  mimeType: string;
  originalName: string;
  uploadedAt: string; // or Date if you want to parse it
  url: string;
}


export interface EligibleLoanOffer {
  amount: string;
  bankImage: string;
  bankName: string;
  eligibleLoan: string;
  id: string;
  interestRate: string;
  loanApplicationFormId: string;
  loanType: string;
  periodMonths: number;
  processingFee: string;
}

export interface GuarantorInfo {
  businessGurantorEmail: string;
  businessGurantorPhone: string;
  id: string;
  isEmailSend: boolean;
  loanApplicationFormId: string;
  personalGurantorEmail: string;
  personalGurantorphone: string;
}

export interface LoanInfo {
  bankAccounts: BankAccount[];
  creditCards: CreditCard[];
  existingLoans: ExistingLoan[];
  hasCreditCard: boolean;
  hasExistingLoan: boolean;
  id: string;
  loanApplicationFormId: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  loanInfoId: string;
}

export interface CreditCard {
  id: string;
  issuerName: string;
  cardLimit: string;
  toBeClosedBeforeDisbursement: boolean;
  loanInfoId: string;
}

export interface ExistingLoan {
  id: string;
  loanType: string;
  adjustmentPlan: string;
  disbursedAmount: string;
  otherLoanType: string;
  loanInfoId: string;
  lenderName: string;
  outstanding: string;
  emi: string;
}

export interface LoanRequest {
  emiStartDate: number;
  id: string;
  loanAmount: string;
  loanApplicationFormId: string;
  loanPurpose: string;
  loanTenure: number;
}

export interface PersonalInfo {
  NIDNumber: string;
  alternateMobileNumber: string;
  dateOfBirth: string;
  educationalLevel: string;
  emailAddress: string;
  fatherName: string;
  fullName: string;
  gender: string;
  id: string;
  loanApplicationFormId: string;
  maritalStatus: string;
  mobileNumber: string;
  motherName: string;
  nationality: string;
  passportNumber: string;
  placeOfBirth: string;
  religion: string;
  residentialStatus: string;
  socialMediaProfiles: string[];
  spouseName: string;
}

export interface ResidentialInformation {
  id: string;
  isPermanentSameAsPresent: boolean;
  loanApplicationFormId: string;
  permanentAddress: string;
  permanentDistrict: string;
  permanentDivision: string;
  permanentLengthOfStay: string;
  permanentOwnershipStatus: string;
  permanentPostalCode: string;
  permanentThana: string;
  presentAddress: string;
  presentDistrict: string;
  presentDivision: string;
  presentLengthOfStay: string;
  presentOwnershipStatus: string;
  presentPostalCode: string;
  presentThana: string;
}

export interface User {
  createdAt: string;
  email: string;
  emailVerified: boolean;
  id: string;
  isActive: boolean;
  lastLogin: string;
  name: string;
  phone: string;
  role: string;
  updatedAt: string;
  userId: string;
}
