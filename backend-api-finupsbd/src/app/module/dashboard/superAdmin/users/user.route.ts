import express from 'express';
import { DashboardUsersController } from './users.controller';


const route = express.Router();

route.get('/get-all-users', DashboardUsersController.getAllusers);
route.get('/get-single-user/:id', DashboardUsersController.getSingleUser);

export const SuperAdminUsersRouter = route;
