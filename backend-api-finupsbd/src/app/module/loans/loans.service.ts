/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from '../../../app';
import { TMulterFile } from '../../types/commonTypes';
import { saveSingleFile } from '../../utils/file-uploads/saveSingleFile';
import { TLoanCreate, TLoanUpdate } from './loans.validation';

const createLoan = async (payload: TLoanCreate, file: TMulterFile) => {
  try {
    const coverImage = file?.buffer
      ? await saveSingleFile(file.buffer, file.originalname, 'loans')
      : undefined;
    // const coverImage = file ? await sendImageToCloud(file) : undefined;
    payload.coverImage = coverImage ?? undefined;

    const result = await prisma.loan.create({
      data: {
        ...payload,
        features: {
          create: payload.features,
        },
        eligibility: {
          create: payload.eligibility,
        },
        feesCharges: {
          create: payload.feesCharges,
        },
      },
      include: {
        features: true,
        eligibility: true,
        feesCharges: true,
      },
    });
    return result;
  } catch (error) {
  }
};

const getAllLoans = async () => {
  const result = await prisma.loan.findMany({
    include: {
      features: true, // Correctly references Features model
      eligibility: true, // Correctly references Eligibility model
      feesCharges: true, // Correctly references FeesCharges model
    },
  });
  return result;
};

const updateLoan = async (payload: TLoanUpdate, file: any, id: string) => {
  const coverImage = file?.buffer
    ? await saveSingleFile(file.buffer, file.originalname, 'loans')
    : undefined;
  // const coverImage = file ? await sendImageToCloud(file) : undefined;
  payload.coverImage = coverImage ?? undefined;

  // Handle the Bank record
  // const bankResult = await prisma.personalLoan.upsert({
  //   where: { id },
  //   create: {
  //     ...payload,
  //     features: {
  //       create: payload.features,
  //     },
  //     eligibility: {
  //       create: payload.eligibility,
  //     },
  //     feesCharges: {
  //       create: payload.feesCharges,
  //     },
  //   },
  //   update: {
  //     ...payload,
  //     features: {
  //       update: payload.features,
  //     },
  //     eligibility: {
  //       update: payload.eligibility,
  //     },
  //     feesCharges: {
  //       update: payload.feesCharges,
  //     },
  //   },
  //   include: {
  //     features: true,
  //     eligibility: true,
  //     feesCharges: true,
  //   }
  // });

  // return bankResult;  // Return the updated or created bank record
};

const getSingleLoan = async (id: string) => {
  const result = await prisma.loan.findUnique({
    where: { id },
    include: {
      eligibility: true,
      features: true,
      feesCharges: true,
    },
  });

  return result;
};

export const LoanService = {
  createLoan,
  getAllLoans,
  updateLoan,
  getSingleLoan,
};
