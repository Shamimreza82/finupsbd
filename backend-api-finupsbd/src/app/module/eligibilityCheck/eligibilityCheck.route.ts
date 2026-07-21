import express from 'express';
import { EligibilityCheckController } from './eligibilityCheck.controller';

const route = express.Router();

route.post('/', EligibilityCheckController.eligibilityCheck);
route.get('/cards', EligibilityCheckController.getAllCards);

export const EligibilityCheckRouter = route;
