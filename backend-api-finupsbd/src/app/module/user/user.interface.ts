/* eslint-disable no-unused-vars */

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export type TUser = {
  name: string;
  userId: string;
  email: string;
  phone: string;
  password: string;
  pin: string;
  pinExpiry: Date;
  role?: UserRole;
  isActive?: boolean;
};
