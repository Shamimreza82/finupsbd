import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync((req: Request, res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);
    next();
  });
};

export default validateRequest;
