import { Loan } from './../../../../node_modules/.prisma/client/index.d';
import express from 'express';
import { upload } from '../../utils/sendImageToCloud';
import auth from '../../middleware/auth';
import { LoanController } from './loans.controller';

const router = express.Router();

router.post('/', upload.single('file'), LoanController.createLoan);
router.get('/', LoanController.getAllLoans);
router.patch(
  '/:id',
  upload.single('file'),
  auth('ADMIN', 'SUPER_ADMIN'),
  LoanController.updateLoan,
);
router.get('/:id', LoanController.getSingleLoans);

export const LoansRouter = router;
