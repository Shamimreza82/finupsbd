import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponses from '../../../utils/sendResponce';
import { UserBankAuthServices } from './userBankAuth.service';
import { ConfigFile } from '../../../../config';
import sendResponce from '../../../utils/sendResponce';

const userBankRegister = catchAsync(async (req, res) => {
  const result = await UserBankAuthServices.userBankRegister(req.body);

  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User bank register successFully',
    data: result,
  });
});

const userBankLogin = catchAsync(async (req, res) => {
  const result = await UserBankAuthServices.login(req.body);

  const { userBankRefreshToken, userBankAccessToken } = result;

  res.cookie('userBankRefreshToken', userBankRefreshToken, {
    secure: ConfigFile.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponce(res, {
    success: true,
    message: 'User Bank login successfully',
    statusCode: StatusCodes.OK,
    data: { userBankAccessToken },
  });
});

const me = catchAsync(async (req, res) => {
  // const result = await UserBankAuthServices.userBankRegister(req.body)
  sendResponses(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'get all register successFully',
    data: {},
  });
});

export const UserBankAuthController = {
  userBankRegister,
  userBankLogin,
  me,
};
