import express from 'express';
import { PublicController } from './emi.controller';
import validateRequest from '../../middleware/validateRequest';
import emiCalculateValidation from './emi.validation';

const router = express.Router();

router.post(
  '/emi-calculator',
  validateRequest(emiCalculateValidation),
  PublicController.emiCalculator,
);

export const PublicRouter = router;
