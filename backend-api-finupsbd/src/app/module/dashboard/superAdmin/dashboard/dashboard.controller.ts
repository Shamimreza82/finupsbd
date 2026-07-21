import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../../utils/catchAsync';
import sendResponses from '../../../../utils/sendResponce';
import { DashboardServides, TQueryPayloadType } from './dashboard.service';

const getDashboardHone = catchAsync(async (req, res) => {
  const result = await DashboardServides.dashboardHome();

  sendResponses(res, {
    success: true,
    message: 'Retrive dashboard home data',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getAllModules = catchAsync(async (req, res) => {
  const query = req.query as TQueryPayloadType;

  const result = await DashboardServides.getAllModules(query);

  sendResponses(res, {
    success: true,
    message: 'Retrive All modules',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const changeModuleStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const isActive = req.body;

  const result = await DashboardServides.changeModuleStatus(isActive, id);

  sendResponses(res, {
    success: true,
    message: 'module status change successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const DashboardController = {
  getDashboardHone,
  getAllModules,
  changeModuleStatus,
};
