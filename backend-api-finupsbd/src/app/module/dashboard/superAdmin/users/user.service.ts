import { prisma } from '../../../../../app';

export type TQueryUsers = {
  searchTerm?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
};

const getAllUsers = async (query: TQueryUsers) => {
  const { searchTerm = '', isActive, page = 1, limit = 10 } = query;

  const skip = (Number(page) - 1) * Number(limit);

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } },
          { phone: { contains: searchTerm, mode: 'insensitive' } },
          { userId: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        userId: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
        lastLogin: true,
        profile: {
          select: { avatar: true },
        },
      },
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    }),

    prisma.user.count({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } },
          { phone: { contains: searchTerm, mode: 'insensitive' } },
          { userId: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
    }),
  ]);

  return {
    data: users,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id },
    include: {
      profile: true,
    },
  });

  return result;
};

export const DashboardUserasServides = {
  getAllUsers,
  getSingleUser,
};
