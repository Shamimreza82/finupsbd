/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../../../app';
import { calculateAge } from '../../../utils/calculateAge';
import { TEligibilityCheck } from '../eligibilityCheck.interface';
import { buildFilters } from '../queryBuilder/queryBuilder';
import { calculateEMI } from '../utils/calculateEMI';
import { suggestEligibleLoanAmount } from '../utils/suggestEligibleLoanAmount';

export const personalLoan = async (payload: TEligibilityCheck, query: Record<string, unknown>) => {
  try {
    const page = query.page ? Number(query.page) : 1;
    const pageSize = query.pageSize ? Number(query.pageSize) : 3;
    const amount = query.amount ? Number(query.amount) : 200000;
    const sortKey = (query.sortOrder as 'asc' | 'desc') || 'asc';
    const sortOrder = (query.sortOrder as 'asc' | 'desc') || 'asc';
    const searchTerm = (query.searchTerm as string) || '';
    const interestRate = query.interestRate ? Number(query.interestRate) : 0;

    const filters = buildFilters(
      payload.monthlyIncome,
      calculateAge(payload.dateOfBirth.toISOString()),
    );

    console.log(sortOrder);

    const skip = Math.max(0, (page - 1) * pageSize);
    const take = pageSize;
    ///---------------------------------------------------------------------------------------------------------------

    const [loans, totalLoans] = await prisma.$transaction([
      prisma.personalLoan.findMany({
        skip,
        take,
        include: {
          eligibility: true,
          features: true,
          feesCharges: true,
        },
      }),
      prisma.personalLoan.count({}),
    ]);

    const forEligibleLoan = { ...payload };

    // Calculate the monthly income after deducting the loan EMI, base loan 50% .
    if (payload?.monthlyIncome) {
      payload.monthlyIncome = payload.monthlyIncome / 2;
      forEligibleLoan.monthlyIncome = forEligibleLoan.monthlyIncome / 2;
    }

    if (payload?.haveAnyRentalIncome) {
      payload.monthlyIncome += payload.monthlyIncome;
    }

    if (payload?.haveAnyLoan) {
      const totalEmi =
        payload.existingLoans?.reduce((acc, loan) => acc + loan.emiAmountBDT, 0) || 0;
      payload.monthlyIncome -= totalEmi;
    }

    if (payload?.haveAnyCreditCard) {
      payload.monthlyIncome = payload.monthlyIncome - payload.numberOfCreditCards! * 2000;
    }

    const suggestedLoans = loans.map((loan) => {
      const expectedLoanTenure = payload.expectedLoanTenure ?? 12; // Default to 12 months if undefined

      const monthlyEMI = calculateEMI(
        Number(amount),
        Number(loan.interestRate),
        expectedLoanTenure,
      );
      const totalRepayment = monthlyEMI * expectedLoanTenure;
      const eligibleLoanAmount = suggestEligibleLoanAmount(
        payload.monthlyIncome,
        Number(loan.interestRate),
        expectedLoanTenure,
      );
      // Flag the loan as eligible if the EMI is less than or equal to 50% of the monthly income.
      // const eligibleLoan = monthlyEMI <= (payload.monthlyIncome * 0.5);

      return {
        id: loan.id,
        bankName: loan.bankName,
        amount: Math.floor(Number(amount)).toFixed(2),
        periodMonths: expectedLoanTenure,
        loanType: loan.loanType,
        monthlyEMI: Math.floor(Number(monthlyEMI)).toFixed(2),
        totalRepayment: Math.floor(totalRepayment).toFixed(2),
        coverImage: loan.coverImage,
        interestRate: loan.interestRate,
        processingFee: loan.processingFee,
        eligibleLoan: Math.floor(Number(eligibleLoanAmount)).toFixed(2),
        features: loan.features,
        feesCharges: loan.feesCharges,
        eligibility: loan.eligibility,
      };
    });

    if (typeof sortKey === 'string') {
      if (sortKey.toLowerCase() === 'asc') {
        suggestedLoans.sort((a, b) => Number(b.interestRate) - Number(a.interestRate));
      } else if (sortKey.toLowerCase() === 'desc') {
        suggestedLoans.sort((a, b) => Number(a.interestRate) - Number(b.interestRate));
      }
    }

    if (typeof sortOrder === 'string') {
      if (sortOrder.toLowerCase() === 'desc') {
        suggestedLoans.sort((a, b) => Number(b.eligibleLoan) - Number(a.eligibleLoan));
      } else if (sortOrder.toLowerCase() === 'asc') {
        suggestedLoans.sort((a, b) => Number(a.eligibleLoan) - Number(b.eligibleLoan));
      }
    }

    return {
      data: suggestedLoans,
      pagination: {
        page,
        pageSize,
        totalLoans,
      },
    };
  } catch (error) {
    console.error('Error in homeLoan function:', error);
    throw error;
  }
};

export default personalLoan;
