/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ConfigFile } from '../../config';
import { Prisma } from '@prisma/client';
import AppError from '../error/AppError';
import { ZodError } from 'zod';
import { TokenExpiredError } from 'jsonwebtoken';
import { logger } from '../utils/logger/logger';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const newMessage = "Something went's wrong";
  const error = {};
  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  ///---------------------------Error Logs--------------------------------------------------------------------------------------------
  const logPayload = {
    method: req.method,
    url: req.originalUrl,
    userAgent: req.headers['user-agent'],
    ip: req.ip,
    errorName: err?.name,
    errorMessage: err?.message,
    stack: err?.stack,
  };

  /// genarate error log for better find error
  logger.error(err.message, logPayload);

  ///-----------------------------------------------------------------------------------------------------------------------

  if (err instanceof TokenExpiredError) {
    res.status(401).json({
      success: false,
      message: 'Session expired. Please refresh your token or log in again.',
      err,
    });
  }

  if (err instanceof SyntaxError) {
    res.status(500).json({
      success: false,
      message: `SyntaxError: ${err.message}`,
      stack: err.stack,
    });
  }

  if (res.headersSent) {
    return;
  }

  //generics error handle
  if (err instanceof AppError) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Something went wrong',
      statusCode: statusCode,
      error: err,
    });
  }

  //Zod Validation Error handle
  if (err instanceof ZodError) {
    const errors = err.errors.map((e: any) => ({
      field: e.path.join('.'),
      error: e.message,
    }));

    res.status(400).json({
      success: false,
      message: 'Invalid input data',
      errors,
      stack: err.stack,
    });
  }

  ///-----------------------------------------------------------------------------------------------------------------------

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      // Unique constraint failed
      res.status(400).json({
        success: false,
        message: `Validation Error: Unique constraint failed on the field: ${err?.meta?.target}`,
        statusCode: StatusCodes.BAD_REQUEST,
        error: err,
      });
    } else if (err.code === 'P2025') {
      // Record not found
      res.status(404).json({
        success: false,
        message: 'The record you are trying to update or delete does not exist.',
        error: err,
      });
    } else if (err.code === 'P2003') {
      // Foreign key constraint failed
      res.status(400).json({
        success: false,
        message: 'Foreign key constraint failed.',
        error: err,
      });
    } else if (err.code === 'P2000') {
      // Value too long for column
      res.status(400).json({
        success: false,
        message: 'Value is too long for the column.',
        error: err,
      });
    } else {
      // Default for other Prisma errors
      res.status(500).json({
        success: false,
        message: 'Database error occurred. Please try again later.',
        error: err,
      });
    }
  }

  // Handle Prisma Unknown Errors
  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    res.status(500).json({
      status: 'error',
      message: 'Unknown database error',
      details: err.message,
    });
  }

  // Handle Prisma Validation Errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    const regex = /Invalid value for argument `(.+?)`\.\s*Expected (.+?)\./;
    const match = err.message.match(regex);

    let invalidField = 'unknown';
    let expectedValue = 'unknown';

    if (match) {
      invalidField = match[1];
      expectedValue = match[2];
    }

    // Optionally, split and clean up the full error message for additional context.
    const errorLines = err.message
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    res.status(400).json({
      success: false,
      message: 'Database query validation error',
      error: {
        invalidField,
        expectedValue,
        // Provide the full error context as an array of lines
        errorContext: errorLines,
      },
      stack: ConfigFile.NODE_ENV === 'production' ? null : err.stack,
    });
  }

  ///-----------------------------------------------------------------------------------------------------------------------

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: newMessage,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    error: error,
    stack: ConfigFile.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default globalErrorHandler;
