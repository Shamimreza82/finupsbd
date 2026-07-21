import { z } from 'zod';
import { BankName } from '../../enums/BankName';

/** -------- Enums -------- */
export const LoanTypesEnum = z.enum([
  'PERSONAL_LOAN',
  'HOME_LOAN',
  'CAR_LOAN',
  'SME_LOAN',
  'INSTANT_LOAN',
]);

// If you have a Prisma enum BankName, mirror it here.
// Replace with your actual enum members.

/** -------- Leaf sub-schemas (flat) -------- */
const featureSchema = z.object({
  loanAmount: z.string().min(1, 'Loan amount is required'),
  minimumAmount: z.string().min(1, 'Minimum amount is required'),
  maximumAmount: z.string().min(1, 'Maximum amount is required'),
  loanTenure: z.string().min(1, 'Loan tenure is required'),
  minimumYear: z.string().min(1, 'Minimum year is required'),
  maximumYear: z.string().min(1, 'Maximum year is required'),
});

const eligibilitySchema = z.object({
  condition: z.string().min(1, 'Condition is required'),
  offer: z.string().min(1, 'Offer is required'),
  minimumIncome: z.number().positive().min(1, 'Minimum income is required'),
  minimumExperience: z.number().positive().min(1, 'Minimum experience is required'),
  ageRequirement: z.number().positive().min(1, 'Age requirement is required'),
});

const feesChargesSchema = z.object({
  processingFee: z.string().min(1, 'Processing fee is required'),
  earlySettlementFee: z.string().min(1, 'Early settlement fee is required'),
  prepaymentFee: z.string().min(1, 'Prepayment fee is required'),
  LoanReSchedulingFee: z.string().min(1, 'Loan rescheduling fee is required'),
  penalCharge: z.string().min(1, 'Penal charge is required'),
});

/** -------- Create schema (API payload that matches Prisma nested create) --------
 * This version lets you call prisma.loan.create({ data }) directly.
 */
export const createLoanValidateSchema = z.object({
  bankName: z.nativeEnum(BankName), // ← enum, not raw string
  amount: z.string().optional(),
  coverImage: z.string().url('Cover image must be a valid URL').optional(),
  periodMonths: z.string().optional(),
  processingFee: z.string().min(1, 'Processing fee is required'),
  interestRate: z.string().min(1, 'Interest rate is required'), // ← required to match Prisma
  monthlyEmi: z.string().optional(),
  totalAmount: z.string().optional(),
  eligibleLoan: z.string().optional(),
  loanType: LoanTypesEnum,
  isActive: z.boolean().optional(), // Prisma defaults true; allow override
  // Prisma nested creates:
  features: featureSchema,
  eligibility: eligibilitySchema,
  feesCharges: feesChargesSchema,
});

/** -------- Update schema (partial + nested update) --------
 * Use this for prisma.loan.update({ where, data })
 */
export const updateLoanValidateSchema = z.object({
  bankName: z.nativeEnum(BankName).optional(),
  amount: z.string().optional(),
  coverImage: z.string().url('Cover image must be a valid URL').optional(),
  periodMonths: z.string().optional(),
  processingFee: z.string().optional(),
  interestRate: z.string().optional(),
  monthlyEmi: z.string().optional(),
  totalAmount: z.string().optional(),
  eligibleLoan: z.string().optional(),
  loanType: LoanTypesEnum.optional(),
  isActive: z.boolean().optional(),

  // Nested relation update patterns:
  // - If the child already exists (1-1 with unique loanId), use update
  // - If it may or may not exist, you can use upsert instead of update
  features: featureSchema.partial().optional(),
  eligibility: eligibilitySchema.partial().optional(),
  feesCharges: feesChargesSchema.partial().optional(),
});

/** -------- Export bundle -------- */
export const LoanValidationSchema = {
  createLoanValidateSchema,
  updateLoanValidateSchema,
};

/** -------- Types -------- */
export type TFeatures = z.infer<typeof featureSchema>;
export type TEligibility = z.infer<typeof eligibilitySchema>;
export type TFeesCharges = z.infer<typeof feesChargesSchema>;

export type TLoanCreate = z.infer<typeof createLoanValidateSchema>;
export type TLoanUpdate = z.infer<typeof updateLoanValidateSchema>;
export type TLoanType = z.infer<typeof LoanTypesEnum>;
