import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import { ProfileServices } from './profile.service';
import sendResponses from '../../../utils/sendResponce';
import { TMiddlewareUser } from '../../../types/commonTypes';

const createProfile = catchAsync(async (req, res) => {
  const file = req.file;
  const user = req.user;
  const profileInfo = JSON.parse(req.body.data);
  const result = await ProfileServices.createProfile(profileInfo, user as TMiddlewareUser, file);

  sendResponses(res, {
    success: true,
    message: 'Profile create successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const ProfileController = {
  createProfile,
};
