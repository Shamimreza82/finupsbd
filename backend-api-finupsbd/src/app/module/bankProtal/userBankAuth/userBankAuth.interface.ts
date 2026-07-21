import { BankName } from '@prisma/client';

export type TUserBank = {
  bankName: BankName;
  loginId: string;
  role: 'BANK_USER';
  email: string;
  password: string;
  isBlocked: boolean;
  failedLoginAttempts: number;
  phone: string;
  bankCode: string;
  isMEOSingnedIn: boolean;
  isActive: boolean;
};
