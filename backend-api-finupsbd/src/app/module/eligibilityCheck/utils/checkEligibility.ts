// import { TEligibilityCheck } from "../eligibilityCheck.interface";

// interface EligibilityCheckResult {
//     isEligible: boolean;
//     reasons: string[];
//   }

// interface DetailedEligibilityCheckResult extends EligibilityCheckResult {
//     amount: number;
//     periodMonths: number;
//     processingFee: number;
//     interestRate: number;
//     monthlyEmi: number;
//     totalAmount: number;
//     eligibleLoan: number;
//   }

//   export const checkEligibilityWithLoanDetails = (
//     payload: TEligibilityCheck,           // e.g. the object you showed
//     requestedAmount: number,      // how much the user wants
//     requestedPeriodMonths: number // for how many months
//   ): DetailedEligibilityCheckResult => {
//     const reasons: string[] = [];

//     // Otherwise, they've passed basic checks; let's calculate the loan details.

//     // ---------------------------------
//     // 1. Compute a processing fee
//     // ---------------------------------
//     // Example: 1% of requestedAmount
//     const processingFeeRate = payload.InterestRate ?? 0.01;
//     const processingFee = requestedAmount * processingFeeRate;

//     // ---------------------------------
//     // 2. Determine the interest rate
//     // ---------------------------------
//     // You can pick a base rate or a dynamic rate based on, e.g., credit score
//     // For demonstration, let's set a fixed 12% annual interest
//     const interestRate = 12; // e.g. 12% annual

//     // ---------------------------------
//     // 3. Calculate monthly EMI
//     // ---------------------------------
//     // Standard EMI formula:
//     // monthlyInterestRate = (annualInterestRate / 100) / 12
//     // EMI = P × r × (1 + r)^n / ((1 + r)^n – 1)
//     //
//     // P = principal (requestedAmount)
//     // r = monthly interest rate
//     // n = number of monthly installments
//     //
//     // If you don’t want a formula that sophisticated, you can do something simpler.
//     const monthlyInterestRate = ((payload.InterestRate ?? 11.75) / 100) / 12;
//     const n = requestedPeriodMonths;

//     let monthlyEmi = 0;
//     if (monthlyInterestRate > 0) {
//       monthlyEmi = requestedAmount *
//         monthlyInterestRate *
//         Math.pow(1 + monthlyInterestRate, n) /
//         (Math.pow(1 + monthlyInterestRate, n) - 1);
//     } else {
//       // If interestRate is 0 or something unusual, fallback:
//       monthlyEmi = requestedAmount / n;
//     }

//     // Round EMI to 2 decimal places
//     monthlyEmi = Number(monthlyEmi.toFixed(2));

//     // ---------------------------------
//     // 4. Calculate total amount (EMI * months)
//     // ---------------------------------
//     const totalAmount = Number((monthlyEmi * n).toFixed(2));

//     // ---------------------------------
//     // 5. Determine 'eligibleLoan' — how large a loan can the user get?
//     // ---------------------------------
//     // This can be based on your own logic. For example:
//     //   - 30x the user's net monthly salary
//     //   - A portion of deposit in last year, etc.
//     // For demonstration, let's assume user’s monthly salary is from `Salaried.bankAccount.YourSalaryAmountBDT`
//     const monthlySalary = userData.Salaried?.bankAccount?.YourSalaryAmountBDT ?? 0;
//     // Example: let them borrow up to 40x their monthly salary
//     const maxPossibleLoan = monthlySalary * 40;

//     // Compare requestedAmount with maxPossibleLoan
//     if (requestedAmount > maxPossibleLoan) {
//       reasons.push("Requested amount exceeds your maximum eligible loan limit.");
//     }

//     // If we accumulate any new reasons, user is not eligible
//     const isEligible = reasons.length === 0;

//     return {
//       isEligible,
//       reasons,
//       amount: requestedAmount,
//       periodMonths: requestedPeriodMonths,
//       processingFee,
//       interestRate,
//       monthlyEmi,
//       totalAmount,
//       eligibleLoan: maxPossibleLoan
//     };
//   }
