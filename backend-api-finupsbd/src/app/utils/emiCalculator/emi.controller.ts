import { StatusCodes } from 'http-status-codes';
import catchAsync from '../catchAsync';
import sendResponses from '../sendResponce';

const emiCalculator = catchAsync(async (req, res) => {
  const { loanAmount, interestRate, numberOfMonths, disbursementDate } = req.body;

  const monthlyRate = interestRate / 12 / 100; // Convert annual rate to monthly rate
  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
    (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

  // Format response
  const result = {
    disbursementDate: new Date(disbursementDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    loanAmount: loanAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'BDT',
    }),
    numberOfSchedule: numberOfMonths,
    interestRate: `${interestRate.toFixed(2)} %`,
    emiAmount: emi.toFixed(2),
  };

  sendResponses(res, {
    success: true,
    message: 'Emi Calculate Successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const PublicController = {
  emiCalculator,
};
