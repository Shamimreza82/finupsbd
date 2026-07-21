import express from 'express';
import { ProfileController } from './profile.controller';
import auth from '../../../middleware/auth';
import { upload } from '../../../utils/sendImageToCloud';

const router = express.Router();

router.post(
  '/',
  upload.single('file'),
  auth('USER', 'ADMIN', 'SUPER_ADMIN'),
  ProfileController.createProfile,
);

export const ProfileRouter = router;
