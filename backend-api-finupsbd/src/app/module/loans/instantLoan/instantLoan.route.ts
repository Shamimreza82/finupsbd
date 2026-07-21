import express from 'express';
import { upload } from '../../../utils/sendImageToCloud';

import auth from '../../../middleware/auth';
import { InstantLoanController } from './instantLoan.controller';

const router = express.Router();

router.post(
  '/',
  upload.single('file'),
  // auth("ADMIN", "SUPER_ADMIN"),
  InstantLoanController.createInstantLoan,
);
router.get('/', InstantLoanController.getAllInstantLoan);
router.patch(
  '/:id',
  upload.single('file'),
  auth('ADMIN', 'SUPER_ADMIN'),
  InstantLoanController.updateInstantLoan,
);

export const InstantLoanRouter = router;
