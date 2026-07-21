import { CardFeaturesType, CardNetwork, CardTypes, Currency } from '@prisma/client';
import { prisma } from '../../../../app';
import { TEligibilityCheck } from '../eligibilityCheck.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cards = async (payload: TEligibilityCheck, query: Record<string, any>) => {
  try {
    // extract pagination info (with default values)
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5; // items per page
    const skip = (page - 1) * limit;
    // query
    const cardType = payload?.loanType as unknown as CardTypes;
    const currency = query?.currency as Currency;
    const cardNetwork = query?.cardNetwork as CardNetwork;
    const cardFeatures = query?.cardFeaturesType as CardFeaturesType;

    // main query
    const result = await prisma.card.findMany({
      where: {
        cardType: cardType,
        currency: currency,
        cardNetwork: cardNetwork,
        cardFeaturesType: cardFeatures,
        isActive: true,
      },
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
      where: {
        cardType: payload?.loanType as unknown as CardTypes,
        currency: query?.currency as Currency,
        cardNetwork: query?.cardNetwork as CardNetwork,
        cardFeaturesType: query?.cardFeaturesType as CardFeaturesType,
      },
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
    console.error(error);
    throw new Error('Error fetching cards');
  }
};
