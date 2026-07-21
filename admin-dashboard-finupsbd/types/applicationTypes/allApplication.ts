import { TLoanStatusType } from "../sharedTypes";


type EligibleLoanOffer = {
  bankName: string;
  eligibleLoan: string; // e.g. '564334.00'
  loanType: string;
};

type LoanRequest = {
  loanAmount: string;
};

type User = {
  name: string;
};

export type ApplicationData = {
  id: string;
  applicationId: string;
  userId: string;
  user: User;
  eligibleLoanOffer: EligibleLoanOffer;
  adminNotes: string | null;
  loanRequest: LoanRequest;
  status: TLoanStatusType
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
};

export type GetApplicationsResponse = {
  length: number;
  meta: PaginationMeta;
  data: ApplicationData[];
  message: string;
  statusCode: number;
  success: boolean;
};


export type TApplicationBaseApiResponce = {
  success: boolean, 
  message: string, 
  statusCode: number, 
  data: TApplicationApiResponce
}



export type TApplicationApiResponce = {
  data: ApplicationData[];
  pagination: PaginationMeta
}


export type PaginationMeta = {
  total: number;      // total number of items across all pages
  page: number;       // current page (1-based)
  limit: number;      // items per page
  totalPages: number; // total number of pages
};

