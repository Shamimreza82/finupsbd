import { z } from 'zod';

// Enums
export const CategoryEnum = z.enum([
  'PERSONAL_LOAN',
  'HOME_LOAN',
  'CAR_LOAN',
  'SME_LOAN',
  'EDUCATION_LOAN',
  'BUSINESS_LOAN',
  'FINUPS_AGRIM_LOAN',
  'CREDIT_CARD',
  'CREDIT_SCORE',
  'DEBT_MANAGEMENT',
  'DIGITAL_BANKING',
  'SAVINGS',
  'MONEY_MANAGEMENT',
  'INSURANCE',
  'TAX_TIPS',
  'INVESTMENT',
  'FINANCIAL_PLANNING',
  'WEALTH_BUILDING',
  'FINTECH_NEWS',
  'STARTUP_GROWTH',
  'PRODUCT_UPDATE',
  'CUSTOMER_SUCCESS',
  'MARKET_ANALYSIS',
  'FRAUD_PREVENTION',
  'ECONOMIC_TRENDS',
  'FINANCIAL_EDUCATION',
  'LIFESTYLE',
  'TECH_TIPS',
  'CAREER_ADVICE',
  'SUCCESS_STORIES',
  'LAST',
  'OTHER',
]);

export const StatusEnum = z.enum(['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED']);

// Base Blog Schema with error messages
export const BlogBaseSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(3, 'Title must be at least 3 characters'),
  slug: z
    .string({ required_error: 'Slug is required' })
    .min(3, 'Slug must be at least 3 characters')
    .optional(),
  content: z
    .string({ required_error: 'Content is required' })
    .min(10, 'Content must be at least 10 characters'),
  publishedDate: z
    .union([z.string().optional(), z.date().optional()])
    .transform((val) => (val ? new Date(val) : undefined)),
  status: StatusEnum.optional(),
  thumbnail: z.string().url({ message: 'Thumbnail must be a valid URL' }).optional(),
  bannerImage: z.string().url({ message: 'Banner image must be a valid URL' }).optional(),
  excerpt: z.string().max(300, 'Excerpt cannot exceed 300 characters').optional(),
  readingTime: z.number({ invalid_type_error: 'Reading time must be a number' }).int().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  publishedAt: z
    .union([z.string().optional(), z.date().optional()])
    .transform((val) => (val ? new Date(val) : undefined))
    .optional(),
  scheduledFor: z
    .union([z.string().optional(), z.date().optional()])
    .transform((val) => (val ? new Date(val) : undefined))
    .optional(),
  views: z.number({ invalid_type_error: 'Views must be a number' }).int().optional(),
  likes: z.number({ invalid_type_error: 'Likes must be a number' }).int().optional(),
  isFeatured: z.boolean({ invalid_type_error: 'isFeatured must be true or false' }).optional(),
  language: z.string().optional(),
  permissions: z.string().optional(),
  category: CategoryEnum.optional(),
  tags: z.array(z.string({ invalid_type_error: 'Tags must be strings' })).optional(),
  authorId: z.string({ required_error: 'Author ID is required' }).optional(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const quearyOprions = z.object({
  search: z.string().optional(), // optional search string
  tags: z.array(z.string()).optional(), // array of tag strings
  category: CategoryEnum.optional(), // required enum
  status: StatusEnum.optional(), // required enum
  language: z.string().length(2).optional(), // e.g., 'en', 'bn' etc.
  userId: z.string().min(1).optional(), // must be a non-empty string
  permissions: z.enum(['public', 'private']).optional(),
  fromDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid fromDate format',
    })
    .optional(),
  toDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid toDate format',
    })
    .optional(),
  sortBy: z.enum(['title', 'createdAt', 'updatedAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  includeUser: z.boolean().optional(),
  includeCommentCount: z.boolean().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});

export type TQueryOptions = z.infer<typeof quearyOprions>;
export type TCategoriEnum = z.infer<typeof CategoryEnum>;
// Edit/Update Blog Schema
export const editBlogSchema = BlogBaseSchema.partial(); // allows partial updates

// TypeScript type
export type TEditBlogInput = z.infer<typeof editBlogSchema>;
