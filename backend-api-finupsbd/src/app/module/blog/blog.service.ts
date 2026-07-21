/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from '../../../app';
import { TMiddlewareUser, TMulterFile } from '../../types/commonTypes';
import { saveFileBlogs } from '../../utils/file-uploads/saveFileBlogs';
import { generateSlug } from '../../utils/generateSlug';
import { TEditBlogInput, TQueryOptions } from './blog.validation';

const createBlog = async (payload: TEditBlogInput, file: TMulterFile, user: TMiddlewareUser) => {
  // const coverImage = await sendImageToCloud(file);

  if (payload.title) {
    payload.slug = generateSlug(payload?.title);
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: user?.userId },
  });

  const coverImage = await saveFileBlogs(
    file.buffer,
    file.originalname,
    'blogs',
    existingUser?.userId ?? '',
  );
  payload.bannerImage = coverImage ?? undefined;

  if (user.userId) {
    payload.authorId = user.userId;
  }

  const result = await prisma.blog.create({
    data: {
      ...payload,
    } as any,
  });
  return result;
};

const getAllBlogs = async (queryOptions: TQueryOptions, query: Record<string, unknown>) => {
  const {
    searchTerm = '',
    categori,
    page = 1,
    limit = 10,
  } = query as {
    searchTerm?: string;
    categori?: string;
    page?: number | string;
    limit?: number | string;
  };

  const skip = (Number(page) - 1) * Number(limit);

  const whereConditions: any = {};

  if (searchTerm && typeof searchTerm === 'string') {
    whereConditions.OR = [
      { title: { contains: searchTerm, mode: 'insensitive' } },
      { content: { contains: searchTerm, mode: 'insensitive' } },
      { category: { contains: searchTerm, mode: 'insensitive' } }, // 🔥 FIXED
      { tags: { has: searchTerm } },
    ];
  }

  if (categori && typeof categori === 'string') {
    whereConditions.category = categori; // exact category filter
  }

  const totalCount = await prisma.blog.count({
    where: whereConditions,
  });

  const blogs = await prisma.blog.findMany({
    where: whereConditions,
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      category: true,
      tags: true,
      bannerImage: true,

      author: {
        select: {
          id: true,
          name: true,
          email: true,
          profile: { select: { avatar: true } },
        },
      },
    },
    skip,
    take: Number(limit),
    orderBy: { createdAt: 'desc' },
  });

  return {
    data: blogs,
    pagination: {
      total: totalCount,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalCount / Number(limit)),
    },
  };
};

const updateBlog = async (payload: TEditBlogInput, id: string) => {
  // Convert category string to Prisma enum if necessary
  const { category, ...restPayload } = payload;
  const data = {
    ...restPayload,
    ...(category ? { category: category as any } : {}), // Replace 'any' with the actual enum type if imported
  };

  const result = await prisma.blog.update({
    where: { id },
    data: data,
  });
  return result;
};

const deleteBlog = async (id: string) => {
  const isExistBlog = await prisma.blog.findFirst({
    where: { id },
  });
  if (!isExistBlog) {
    throw new Error('Delete Blog Already. thank you');
  }

  const result = await prisma.blog.delete({ where: { id } });
  return result;
};

const commentBlog = async (payload: { blogId: string; content: string }, user: TMiddlewareUser) => {
  const isExistBlog = await prisma.blog.findFirst({
    where: { id: payload.blogId },
  });

  if (!isExistBlog) {
    throw new Error('Blog not found. thank you');
  }

  const result = await prisma.comment.create({
    data: {
      content: payload.content,
      blogId: payload.blogId,
      userId: user?.userId,
      // parentId: parentId
    },
  });

  console.log(result, 'result comment blog');

  return result;
};

const getSingleBlog = async (id: string) => {
  console.log({ id });

  const result = await prisma.blog.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      category: true,
      tags: true,
      bannerImage: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          profile: {
            select: { avatar: true },
          },
        },
      },
      // Fetch all comments, no parent filtering
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          parentId: true,
          user: {
            select: {
              id: true,
              name: true,
              profile: {
                select: { avatar: true },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return result;
};

export const BlogService = {
  createBlog,
  updateBlog,
  getAllBlogs,
  deleteBlog,
  commentBlog,
  getSingleBlog,
};
