import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import { NewsLetterService } from './newsLetter.service';
import sendResponses from '../../../utils/sendResponce';

const createNewsLetter = catchAsync(async (req, res) => {
  const result = await NewsLetterService.createNewsLetter(req.body);

  sendResponses(res, {
    success: true,
    message: 'You have been successfully create',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getAllEmail = catchAsync(async (req, res) => {
  const result = await NewsLetterService.getAllEmail();

  sendResponses(res, {
    success: true,
    message: 'Get all news letter',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const NewsLetterController = {
  createNewsLetter,
  getAllEmail,
};
