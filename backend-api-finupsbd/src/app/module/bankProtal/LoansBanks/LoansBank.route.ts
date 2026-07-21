import express from 'express';
import { LoansBankController } from './LoansBank.controller';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express();

router.post('/applyed-loans', upload.array('files', 10), LoansBankController.getAllApplyedLoans);

export const LoansBankRouter = router;
