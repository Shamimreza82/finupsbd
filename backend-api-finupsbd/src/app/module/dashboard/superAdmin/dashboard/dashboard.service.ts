/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from '../../../../../app';
import { LoanTypes } from '@prisma/client';
import { TModules } from './dashboard.constand';
import { CardType } from '../../../eligibilityCheck/eligibilityCheck.interface';
import AppError from '../../../../error/AppError';
import { StatusCodes } from 'http-status-codes';

export type TQueryPayloadType = {
  searchTerm?: string;
  module?: TModules;
  isActive?: boolean;
  page?: number;
  limit?: number;
};

const dashboardHome = async () => {
  // Define time ranges
  const startOfThisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const startOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
  const endOfLastMonth = new Date(startOfThisMonth.getTime() - 1); // last day of last month

  // Users
  const usersThisMonth = await prisma.user.count({
    where: { createdAt: { gte: startOfThisMonth } },
  });

  const usersLastMonth = await prisma.user.count({
    where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
  });

  // Applications
  const applicationsThisMonth = await prisma.loanApplicationForm.count({
    where: { createdAt: { gte: startOfThisMonth } },
  });
  const applicationsLastMonth = await prisma.loanApplicationForm.count({
    where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
  });

  // Growth formula
  const calcGrowth = (prev: number, current: number) => {
    if (prev === 0 && current > 0) return '+100%'; // avoid divide-by-zero
    if (prev === 0 && current === 0) return '0%';

    const growth = ((current - prev) / prev) * 100;
    return (growth < 0 ? 0 : growth).toFixed(2) + '%';
  };

  const userGrowth = calcGrowth(usersLastMonth, usersThisMonth);
  const applicantGrowth = calcGrowth(applicationsLastMonth, applicationsThisMonth);

  const totalUsers = await prisma.user.count();
  const totalApplications = await prisma.loanApplicationForm.count();

  const last5Application = await prisma.loanApplicationForm.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
    select: {
      status: true,
      applicationId: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  const last5User = await prisma.user.findMany({
    take: 5,
    select: {
      id: true,
      name: true,
      userId: true,
      profile: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  //////////// Eligiblity /////////////////////////////////////

  // ✅ TOTAL (ALL TIME)
  const totalEligibility = await prisma.eligibilityCheck.count();

  // ✅ APPLIED TOTAL
  const appliedTotal = await prisma.eligibilityCheck.count({
    where: { isAppliedLoan: true },
  });

  // ✅ TODAY RANGE
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  // ✅ TODAY COUNT
  const todayTotal = await prisma.eligibilityCheck.count({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  // ✅ TODAY APPLIED COUNT
  const todayApplied = await prisma.eligibilityCheck.count({
    where: {
      isAppliedLoan: true,
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  // ✅ LOAN TYPE WISE STATS
  const loanTypeStats = await prisma.eligibilityCheck.groupBy({
    by: ['loanType'],
    _count: {
      _all: true,
    },
  });

  // ✅ GENDER WISE STATS
  const genderStats = await prisma.eligibilityCheck.groupBy({
    by: ['gender'],
    _count: {
      _all: true,
    },
  });

  // ✅ PROFESSION WISE STATS
  const professionStats = await prisma.eligibilityCheck.groupBy({
    by: ['profession'],
    _count: {
      _all: true,
    },
  });

  // ✅ FORMATTERS
  const formatStats = (data: any[], key: string) => {
    return data.reduce(
      (acc, row) => {
        acc[row[key]] = row._count._all;
        return acc;
      },
      {} as Record<string, number>,
    );
  };

  const eligiblity = {
    totalEligibility,
    appliedTotal,
    todayTotal,
    todayApplied,
    loanTypeStats: formatStats(loanTypeStats, 'loanType'),
    genderStats: formatStats(genderStats, 'gender'),
    professionStats: formatStats(professionStats, 'profession'),
  };

  return {
    totalUsers,
    totalApplications,
    userGrowth,
    applicantGrowth,
    last5Application,
    last5User,
    eligiblity,
  };
};

// const getAllModules = async (query: TQueryPayloadType) => {
//   const { module,searchTerm, isActive, page = 1, limit = 10 } = query;

//   const skip = (page - 1) * limit;

//   const loanTypes = ["PERSONAL_LOAN", "HOME_LOAN", "CAR_LOAN", "SME_LOAN", "INSTANT_LOAN"] as const;
//   const cardTypes = ["DEBIT_CARD", "PREPAID_CARD", "CREDIT_CARD"] as const;

//   try {
//     // ============ LOAN MODULE ============
//     if (!module || loanTypes.includes(module as typeof loanTypes[number])) {

//     const [loans, totalCount] = await Promise.all([
//       prisma.loan.findMany({
//         where: module && loanTypes.includes(module as typeof loanTypes[number])
//           ? { loanType: module as LoanTypes }
//           : {}, // empty where means fetch all
//         skip,
//         take: Number(limit),
//         select: {
//           id: true,
//           bankName: true,
//           loanType: true,
//           isActive: true,
//           createdAt: true,
//           updatedAt: true,
//         },
//       }),
//       prisma.loan.count({
//         where: module && loanTypes.includes(module as typeof loanTypes[number])
//           ? { loanType: module as LoanTypes }
//           : {},
//       }),
//     ]);

//     return {
//       data: loans,
//       pagination: {
//         total: totalCount,
//         page: Number(page),
//         limit: Number(limit),
//         totalPages: Math.ceil(totalCount / limit),
//       },
//     };
//   }

//     // ============ CARD MODULE ============
//      if (!module || cardTypes.includes(module as typeof cardTypes[number])) {

//     const [cards, totalCount] = await Promise.all([
//       prisma.card.findMany({
//         where: module && cardTypes.includes(module as typeof cardTypes[number])
//           ? { cardType: module as CardType }
//           : {},
//         skip,
//         take: Number(limit),
//       }),
//       prisma.card.count({
//         where: module && cardTypes.includes(module as typeof cardTypes[number])
//           ? { cardType: module as CardType }
//           : {},
//       }),
//     ]);

//     return {
//       data: cards,
//       pagination: {
//         total: totalCount,
//         page: Number(page),
//         limit: Number(limit),
//         totalPages: Math.ceil(totalCount / limit),
//       },
//     };
//   }

//     // ============ DEFAULT ============
//     return {
//       data: [],
//       pagination: { total: 0, page: Number(page), limit: Number(limit), totalPages: 0 },
//       message: `Unknown module: ${module}`,
//     };
//   } catch (error) {
//     console.error("Error fetching modules:", error);
//     throw new Error("Failed to fetch modules");
//   }
// };

const getAllModules = async (query: TQueryPayloadType) => {
  const { searchTerm = '', module, isActive, page = 1, limit = 10 } = query;

  const skip = (page - 1) * limit;

  const loanTypes = ['PERSONAL_LOAN', 'HOME_LOAN', 'CAR_LOAN', 'SME_LOAN', 'INSTANT_LOAN'] as const;
  const cardTypes = ['DEBIT_CARD', 'PREPAID_CARD', 'CREDIT_CARD'] as const;

  // ===========================
  // 🔎 COMMON WHERE BUILDER
  // ===========================
  const whereCondition: any = {};
  // ✅ Search Filter
  if (searchTerm) {
    whereCondition.OR = [
      {
        bankName: {
          contains: String(searchTerm),
          mode: 'insensitive',
        },
      },
    ];
  }
  // ✅ Active Filter
  if (typeof isActive === 'boolean') {
    whereCondition.isActive = isActive;
  }

  try {
    // ===========================
    // 🏦 LOANS MODULE
    // ===========================
    if (!module || loanTypes.includes(module as any)) {
      if (module && module !== 'ALL') {
        whereCondition.loanType = module;
      }

      const [data, total] = await Promise.all([
        prisma.loan.findMany({
          where: whereCondition,
          skip,
          take: Number(limit),
          select: {
            id: true,
            bankName: true,
            loanType: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),

        prisma.loan.count({
          where: whereCondition,
        }),
      ]);

      return {
        data,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit),
        },
      };
    }

    // ===========================
    // 💳 CARD MODULE
    // ===========================
    if (!module || cardTypes.includes(module as any)) {
      if (module && module !== 'ALL') {
        whereCondition.cardType = module;
      }

      const [data, total] = await Promise.all([
        prisma.card.findMany({
          where: whereCondition,
          skip,
          take: Number(limit),
          select: {
            id: true,
            bankName: true,
            cardType: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),

        prisma.card.count({
          where: whereCondition,
        }),
      ]);

      return {
        data,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit),
        },
      };
    }

    // ===========================
    // ❌ UNKNOWN MODULE
    // ===========================
    return {
      data: [],
      pagination: {
        total: 0,
        page,
        limit,
        totalPages: 0,
      },
    };
  } catch (error) {
    console.error('Error fetching modules:', error);
    throw new Error('Failed to fetch modules');
  }
};

const changeModuleStatus = async (payload: { isActive: boolean }, id: string) => {
  try {
    let updatedRecord = null;

    // Try Loan first
    updatedRecord = await prisma.loan
      .update({
        where: { id },
        data: { isActive: payload.isActive },
        include: {
          eligibility: true,
          features: true,
          feesCharges: true,
        },
      })
      .catch(() => null); // skip if not found

    // If not in loan, try Card
    if (!updatedRecord) {
      updatedRecord = await prisma.card
        .update({
          where: { id },
          data: { isActive: payload.isActive },
          include: {
            eligibility: true,
            features: true,
            feesCharges: true,
          },
        })
        .catch(() => null);
    }

    if (!updatedRecord) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Record not found in loan or card.');
    }

    return updatedRecord;
  } catch (error) {
    console.error('❌ changeModuleStatus error:', error);
    return error;
  }
};

export const DashboardServides = {
  dashboardHome,
  getAllModules,
  changeModuleStatus,
};
