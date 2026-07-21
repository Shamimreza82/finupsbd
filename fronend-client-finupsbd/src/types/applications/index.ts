export interface EligibleLoanOffer {
  id: string;
  bankName: string;
  bankImage: string;
  loanType: string;
  eligibleLoan: string;
  amount: string;
  interestRate: string;
  periodMonths: number;
  processingFee: string;
  loanApplicationFormId: string;
}

export interface LoanRequest {
  id: string;
  loanAmount: string;
  loanTenure: number;
  loanPurpose: string;
  emiStartDate: number;
  loanApplicationFormId: string;
}

export interface TNewLoanTypes {
  id: string;
  applicationId: string;
  userId: string;
  status: string;
  adminNotes: string | null;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
  eligibleLoanOffer: EligibleLoanOffer;
  loanRequest: LoanRequest;
}





   export interface TAgreementDoc {
        id: string;
        applicationId: string;
        fullName: string;
        nid: string;
        loanName: string;
        loanType: "INSTANT_LOAN" | "PERSONAL_LOAN" | "HOME_LOAN" | "CAR_LOAN"; // extend as needed
        presrntAddress: string; // typo? maybe "presentAddress"
        requstedAmount: number;
        eligibleLoan: number;
        interestRate: number;
        periodMonths: number;
        monthlyEMI: number;
        processingFee: number;
        loanAmountInWord: string;
        loanAmountInBangla: string;
        loanTenure: number;
        emiStartDate: number; // day of month (e.g., 25)
        applicationDate: string; // ISO Date string
        dueDate: string; // ISO Date string
    }

