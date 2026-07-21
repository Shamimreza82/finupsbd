/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from '../../../../app';
import { TMulterFile } from '../../../types/commonTypes';
import { saveSingleFile } from '../../../utils/file-uploads/saveSingleFile';
import { sendImageToCloud } from '../../../utils/sendImageToCloud';
import { TPersonalLoan } from './personalLoan.interface';

const createPersonalLoan = async (payload: TPersonalLoan, file: TMulterFile) => {
  const coverImage = file?.buffer
    ? await saveSingleFile(file.buffer, file.originalname, 'CreateLoans')
    : undefined;
  // const coverImage = file ? await sendImageToCloud(file) : undefined;
  payload.coverImage = coverImage ?? undefined;

  const result = await prisma.personalLoan.create({
    data: {
      bankName: payload.bankName,
      amount: payload.amount,
      coverImage: payload.coverImage,
      periodMonths: payload.periodMonths,
      processingFee: payload.processingFee,
      interestRate: payload.interestRate,
      monthlyEmi: payload.monthlyEmi,
      totalAmount: payload.totalAmount,
      eligibleLoan: payload.eligibleLoan,
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
};

const getAllPersonalLoan = async () => {
  const result = await prisma.personalLoan.findMany({
    include: {
      features: true, // Correctly references Features model
      eligibility: true, // Correctly references Eligibility model
      feesCharges: true, // Correctly references FeesCharges model
    },
  });
  return result;
};

const updatePersonalLoan = async (payload: TPersonalLoan, file: any, id: string) => {
  const coverImage = file ? await sendImageToCloud(file) : undefined;
  payload.coverImage = coverImage ?? undefined;

  // Handle the Bank record
  const bankResult = await prisma.personalLoan.upsert({
    where: { id },
    create: {
      bankName: payload.bankName,
      amount: payload.amount,
      coverImage: payload.coverImage,
      periodMonths: payload.periodMonths,
      processingFee: payload.processingFee,
      interestRate: payload.interestRate,
      monthlyEmi: payload.monthlyEmi,
      totalAmount: payload.totalAmount,
      eligibleLoan: payload.eligibleLoan,
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
    update: {
      bankName: payload.bankName,
      amount: payload.amount,
      coverImage: payload.coverImage,
      periodMonths: payload.periodMonths,
      processingFee: payload.processingFee,
      interestRate: payload.interestRate,
      monthlyEmi: payload.monthlyEmi,
      totalAmount: payload.totalAmount,
      eligibleLoan: payload.eligibleLoan,
      features: {
        update: payload.features,
      },
      eligibility: {
        update: payload.eligibility,
      },
      feesCharges: {
        update: payload.feesCharges,
      },
    },
    include: {
      features: true,
      eligibility: true,
      feesCharges: true,
    },
  });

  return bankResult; // Return the updated or created bank record
};

export const PersonalLoanService = {
  createPersonalLoan,
  getAllPersonalLoan,
  updatePersonalLoan,
};
