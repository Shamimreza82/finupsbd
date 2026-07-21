import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponses from '../../../utils/sendResponce';
import { PersonalLoanService } from './personalLoan.service';
import { TPersonalLoan } from './personalLoan.interface';
import { PersonalLoanValidationSchema } from './personalLoan.validation';

const createPersonalLoan = catchAsync(async (req, res) => {
  const payload = PersonalLoanValidationSchema.createPersonalLoanValidateSchema.parse(
    JSON.parse(req.body.data),
  );
  const file = req.file;
  if (!file) {
    throw new Error('Please upload a file');
  }
  const result = await PersonalLoanService.createPersonalLoan(payload as TPersonalLoan, file);

  sendResponses(res, {
    success: true,
    message: 'Personal Loan Create Successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getAllPersonalLoan = catchAsync(async (req, res) => {
  const result = await PersonalLoanService.getAllPersonalLoan();

  sendResponses(res, {
    success: true,
    message: 'Retrieve All Bank Info Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updatePersonalLoan = catchAsync(async (req, res) => {
  const payload = PersonalLoanValidationSchema.updatePersonalLoanValidateSchema.parse(
    JSON.parse(req.body.data),
  );
  const file = req.file?.buffer;
  const result = await PersonalLoanService.updatePersonalLoan(
    payload as TPersonalLoan,
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

export const PersonalLoanController = {
  createPersonalLoan,
  getAllPersonalLoan,
  updatePersonalLoan,
};
