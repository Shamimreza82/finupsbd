// Root of the response

export type ApplicationStatus = 'SUBMITTED' | 'PENDING' | "IN_PROCESS" | 'APPROVED' | 'REJECTED';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface ApiResponse {
  data: ApplicationStatusData;
}
export interface ApplicationStatusData {
  status: ApplicationStatus;
  adminNotes: string | null;
  applicationId: string;
  eligibleLoanOffer: ExistingLoanUser;
  loanRequest: LoanRequest;
  user: User;
}


// (add any other statuses your API might return)

export interface LoanRequest {
  id: string;
  loanType: string;
  loanAmount: string;            // could be number if you parse it
  purpose: string;
  loanTenure: string;                // could be number if you parse it
  emiStartDate: string;          // ISO date string
  loanApplicationFormId: string;
}

export type ExistingLoanUser = {
  bankName: string;
  bankImage: string;
  loanType: LoanType // Add more specific union types if needed
  amount: string;           // Can be `number` if you convert from string
  eligibleLoan: string;     // Can also be `number`
  interestRate: string;     // Consider `number` if parsing needed
  processingFee: string;    // Consider `number` for math
  periodMonths: number;
};

export enum LoanType {
  PERSONAL_LOAN = "PERSONAL_LOAN",
  HOME_LOAN = "HOME_LOAN",
  CAR_LOAN = "CAR_LOAN",
  SME_LOAN = "SME_LOAN",
  INSTANT_LOAN = "INSTANT_LOAN"
}

export interface User {
  name: string;
  userId: string;
  profile: UserProfile;
}



export interface UserProfile {
  id: string;
  nameAsNid: string;
  nationalIdNumber: string;
  gender: Gender;
  dateOfBirth: string;           // ISO date string
  avatar: string;
  address: string;
  city: string;
  userId: string;
}


