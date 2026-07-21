/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { BlogService } from './blog.service';

import sendResponses from '../../utils/sendResponce';
import { TMiddlewareUser, TMulterFile } from '../../types/commonTypes';
import { BlogBaseSchema } from './blog.validation';

const createBlog = catchAsync(async (req, res) => {
  const payload = BlogBaseSchema.parse(JSON.parse(req.body.data)) as any;

  const file = req.file as TMulterFile;
  const user = req.user as TMiddlewareUser;

  if (!user) {
    throw new Error('User is not authenticated');
  }
  console.log(user);

  const result = await BlogService.createBlog(payload, file, user);

  sendResponses(res, {
    success: true,
    message: 'Blog create successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const queryOptions = req.body;
  const query = req.query;

  const result = await BlogService.getAllBlogs(queryOptions, query);

  sendResponses(res, {
    success: true,
    message: 'Blogs retrieve successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const blogId = req.params?.id;
  const result = await BlogService.updateBlog(req.body, blogId);

  sendResponses(res, {
    success: true,
    message: 'Update Blog Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const blogId = req.params?.id;
  await BlogService.deleteBlog(blogId);

  sendResponses(res, {
    success: true,
    message: 'Blog Deleted Successfully',
    statusCode: StatusCodes.OK,
    data: {},
  });
});

const commentBlog = catchAsync(async (req, res) => {
  const user = req.user as TMiddlewareUser;

  await BlogService.commentBlog(req.body, user);

  sendResponses(res, {
    success: true,
    message: 'Blog Comment Successfully',
    statusCode: StatusCodes.OK,
    data: {},
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const blogId = req.params?.id;
  const result = await BlogService.getSingleBlog(blogId);

  sendResponses(res, {
    success: true,
    message: 'Retrive blog Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  getAllBlogs,
  deleteBlog,
  commentBlog,
  getSingleBlog,
};
