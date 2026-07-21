import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponses from '../../utils/sendResponce';
import { TMiddlewareUser } from '../../types/commonTypes';

const getAllUsers = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await UserServices.getAllUser(query);

  sendResponses(res, {
    success: true,
    message: 'retrieve all user  successfully.',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.getSingleUser(id);

  sendResponses(res, {
    success: true,
    message: 'retrieve single user successfully.',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const meProfile = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await UserServices.meProfile(user);

  sendResponses(res, {
    success: true,
    message: 'Retrive my Profile Data',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getAllNewLoans = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.getAllNewLoans(id);

  sendResponses(res, {
    success: true,
    message: 'Retrive all applications',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getAllExistingLoans = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.getAllExistingLoans(id);

  sendResponses(res, {
    success: true,
    message: 'get all existing loans',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const getAllRejectsLoans = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.getAllRejectsLoans(id);

  sendResponses(res, {
    success: true,
    message: 'get all rejected loans',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getApplication = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.getApplication(id);

  sendResponses(res, {
    success: true,
    message: 'Retrive all applications',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const createAddiDoc = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = req.user as TMiddlewareUser;

  const files = req.files as Express.Multer.File[];

  const result = await UserServices.createAdiDoc(id, files, user);

  sendResponses(res, {
    success: true,
    message: 'Document upload successfull',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getAgreementDoc = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.getAgreementDoc(id);

  sendResponses(res, {
    success: true,
    message: 'Retrieve Agreement doc successfully.',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  meProfile,
  getSingleUser,
  getAllNewLoans,
  getAllExistingLoans,
  getAllRejectsLoans,
  getApplication,
  createAddiDoc,
  getAgreementDoc,
};
