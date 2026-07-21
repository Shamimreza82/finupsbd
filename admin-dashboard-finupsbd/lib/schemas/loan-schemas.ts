import { z } from "zod"
import { BankNames } from "../constant/bankName"

// Enums
export const BankNameEnum = z.enum(BankNames)

export const LoanTypesEnum = z.enum(["PERSONAL_LOAN", "HOME_LOAN", "CAR_LOAN", "SME_LOAN", "INSTANT_LOAN"])

// Features Schema
export const FeaturesLoansSchema = z.object({
  loanAmount: z.string().min(1, "Loan amount is required"),
  minimumAmount: z.string().min(1, "Minimum amount is required"),
  maximumAmount: z.string().min(1, "Maximum amount is required"),
  loanTenure: z.string().min(1, "Loan tenure is required"),
  minimumYear: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Minimum year must be a positive number",
  }),
  maximumYear: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Maximum year must be a positive number",
  }),
})

// Eligibility Schema
export const EligibilityLoansSchema = z.object({
  condition: z.string().min(1, "Condition is required"),
  offer: z.string().min(1, "Offer is required"),
  minimumIncome: z.number().int().positive("Minimum income must be a positive number"),
  minimumExperience: z.number().int().min(0, "Minimum experience cannot be negative"),
  ageRequirement: z.number().int().min(18, "Age requirement must be at least 18"),
})

// Fees & Charges Schema
export const FeesChargesLoansSchema = z.object({
  processingFee: z.string().min(1, "Processing fee is required"),
  earlySettlementFee: z.string().min(1, "Early settlement fee is required"),
  prepaymentFee: z.string().min(1, "Prepayment fee is required"),
  LoanReSchedulingFee: z.string().min(1, "Loan rescheduling fee is required"),
  penalCharge: z.string().min(1, "Penal charge is required"),
})

// Main Loan Schema
export const LoanSchema = z.object({
  bankName: BankNameEnum,
  amount: z.string().optional(),
  coverImage: z.string().optional(),
  periodMonths: z.string().optional(),
  processingFee: z.string().min(1, "Processing Fee is required").refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 5, {
    message: "Processing fee must be between 0 and 5",
  }),
  interestRate: z.string().min(1, "Interest Rate is required").refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 25, {
    message: "Interest rate must be between 0 and 25",
  }),
  monthlyEmi: z.string().optional(),
  totalAmount: z.string().optional(),
  eligibleLoan: z.string().optional(),
  loanType: LoanTypesEnum,
  eligibility: EligibilityLoansSchema,
  feesCharges: FeesChargesLoansSchema,
  features: FeaturesLoansSchema,
})

export type LoanFormData = z.infer<typeof LoanSchema>
export type EligibilityLoans = z.infer<typeof EligibilityLoansSchema>
export type FeesChargesLoans = z.infer<typeof FeesChargesLoansSchema>
export type FeaturesLoans = z.infer<typeof FeaturesLoansSchema>
