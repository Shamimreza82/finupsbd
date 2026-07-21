export interface EmiCalculatorPayload {
  disbursementDate: string;
  loanAmount: string;
  numberOfMonths: number;
  numberOfSchedule?: number;
  interestRate: string
  emiAmount?: string;
 }