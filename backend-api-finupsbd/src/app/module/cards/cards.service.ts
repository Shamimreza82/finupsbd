/* eslint-disable @typescript-eslint/no-explicit-any */

import { CallTrackerReportInformation } from 'node:assert/strict';
import { prisma } from '../../../app';
import { saveSingleFile } from '../../utils/file-uploads/saveSingleFile';
import { TCardCreateInput } from './cards.validation';
import { BankName } from '@prisma/client';

const createCard = async (payload: TCardCreateInput, file: any) => {
  const cardImage = file?.buffer
    ? await saveSingleFile(file.buffer, file.originalname, 'Cards')
    : undefined;
  // const coverImage = file ? await sendImageToCloud(file) : undefined;
  payload.cardImage = cardImage ?? undefined;

  console.log('payload', payload);

  const result = await prisma.card.create({
    data: {
      ...payload,
      bankName: payload.bankName as BankName,
      cardType: payload.cardType as any,
      features: payload.features
        ? {
            create: payload.features,
          }
        : undefined,
      eligibility: payload.eligibility
        ? {
            create: payload.eligibility,
          }
        : undefined,
      feesCharges: payload.feesCharges
        ? {
            create: payload.feesCharges,
          }
        : undefined,
    },
  });

  return result;
};

const getAllCards = async () => {
  const result = await prisma.card.findMany({
    include: {
      features: true, // Correctly references Features model
      feesCharges: true, // Correctly references Eligibility model
      eligibility: true, // Correctly references FeesCharges model
    },
  });
  return result;
};

const updateCard = async (payload: TCardCreateInput, file: any, id: string) => {
  const cardImage = file?.buffer
    ? await saveSingleFile(file.buffer, file.originalname, 'Cards')
    : undefined;
  // const coverImage = file ? await sendImageToCloud(file) : undefined;
  payload.cardImage = cardImage ?? undefined;

  const result = await prisma.card.upsert({
    where: { id },
    create: {
      ...payload,
      bankName: payload.bankName as BankName,
      cardType: payload.cardType as any,
      features: payload.features
        ? {
            create: payload.features,
          }
        : undefined,
      eligibility: payload.eligibility
        ? {
            create: payload.eligibility,
          }
        : undefined,
      feesCharges: payload.feesCharges
        ? {
            create: payload.feesCharges,
          }
        : undefined,
    },
    update: {
      ...payload,

      bankName: payload.bankName as BankName,
      cardType: payload.cardType as any,
      features: payload.features
        ? {
            create: payload.features,
          }
        : undefined,
      eligibility: payload.eligibility
        ? {
            create: payload.eligibility,
          }
        : undefined,
      feesCharges: payload.feesCharges
        ? {
            create: payload.feesCharges,
          }
        : undefined,
    },
    include: {
      features: true,
      feesCharges: true,
      eligibility: true,
    },
  });

  return result; // Return the updated or created bank record
};

const getSingleCard = async (id: string) => {
  const result = await prisma.card.findUnique({
    where: { id },
    include: {
      eligibility: true,
      features: true,
      feesCharges: true,
    },
  });

  return result;
};

export const CardsService = {
  createCard,
  getAllCards,
  updateCard,
  getSingleCard,
};
