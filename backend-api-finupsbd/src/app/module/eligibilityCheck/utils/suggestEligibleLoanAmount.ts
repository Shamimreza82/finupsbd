export const suggestEligibleLoanAmount = (
  fixedEmi: number, // directly supplied maximum EMI
  annualInterestRate: number, // e.g., 11.75 for 11.75% per year
  tenureMonths: number, // e.g., 36 months
): number => {
  // Convert annual interest rate to monthly decimal rate
  const monthlyRate = annualInterestRate / 100 / 12;

  if (monthlyRate === 0) {
    // When interest rate is 0%, eligible loan amount is EMI * tenure
    return parseFloat((fixedEmi * tenureMonths).toFixed(2));
  }

  // EMI formula to compute the principal
  const discountFactor = 1 - Math.pow(1 + monthlyRate, -tenureMonths);
  const principal = fixedEmi * (discountFactor / monthlyRate);

  return parseFloat(principal.toFixed(2));
};
