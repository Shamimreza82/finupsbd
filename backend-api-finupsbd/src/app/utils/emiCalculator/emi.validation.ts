import { z } from 'zod';

const emiCalculateValidation = z.object({
  disbursementDate: z
    .string({
      required_error: 'Date is require',
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Disbursement Date must be a valid date in the format YYYY-MM-DD',
    })
    .transform((date) => new Date(date)), // Automatically convert to Date object
  loanAmount: z
    .string()
    .refine((amount) => !isNaN(parseFloat(amount)) && parseFloat(amount) > 0, {
      message: 'Loan Amount must be a positive number',
    })
    .transform((amount) => parseFloat(amount)), // Convert to number
  numberOfMonths: z
    .number()
    .int({ message: 'Number of Months must be an integer' })
    .positive({ message: 'Number of Months must be greater than zero' }),
  interestRate: z
    .string()
    .refine((rate) => !isNaN(parseFloat(rate)) && parseFloat(rate) >= 0, {
      message: 'Interest Rate must be a non-negative number',
    })
    .transform((rate) => parseFloat(rate)), // Convert to number
});

export default emiCalculateValidation;
