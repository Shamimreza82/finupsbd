import { BankName } from '@prisma/client';
import { z } from 'zod';

const userBankSchemaRegister = z.object({
  bankName: z.nativeEnum(BankName), // or: BankNameEnum,
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z
    .string()
    .regex(/^\+8801\d{9}$/, 'Phone must be a valid Bangladeshi number (+8801XXXXXXXXX)'),
  bankCode: z.string().min(1).max(9).nonempty('bankCode is required'),
});

const userBankSchemaLogin = z.object({
  bankName: z.nativeEnum(BankName), // or: BankNameEnum,
  loginId: z.string().min(1, { message: 'loginId must be at least 1 characters' }),
  password: z.string().min(1, 'Password must be at least 1 characters'),
});

export const UserBankAuthValidation = {
  userBankSchemaRegister,
  userBankSchemaLogin,
};
