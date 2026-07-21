import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../../utils/catchAsync';
import sendResponses from '../../../../utils/sendResponce';
import { ApplicationServides } from './application.service';

const getAllApplication = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await ApplicationServides.getAllApplication(query);

  sendResponses(res, {
    success: true,
    message: 'Retrive all application',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getSingleApplication = catchAsync(async (req, res) => {
  const id = req.params?.id;

  const result = await ApplicationServides.getSingleApplication(id);

  sendResponses(res, {
    success: true,
    message: 'Retrive Single application',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const applicationFeedBack = catchAsync(async (req, res) => {
  const id = req.params?.id;
  const result = await ApplicationServides.applicationFeedback(id, req.body);
  sendResponses(res, {
    success: true,
    message: 'status updated application',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getStatusEvents = catchAsync(async (req, res) => {
  const id = req.params?.id;

  const result = await ApplicationServides.getStatusEvents(id);

  sendResponses(res, {
    success: true,
    message: 'Retrive All Events',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const ApplicarionController = {
  getSingleApplication,
  getAllApplication,
  applicationFeedBack,
  getStatusEvents,
};
