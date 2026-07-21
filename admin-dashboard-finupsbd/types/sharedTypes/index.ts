export type TLoanStatusType =
  | 'SUBMITTED'
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'APPROVED'
  | 'REJECTED'
  | 'COMPLETED';



  export type AppFilters = {
  searchTerm?: string;
  productType?: 'all' | 'PERSONAL' | 'INSTANT' | 'CREDIT_CARD';
  status?: 'all' | 'PENDING' | 'IN_PROGRESS' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  page?: number;
  limit?: number;
};



export type TPagination = {
  limit: string
  page: string
  total: number
  totalPages: number
}