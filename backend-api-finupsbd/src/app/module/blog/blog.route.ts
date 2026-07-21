import express from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../middleware/validateRequest';
import { BlogBaseSchema, quearyOprions } from './blog.validation';

import auth from '../../middleware/auth';
import multer from 'multer';
import rateLimit from 'express-rate-limit';

// 4️⃣ Export Multer instance

export const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post(
  '/create-blog',
  auth('USER', 'ADMIN', 'SUPER_ADMIN'),
  upload.single('file'),
  BlogController.createBlog,
);
router.post('/comment', auth('USER', 'ADMIN', 'SUPER_ADMIN'), BlogController.commentBlog);

router.patch('/:id', validateRequest(BlogBaseSchema), BlogController.updateBlog);
router.get('/single-blog/:id', BlogController.getSingleBlog);

router.delete('/:id', BlogController.deleteBlog);
router.get(
  '/all-blogs',
  rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }),
  BlogController.getAllBlogs,
);

export const BlogRouter = router;
