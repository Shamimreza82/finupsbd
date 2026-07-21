/* eslint-disable @typescript-eslint/no-explicit-any */
import { BankName } from '@prisma/client';
import { prisma } from '../../../../app';
import { TEligibilityCheck } from '../eligibilityCheck.interface';
import { calculateEMI } from '../utils/calculateEMI';
import { suggestEligibleLoanAmount } from '../utils/suggestEligibleLoanAmount';
import { Mode } from '../../../constand/constand';
import { logger } from '../../../utils/logger/logger';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loans = async (
  payload: TEligibilityCheck,
  query: Record<string, any>,
  mode: string,
) => {
  try {
    // extract pagination info (with default values)
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5; // items per page
    const skip = (page - 1) * limit;
    /// query
    const amount = query.amount ? Number(query.amount) : 200000;
    const sortKey = (query.sortOrder as 'asc' | 'desc') || 'asc';
    const sortOrder = (query.sortOrder as 'asc' | 'desc') || 'asc';
    const searchTerm = (query.searchTerm as string) || '';
    const interestRate = query.interestRate ? Number(query.interestRate) : 0;

    const bankList =
      typeof searchTerm === 'string'
        ? searchTerm.split(',').map((b) => b.trim() as BankName)
        : Array.isArray(searchTerm)
          ? searchTerm
          : [];

    //// find Loantype by filtering whith loan type and bank name
    const [loans, totalCount] = await Promise.all([
      prisma.loan.findMany({
        where: {
          loanType: payload.loanType,
          // bankName: { in: bankList },
          isActive: true,
        },
        include: {
          eligibility: true,
          features: true,
          feesCharges: true,
        },
        skip,
        take: limit,
      }),
      prisma.loan.count({
        where: {
          loanType: payload.loanType,
        },
      }),
    ]);

    //// main business login

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
      data: mode === Mode.ISLAMIC ? [] : suggestedLoans,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    logger.error(error);
    throw new Error('Error fetching cards');
  }
};
