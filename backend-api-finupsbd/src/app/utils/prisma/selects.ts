// utils/prisma/selects.ts
export const safeUserSelect = {
  id: true,
  userId: true,
  name: true,
  email: true,
  phone: true,
  role: true,
  emailVerified: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  lastLogin: true,
};
