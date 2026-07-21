import express from 'express';
import { NewsLetterController } from './newsLetter.controller';
import validateRequest from '../../../middleware/validateRequest';
import { NewsLetterValidation } from './newsLetter.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(NewsLetterValidation.createNewsLetterValidationSchema),
  NewsLetterController.createNewsLetter,
);
router.get('/', NewsLetterController.getAllEmail);

export const NewsLetterRouter = router;
