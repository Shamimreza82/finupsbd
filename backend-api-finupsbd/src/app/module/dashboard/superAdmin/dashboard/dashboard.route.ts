import express from 'express';
import { DashboardController } from './dashboard.controller';

const route = express.Router();

route.get('/dashboard-home', DashboardController.getDashboardHone);
route.get('/modules', DashboardController.getAllModules);
route.patch('/modules-status/:id', DashboardController.changeModuleStatus);

export const DashboardRouter = route;
