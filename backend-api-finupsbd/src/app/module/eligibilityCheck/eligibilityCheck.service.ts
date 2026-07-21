import { prisma } from '../../../app';
import { logger } from '../../utils/logger/logger';
import { TCardTypeEnum } from '../cards/cards.validation';
import { TEligibilityCheck } from './eligibilityCheck.interface';
import { cards } from './eligibilityCheck/cards';
import { instantLoan } from './eligibilityCheck/instantLoan';
import { loans } from './eligibilityCheck/loans';

const eligibilityCheck = async (
  payload: TEligibilityCheck,
  query: Record<string, unknown>,
  mode: string,
) => {
  const { existingLoans = [], ...eligibilityData } = payload;

  console.log(mode);

  try {
    const eligibilityCheckEntry = await prisma.eligibilityCheck.create({
      data: {
        ...eligibilityData,
        existingLoans: {
          create: existingLoans.map(({ existingLoanType, emiAmountBDT, interestRate }) => ({
            existingLoanType,
            emiAmountBDT,
            interestRate,
          })),
        },
      },
      include: {
        existingLoans: {
          select: {
            existingLoanType: true,
            emiAmountBDT: true,
            interestRate: true,
          },
        },
      },
    });

    const cardTypes = ['TRAVEL_CARD', 'PREPAID_CARD', 'CREDIT_CARD'] as const;

    if (
      eligibilityCheckEntry &&
      cardTypes.includes(eligibilityCheckEntry.loanType as (typeof cardTypes)[number])
    ) {
      return await cards(eligibilityCheckEntry as unknown as TEligibilityCheck, query);
    }

    const loanTypes = ['PERSONAL_LOAN', 'HOME_LOAN', 'CAR_LOAN', 'SME_LOAN'] as const;

    if (
      eligibilityCheckEntry &&
      loanTypes.includes(eligibilityCheckEntry.loanType as (typeof loanTypes)[number])
    ) {
      return await loans(eligibilityCheckEntry as unknown as TEligibilityCheck, query, mode);
    }

    const InstantLoanTypes = ['INSTANT_LOAN'] as const;

    if (
      eligibilityCheckEntry &&
      InstantLoanTypes.includes(eligibilityCheckEntry.loanType as (typeof InstantLoanTypes)[number])
    ) {
      return await instantLoan(eligibilityCheckEntry as unknown as TEligibilityCheck, query);
    }

    const TravelPrepaidCardTypes = ['TRAVEL_CARD', 'PREPAID_CARD'] as const;

    if (
      eligibilityCheckEntry &&
      TravelPrepaidCardTypes.includes(
        eligibilityCheckEntry.loanType as (typeof TravelPrepaidCardTypes)[number],
      )
    ) {
      return await cards(eligibilityCheckEntry as unknown as TEligibilityCheck, query);
    }
  } catch (error) {
    logger.error(error);
  }
};

const getAllcards = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10; // items per page
  const skip = (page - 1) * limit;
  // query

  try {
    const result = await prisma.card.findMany({
      where: { cardType: query.cardType as TCardTypeEnum },
      include: {
        eligibility: true,
        features: true,
        feesCharges: true,
      },
      skip,
      take: limit,
    });

    // total count for pagination info
    const totalCount = await prisma.card.count({
      where: { cardType: query.cardType as TCardTypeEnum },
    });

    return {
      data: result,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    logger.error(error);
  }
};

export const EligibilityCheckService = {
  eligibilityCheck,
  getAllcards,
};
