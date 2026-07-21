import { z } from 'zod';

const createNewsLetterValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
});

export const NewsLetterValidation = {
  createNewsLetterValidationSchema,
};
