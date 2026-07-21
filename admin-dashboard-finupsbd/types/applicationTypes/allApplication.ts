import { TLoanStatusType } from "../sharedTypes";
import { TModules } from "./qyeryTypes";


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
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TApplicationQuery = {
  searchTerm?: string;
  module?: TModules;
  status?: TLoanStatusType | "ALL";
  page?: number;
  limit?: number;
};

