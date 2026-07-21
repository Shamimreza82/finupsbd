import { z } from "zod"

export const loanRequestSchema = z.object({
  loanAmount: z.string().min(1, {
    message: "Loan amount is required.",
  }).max(5000000, { message: "you can not 5000000 more than this amount", }),
  loanTenure: z.number({
    required_error: "Loan tenure is required.",
  }),
  loanPurpose: z.string().min(2, {
    message: "Loan purpose must be at least 2 characters.",
  }),
  emiStartDate: z.number({
    required_error: "EMI start date is required.",
  }),
})

export type LoanRequestValues = z.infer<typeof loanRequestSchema>
 