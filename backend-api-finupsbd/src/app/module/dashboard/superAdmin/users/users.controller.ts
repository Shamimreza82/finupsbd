import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../../utils/catchAsync';
import sendResponses from '../../../../utils/sendResponce';
import { DashboardUserasServides } from './user.service';

const getAllusers = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await DashboardUserasServides.getAllUsers(query);

  sendResponses(res, {
    success: true,
    message: 'Retrive All users',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DashboardUserasServides.getSingleUser(id);

  sendResponses(res, {
    success: true,
    message: 'Retrive user',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const DashboardUsersController = {
  getAllusers,
  getSingleUser,
};
