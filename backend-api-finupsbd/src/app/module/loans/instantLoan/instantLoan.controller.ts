import { StatusCodes } from 'http-status-codes';
import sendResponses from '../../../utils/sendResponce';
import catchAsync from '../../../utils/catchAsync';
import { TInstantLoan } from './instantLoan.interface';
import { InstantLoanValidationSchema } from './instantLoan.validation';
import { InstantLoanService } from './instantLoan.service';

const createInstantLoan = catchAsync(async (req, res) => {
  const payload = InstantLoanValidationSchema.createInstantLoanValidateSchema.parse(
    JSON.parse(req.body.data),
  );
  const file = req.file;
  if (!file) {
    throw new Error('Please upload a file');
  }
  const result = await InstantLoanService.createInstantLoan(payload as TInstantLoan, file);

  sendResponses(res, {
    success: true,
    message: 'Personal Loan Create Successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getAllInstantLoan = catchAsync(async (req, res) => {
  const result = await InstantLoanService.getAllInstantLoan();

  sendResponses(res, {
    success: true,
    message: 'Retrieve All Bank Info Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateInstantLoan = catchAsync(async (req, res) => {
  const payload = InstantLoanValidationSchema.updateInstantLoanValidateSchema.parse(
    JSON.parse(req.body.data),
  );
  const file = req.file?.buffer;
  const result = await InstantLoanService.updateInstantLoan(
    payload as TInstantLoan,
    file,
    req.params.id,
  );

  sendResponses(res, {
    success: true,
    message: 'Retrieve all Personal Loan Info Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const InstantLoanController = {
  createInstantLoan,
  getAllInstantLoan,
  updateInstantLoan,
};
