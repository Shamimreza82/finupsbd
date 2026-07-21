import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { EligibilityCheckService } from './eligibilityCheck.service';
import sendResponses from '../../utils/sendResponce';

const eligibilityCheck = catchAsync(async (req, res) => {
  const query = req.query;
  const mode = req.headers['x-finups-mode'] as string;



  const result = await EligibilityCheckService.eligibilityCheck(req.body, query, mode);

  sendResponses(res, {
    success: true,
    message: 'Eligibility check successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getAllCards = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await EligibilityCheckService.getAllcards(query);

  sendResponses(res, {
    success: true,
    message: 'Retrive cards successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const EligibilityCheckController = {
  eligibilityCheck,
  getAllCards,
};
