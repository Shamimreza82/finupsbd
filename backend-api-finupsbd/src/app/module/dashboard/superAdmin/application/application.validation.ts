import z from 'zod';
import { LoanStatus } from '../../../applicationForm/application.interface';

export const ApplicationStatusPayload = z.object({
  status: z.nativeEnum(LoanStatus),
  adminNote: z.string().trim().optional().default(''),
  additionalDocuments: z.boolean().optional().default(false),
});
