export const personalLoanData = [
  {
    bankName: 'City Bank PLC, Personal Loan',
    processingFee: '0.50',
    interestRate: '12.75',
    features: {
      loanAmount: 'BDT 2 lacs up to BDT 20 lacs',
      minimumAmount: '200000',
      maximumAmount: '2000000',
      loanTenure: '12 to 60 months',
      minimumYear: '1',
      maximumYear: '5',
    },
    eligibility: {
      condition:
        "Must meet City Bank's eligibility criteria including a good credit score and appropriate employment/experience requirements",
      offer: 'Holiday offer',
      minimumIncome: 50000,
      minimumExperience: 3,
      ageRequirement: 22,
    },
    feesCharges: {
      processingFee:
        '0.50% of loan amount | on take over amount 0% | on additional take over amount 0.50%',
      earlySettlementFee: '0.50% of the outstanding amount',
      prepaymentFee: 'N/A',
      LoanReSchedulingFee: '0.25% on outstianding amount or Tk. 10,000 whichever is lower',
      penalCharge: '1.50% on the arrear amount',
    },
  },
  {
    bankName: 'Mutual Trust Bank PLC, Personal Loan',
    processingFee: '0.50',
    interestRate: '12.75',
    features: {
      loanAmount: 'BDT 0.50 lacs up to BDT 20 lacs',
      minimumAmount: '50000',
      maximumAmount: '2000000',
      loanTenure: '06 to 60 months',
      minimumYear: '0.50',
      maximumYear: '5',
    },
    eligibility: {
      condition:
        'Take over- 1. Minimum 6 loan EMI repayment with existing bank, 2. No processing fee for loan takeover or balance transfer.',
      offer: 'n/a',
      minimumIncome: 30000,
      minimumExperience: 1.5,
      ageRequirement: 22,
    },
    feesCharges: {
      processingFee: '0.50% of loan amount | on take over amount 0%',
      earlySettlementFee: '0.50% of the outstanding amount',
      prepaymentFee: '0.50% of the prepayment amount.',
      LoanReSchedulingFee: 'N/A',
      penalCharge: '2% on the arrear amount',
    },
  },
  {
    bankName: 'Standard Chartered Bank, Personal Loan',
    processingFee: '0.50',
    interestRate: '12.5',
    features: {
      loanAmount: 'BDT 0.50 lacs up to BDT 20 lacs',
      minimumAmount: '50000',
      maximumAmount: '2000000',
      loanTenure: '12 to 60 months',
      minimumYear: '1',
      maximumYear: '5',
    },
    eligibility: {
      condition:
        'Applicants must have a steady source of income from employment / business / self-employment activity.Customer location- Dhaka (including Narayanganj),Chattogram and Other areas with Standard Chartered Branch coverage may be considered',
      offer: 'n/a',
      minimumIncome: 35000,
      minimumExperience: 1.5,
      ageRequirement: 22,
    },
    feesCharges: {
      processingFee:
        '0.5% of loan amount or BDT 15,000 whichever is lower | on take over amount 0%',
      earlySettlementFee: '0.50% of the outstanding amount',
      prepaymentFee: '0.50% of the prepayment amount.',
      LoanReSchedulingFee: 'N/A',
      penalCharge: '2% on the arrear amount',
    },
  },
  {
    bankName: 'Eastern Bank PLC, Personal Loan',
    processingFee: '0.50',
    interestRate: '13.55',
    features: {
      loanAmount: 'BDT 1 lacs up to BDT 20 lacs',
      minimumAmount: '100000',
      maximumAmount: '2000000',
      loanTenure: '12 to 60 months',
      minimumYear: '1',
      maximumYear: '5',
    },
    eligibility: {
      condition: 'up to 20 times of Gross Monthly income, whichever is lower',
      offer: 'n/a',
      minimumIncome: 30000,
      minimumExperience: 1.5,
      ageRequirement: 22,
    },
    feesCharges: {
      processingFee:
        '0.5% of loan amount or BDT 15,000 whichever is lower | on take over amount 0%',
      earlySettlementFee: '0.50% of the outstanding amount',
      prepaymentFee: '0.50% of the prepayment amount.',
      LoanReSchedulingFee: 'N/A',
      penalCharge: '2% on the arrear amount',
    },
  },
  {
    bankName: 'Dutch-Bangla Bank PLC, Personal Loan',
    processingFee: '0.50',
    interestRate: '13.55',
    features: {
      loanAmount: 'BDT 0.50 lacs up to BDT 20 lacs',
      minimumAmount: '50000',
      maximumAmount: '2000000',
      loanTenure: '12 to 60 months',
      minimumYear: '1',
      maximumYear: '5',
    },
    eligibility: {
      condition: 'up to 20 times of Gross Monthly income, whichever is lower',
      offer: 'n/a',
      minimumIncome: 30000,
      minimumExperience: 1.5,
      ageRequirement: 22,
    },
    feesCharges: {
      processingFee:
        '0.50% to 1.00% of Loan amount as per the schedule of charges of DBBL | on take over amount 0%',
      earlySettlementFee: '2% of the outstanding amount',
      prepaymentFee: '1% of the prepayment amount.',
      LoanReSchedulingFee: 'N/A',
      penalCharge: 'N/A',
    },
  },
];

// const getAllApplicationForm = async () => {
//   const result = await prisma.loanApplicationForm.findMany({
//     include: {
//       personalInfo: true,
//       user: true,
//       GuarantorInfo: true,
//       loanInfo: true,
//       EligibleLoanOffer: true,
//       employmentInformation: true,
//       loanRequest: true,
//       Document: true,
//       residentialInformation: true
//     }
//   })

//   return result;
// };
