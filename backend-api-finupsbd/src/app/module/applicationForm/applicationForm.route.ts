import express from 'express';
import { ApplicationController } from './applicationForm.controller';
import auth from '../../middleware/auth';
import multer from 'multer';

const route = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // keeps files in memory

route.post(
  '/create-application',
  auth('USER', 'SUPER_ADMIN', 'ADMIN'),
  upload.fields([
    { name: 'files', maxCount: 10 }, // your uploaded files
    { name: 'data', maxCount: 1 },
    { name: 'loanRequest', maxCount: 1 }, // your stringified JSON
  ]),
  ApplicationController.createApplicationForm,
);

///gurantor in update

route.post(
  '/applicant-guarator-info-personal',
  upload.array('files'),
  ApplicationController.applicantGuarantorInfoPersonal,
);

route.post(
  '/applicant-guarator-info-business',
  upload.array('files'),
  ApplicationController.applicantGuarantorInfoBusiness,
);

route.get(
  '/my-loan-application',
  auth('USER', 'SUPER_ADMIN', 'ADMIN'),
  ApplicationController.myLoanApplication,
);

route.get('/', ApplicationController.getAllApplicationForm);
route.post('/application-tracking', ApplicationController.applicationTracking);
route.post('/application-forget', ApplicationController.applicationForget);

route.get('/:id', auth('USER', 'SUPER_ADMIN', 'ADMIN'), ApplicationController.getSingleApplication);

export const ApplicationRouter = route;
