// Reuse your EMI calculation as-is:
export const calculateEMI = (loanAmount: number, interestRate: number, tenureMonths: number) => {
  console.log(loanAmount, interestRate, tenureMonths);
  if (interestRate === 0) return loanAmount / tenureMonths; // Handle zero-interest case
  const monthlyRate = interestRate / (12 * 100);
  return (
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );
};
