import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../error/AppError';
import sendResponses from '../../utils/sendResponce';
import { CardCreateSchema, CardUpdateSchema, TCardCreateInput } from './cards.validation';
import { CardsService } from './cards.service';

const createCard = catchAsync(async (req, res) => {
  const payload = CardCreateSchema.parse(JSON.parse(req.body.data));
  const file = req.file;
  if (!file) {
    throw new AppError(StatusCodes.CONFLICT, 'Please upload a file');
  }
  const result = await CardsService.createCard(payload, file);

  sendResponses(res, {
    success: true,
    message: ` ${result?.cardName} Create Successfully`,
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getAllCards = catchAsync(async (req, res) => {
  const result = await CardsService.getAllCards();

  sendResponses(res, {
    success: true,
    message: 'Retrieve All cards Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateCard = catchAsync(async (req, res) => {
  const payload = CardUpdateSchema.parse(JSON.parse(req.body.data));
  const file = req.file;
  if (!file) {
    throw new AppError(StatusCodes.CONFLICT, 'Please upload a file');
  }
  const result = await CardsService.updateCard(payload as TCardCreateInput, file, req.params.id);

  sendResponses(res, {
    success: true,
    message: 'Updated Card Info Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getSingleCard = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CardsService.getSingleCard(id);

  sendResponses(res, {
    success: true,
    message: 'Retrive card Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const CardsController = {
  createCard,
  getAllCards,
  updateCard,
  getSingleCard,
};
