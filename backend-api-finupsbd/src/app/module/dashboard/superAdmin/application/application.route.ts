import express from 'express';
import { ApplicarionController } from './application.controller';
import validateRequest from '../../../../middleware/validateRequest';
import { ApplicationStatusPayload } from './application.validation';
import auth from '../../../../middleware/auth';

const route = express.Router();

//////// Super Admin Routes auth("SUPER_ADMIN"),

route.get('/get-all-application', ApplicarionController.getAllApplication);
route.get('/get-single-application/:id', ApplicarionController.getSingleApplication);
route.patch(
  '/application-feedback/:id',
  validateRequest(ApplicationStatusPayload),
  ApplicarionController.applicationFeedBack,
);
route.get('/status-events/:id', ApplicarionController.getStatusEvents);

export const SuperAdminApplicationRouter = route;
