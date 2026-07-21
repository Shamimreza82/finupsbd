import sendResponses from '../../utils/sendResponce';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { LoanValidationSchema, TLoanCreate } from './loans.validation';
import { LoanService } from './loans.service';
import AppError from '../../error/AppError';

const createLoan = catchAsync(async (req, res) => {
  const payload = LoanValidationSchema.createLoanValidateSchema.parse(JSON.parse(req.body.data));
  const file = req.file;
  if (!file) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Please upload a file/image');
  }
  const result = await LoanService.createLoan(payload as TLoanCreate, file);

  sendResponses(res, {
    success: true,
    message: 'Loan Create Successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getAllLoans = catchAsync(async (req, res) => {
  const result = await LoanService.getAllLoans();

  sendResponses(res, {
    success: true,
    message: 'Retrieve All Loans Info Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateLoan = catchAsync(async (req, res) => {
  const payload = LoanValidationSchema.updateLoanValidateSchema.parse(JSON.parse(req.body.data));
  const file = req.file?.buffer;
  const result = await LoanService.updateLoan(payload, file, req.params.id);

  sendResponses(res, {
    success: true,
    message: 'uodate loan Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getSingleLoans = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await LoanService.getSingleLoan(id);

  sendResponses(res, {
    success: true,
    message: 'Retrieve loan Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const LoanController = {
  createLoan,
  getAllLoans,
  updateLoan,
  getSingleLoans,
};
