import { prisma } from '../../app';
import AppError from '../error/AppError';

// Fetch the last application ID from the database
const lastApplication = async () => {
  const id = await prisma.loanApplicationForm.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      applicationId: true,
    },
  });
  return id;
};

// Generate a new application ID
export async function generateApplicationId() {
  const applicationId = await lastApplication();

  // Helper function to format the date prefix
  const getDatePrefix = () => {
    const currentDate = new Date();
    const staticDigit = '3'; // Static starting digit
    const year = currentDate.getFullYear().toString().slice(-2); // Last 2 digits of the year
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Two-digit month
    const day = currentDate.getDate().toString().padStart(2, '0'); // Two-digit day

    return `${staticDigit}${year}${month}${day}`; // Combine to form the prefix
  };

  if (!applicationId) {
    // Generate the first application ID
    const prefix = getDatePrefix();
    const sequence = '00001'; // Start sequence at 00001
    const newApplicationId = `${prefix}${sequence}`;
    return newApplicationId;
  }

  if (applicationId.applicationId) {
    // Generate the next application ID
    const prefix = applicationId.applicationId.slice(0, 7); // Extract prefix, e.g., "3250124"
    const sequence = parseInt(applicationId.applicationId.slice(7), 10); // Extract numeric part, e.g., "00001"
    const nextSequence = (sequence + 1).toString().padStart(5, '0'); // Increment and pad with zeros

    const newApplicationId = `${prefix}${nextSequence}`; // Combine prefix and new sequence
    return newApplicationId;
  }

  throw new AppError(500, 'Unable to generate a new application ID.'); // Fallback error handling
}
