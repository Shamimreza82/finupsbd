import express from 'express';

import { PersonalLoanRouter } from '../../module/loans/personalLoan/personalLoan.route';
import { InstantLoanRouter } from '../../module/loans/instantLoan/instantLoan.route';

const router = express.Router();

const loansdRoutes = [
  {
    path: '/personal-loan',
    route: PersonalLoanRouter,
  },
  {
    path: '/instant-loan',
    route: InstantLoanRouter,
  },
];

loansdRoutes.forEach((item) => router.use(item.path, item.route));

export const LoansSubRoutes = router;
