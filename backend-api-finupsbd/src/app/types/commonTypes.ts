/* eslint-disable no-unused-vars */
export const blacklistedTokens: Set<string> = new Set();



export const AuthGurd = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export type UserRole = typeof AuthGurd[keyof typeof AuthGurd];


export type TMiddlewareUser = {
  userId: string; // Unique identifier for the user
  role: UserRole; // Restrict to specific roles
  email: string; // Email address of the user
  iat: number; // Issued at timestamp (UNIX)
  exp: number; // Expiry timestamp (UNIX)
};

export type TMulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
};

export type TUploadedFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

export interface TLoanRequest {
  bankName: string;
  bankImage: string;
  loanType: LoanType;
  amount: string;
  eligibleLoan: string;
  interestRate: string;
  periodMonths: number;
  processingFee: string;
}

enum LoanType {
  PERSONAL_LOAN = 'PERSONAL_LOAN',
  HOME_LOAN = 'HOME_LOAN',
  CAR_LOAN = 'CAR_LOAN',
  SME_LOAN = 'SME_LOAN',
  INSTANT_LOAN = 'INSTANT_LOAN',
}
